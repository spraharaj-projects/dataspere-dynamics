import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { isFilled } from "@prismicio/client";

/**
 * Props for `ImageBlock`.
 */
export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

/**
 * Component for "ImageBlock" Slices.
 */
const ImageBlock = ({ slice }: ImageBlockProps): JSX.Element => {
  return (
    <figure className="w-4/5">
      {isFilled.image(slice.primary.image) && (
        <div className="bg-gray-100">
          <PrismicNextImage
            field={slice.primary.image}
            imgixParams={{ w: 600 }}
          />
        </div>
      )}
      {isFilled.richText(slice.primary.caption) && (
        <figcaption className="text-center font-serif italic tracking-tight text-slate-200">
          <PrismicRichText field={slice.primary.caption} />
        </figcaption>
      )}
    </figure>
  );
};

export default ImageBlock;
