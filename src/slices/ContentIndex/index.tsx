import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import ContentList from "./ContentList";
import { createClient } from "@/prismicio";
import Search from "@/components/Search";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({
  slice,
}: ContentIndexProps): Promise<JSX.Element> => {
  const client = createClient();
  const blogPosts = await client.getAllByType("blog_post");
  const projects = await client.getAllByType("project");

  const contentType = slice.primary.content_type || "Blog";

  const items = contentType === "Blog" ? blogPosts : projects;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div>
        <Heading size="xl" className="mb-8">
          {slice.primary.heading}
        </Heading>
        {isFilled.richText(slice.primary.description) && (
          <div className="prose prose-xl prose-invert mb-10">
            <PrismicRichText field={slice.primary.description} />
          </div>
        )}
        <Search contentType={contentType}>
          <ContentList
            allItems={items}
            contentType={contentType}
            viewMoreText={slice.primary.view_more_text}
            fallbackItemImage={slice.primary.fallback_item_image}
          />
        </Search>
      </div>
    </Bounded>
  );
};

export default ContentIndex;
