import { useContext, useMemo } from "preact/hooks";
import { forwardRef } from "preact/compat";
import { ComponentChildren, createContext, JSX } from "preact";
import { Head } from "$fresh/runtime.ts";

import { FitOptions, getSrcSet } from "./CustomImage.tsx";

interface Context {
  preload?: boolean;
}

const Context = createContext<Context>({
  preload: false,
});

type SourceProps =
  & Omit<JSX.IntrinsicElements["source"], "width" | "height" | "preload">
  & {
    src: string;
    /** @description Improves Web Vitals (CLS|LCP) */
    width: number;
    /** @description Improves Web Vitals (CLS|LCP) */
    height?: number;
    /** @description Web Vitals (LCP). Adds a link[rel="preload"] tag in head. Use one preload per page for better performance */
    preload?: boolean;
    /** @description Improves Web Vitals (LCP). Use high for LCP image. Auto for other images */
    fetchPriority?: "high" | "low" | "auto";
    /** @description Object-fit */
    fit?: FitOptions;

    factors?: number[];
  };

export const CustomSource = forwardRef<HTMLSourceElement, SourceProps>(
  (props, ref) => {
    const { preload } = useContext(Context);

    const srcSet = getSrcSet(
      props.src,
      props.width,
      props.height,
      props.fit,
      props.factors,
    );

    const isSingleFactor = (props.factors ?? [1, 2]).length <= 1;

    const linkProps = {
      imagesrcset: isSingleFactor ? undefined : srcSet,
      imagesizes: props.sizes,
      fetchpriority: props.fetchPriority,
      media: props.media,
    };

    return (
      <>
        {preload && (
          <Head>
            <link
              as="image"
              rel="preload"
              href={props.src}
              {...linkProps}
            />
          </Head>
        )}
        <source
          {...props}
          data-fresh-disable-lock={true}
          preload={undefined}
          src={undefined} // Avoid deprecated api lighthouse warning
          srcSet={isSingleFactor ? undefined : srcSet}
          // srcSet={srcSet}
          ref={ref}
        />
      </>
    );
  },
);

type Props = Omit<JSX.IntrinsicElements["picture"], "preload"> & {
  children: ComponentChildren;
  preload?: boolean;
};

export const CustomPicture = forwardRef<HTMLPictureElement, Props>(
  ({ children, preload, ...props }, ref) => {
    const value = useMemo(() => ({ preload }), [preload]);

    return (
      <Context.Provider value={value}>
        <picture {...props} ref={ref}>
          {children}
        </picture>
      </Context.Provider>
    );
  },
);
