import * as React from "react";
import classNames from "classnames";
import { Text } from "gdq-design";
import ImageQuestion from "gdq-design/icons/ImageQuestion";

import styles from "./Image.mod.css";

export enum ImageLoadState {
  INITIALIZED,
  LOADING,
  LOADED,
  ERROR,
}

export interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
  // Native passthrough props
  width?: number;
  height?: number;
  crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>["crossOrigin"];
  decoding?: React.ImgHTMLAttributes<HTMLImageElement>["decoding"];
  /**
   * Either 'eager' or 'lazy' indicates how the browser should prioritize
   * loading this image.
   */
  loadingMode?: React.ImgHTMLAttributes<HTMLImageElement>["loading"];
  referrerPolicy?: React.ImgHTMLAttributes<HTMLImageElement>["referrerPolicy"];
}

export const Image = React.forwardRef(function Image(
  props: ImageProps,
  ref: React.ForwardedRef<HTMLImageElement>,
) {
  const { src, alt, className, ...nativeProps } = props;

  const imageRef = React.useRef<HTMLImageElement | null>(null);
  const [loadState, setLoadState] = React.useState<ImageLoadState>(ImageLoadState.INITIALIZED);

  React.useLayoutEffect(() => {
    const image = imageRef.current;
    if (image == null) return;

    setLoadState(ImageLoadState.LOADING);

    function handleLoad(event: Event) {
      setLoadState(ImageLoadState.LOADED);
    }

    function handleError(event: ErrorEvent) {
      setLoadState(ImageLoadState.ERROR);
    }

    image.addEventListener("load", handleLoad);
    image.addEventListener("error", handleError);
    return () => {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
    };
  }, [imageRef.current]);

  function setRef(element: HTMLImageElement | null) {
    imageRef.current = element;

    if (ref == null) return;
    if (typeof ref === "function") {
      ref(element);
    } else {
      ref.current = element;
    }
  }

  const inner = (() => {
    switch (loadState) {
      case ImageLoadState.INITIALIZED:
      case ImageLoadState.LOADING:
        return null;
      case ImageLoadState.ERROR:
        return (
          <>
            <ImageQuestion className={styles.fallbackIcon} size={64} />
            {alt != null ? (
              <Text variant="text-sm/secondary" className={styles.fallbackAlt}>
                {alt}
              </Text>
            ) : null}
          </>
        );
      case ImageLoadState.LOADED:
        return;
    }
  })();

  return (
    <div
      className={classNames(styles.imageContainer, className, {
        [styles.error]: loadState === ImageLoadState.ERROR,
      })}
      style={{ width: props.width, height: props.height }}>
      {inner}
      <img ref={setRef} className={styles.image} src={src} alt={alt} {...nativeProps} />
    </div>
  );
});
