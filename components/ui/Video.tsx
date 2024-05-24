import { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import { useSignal } from "@preact/signals";
import VideoDeco from "apps/website/components/Video.tsx";
import Icon from "deco-sites/happybooks-test/components/ui/Icon.tsx";
import CustomImage from "deco-sites/happybooks-test/components/ui/CustomImage.tsx";

/** @title From YouTube */
export interface YoutubeVideo {
  /** @hide */
  readonly type: "youtube";
  id: string;
}

/** @title From URL */
export interface UrlVideo {
  /** @hide */
  readonly type: "url";
  src: string;
}

/** @title Upload (25MB max) */
export interface UploadVideo {
  /** @hide */
  readonly type: "upload";
  src: VideoWidget;
}

export interface Props {
  title: string;

  /**
   * @title Largura
   * @default 1012
   */
  width?: number;

  /**
   * @title Altura
   * @default 443
   */
  height?: number;
  thumbnail: ImageWidget;
  video: YoutubeVideo | UrlVideo | UploadVideo;
}

function Video({ title, thumbnail, video, width = 1012, height = 443 }: Props) {
  const open = useSignal(false);

  return (
    <div class="max-w-container px-2 container:px-0 mx-auto w-full flex flex-col gap-6 items-center justify-center">
      <h2 class="font-bold text-2xl text-center text-neutral-700">
        {title}
      </h2>
      {open.value
        ? (
          <div
            class="w-full mx-auto"
            style={{
              maxWidth: `${width}px`,
            }}
          >
            {video.type === "youtube"
              ? (
                <iframe
                  alt={``}
                  aria-label={``}
                  style={{
                    aspectRatio: `${width} / ${height}`,
                    maxWidth: `${width}px`,
                  }}
                  width={width}
                  height={height}
                  loading="lazy"
                  allowFullScreen
                  frameBorder="0"
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                  allow="fullscreen; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  class="w-full h-auto"
                />
              )
              : (
                <VideoDeco
                  src={video.src}
                  style={{
                    aspectRatio: `${width} / ${height}`,
                    maxWidth: `${width}px`,
                  }}
                  width={width}
                  height={height}
                  loading="lazy"
                  controls
                  autoPlay
                  class="w-full h-auto"
                />
              )}
          </div>
        )
        : (
          <div
            onClick={() => open.value = true}
            class="w-full relative mx-auto group cursor-pointer"
            style={{
              maxWidth: `${width}px`,
            }}
          >
            <CustomImage
              style={{
                aspectRatio: `${width} / ${height}`,
                maxWidth: `${width}px`,
              }}
              class="w-full"
              width={width}
              height={height}
              src={thumbnail}
              alt={title}
              factors={[0.5, 1]}
              loading="lazy"
            />
            <Icon
              id="Play"
              size={70}
              class="text-danger-500 group-hover:text-danger-700 transition-colors absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        )}
    </div>
  );
}

export default Video;
