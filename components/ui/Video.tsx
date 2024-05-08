import { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import { useSignal } from "@preact/signals";
import Image from "apps/website/components/Image.tsx";
import VideoDeco from "apps/website/components/Video.tsx";
import Icon from "deco-sites/todo-livro/components/ui/Icon.tsx";

export interface YoutubeVideo {
  /**
   * @readonly
   */
  readonly type: "youtube";
  id: string;
}

export interface UrlVideo {
  /**
   * @readonly
   */
  readonly type: "url";
  src: string;
}

export interface UploadVideo {
  /**
   * @readonly
   */
  readonly type: "upload";
  src: VideoWidget;
}

export interface Props {
  title: string;
  thumbnail: ImageWidget;
  video: YoutubeVideo | UrlVideo | UploadVideo;
}

const WIDTH = 1012;
const HEIGHT = 443;

function Video({ title, thumbnail, video }: Props) {
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
              maxWidth: `${WIDTH}px`,
            }}
          >
            {video.type === "youtube"
              ? (
                <iframe
                  alt={``}
                  aria-label={``}
                  style={{
                    aspectRatio: `${WIDTH} / ${HEIGHT}`,
                    maxWidth: `${WIDTH}px`,
                  }}
                  width={WIDTH}
                  height={HEIGHT}
                  loading="lazy"
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  class="w-full h-auto"
                />
              )
              : (
                <VideoDeco
                  src={video.src}
                  style={{
                    aspectRatio: `${WIDTH} / ${HEIGHT}`,
                    maxWidth: `${WIDTH}px`,
                  }}
                  width={WIDTH}
                  height={HEIGHT}
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
              maxWidth: `${WIDTH}px`,
            }}
          >
            <Image
              style={{
                aspectRatio: `${WIDTH} / ${HEIGHT}`,
                maxWidth: `${WIDTH}px`,
              }}
              class="w-full"
              width={WIDTH}
              height={HEIGHT}
              src={thumbnail}
              alt={title}
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
