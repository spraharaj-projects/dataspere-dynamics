import algoliasearch from "algoliasearch";
import { createClient } from "@/prismicio";
import { asText, Content, SliceZone } from "@prismicio/client";
import { NextRequest } from "next/server";

const transformSlices = (slices: SliceZone<Content.BlogPostDocumentDataSlicesSlice>) => {

  const textStrings = slices.map((slice) => {
    if (slice.slice_type === "text_block") {
      return asText(slice.primary.text);
    }
    if (slice.slice_type === "image_block") {
      return asText(slice.primary.caption);
    }
  });
  return textStrings.join(" ");
};

export async function POST(request: NextRequest) {
  if (
    !process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID ||
    !process.env.ALGOLIA_WRITE_KEY
  ) {
    return new Response("Algolia credentials are not set.", {
      status: 500,
    });
  }

  try {
    const prismicClient = createClient();
    const algoliaClient = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
      process.env.ALGOLIA_WRITE_KEY,
    );

    const index = algoliaClient.initIndex("blog");
    const blog_posts = await prismicClient.getAllByType("blog_post");
    const blog_records = blog_posts.map((post) => ({
      objectID: post.id,
      title: post.data.title,
      slug: post.uid,
      tags: post.tags,
      image: post.data.hover_image,
      date: post.data.date,
      text: transformSlices(post.data.slices),
    }));

    await index.saveObjects(blog_records);

    return new Response(
      "Content successfully synchronized with Algolia search",
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);
    return new Response("An error occurred while synchronizing content", {
      status: 500,
    });
  }
}
