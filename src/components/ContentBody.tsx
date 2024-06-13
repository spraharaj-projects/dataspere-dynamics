import { SliceZone } from "@prismicio/react";

import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content, DateField, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { FaGithub } from "react-icons/fa";

export default function ContentBody({
  page,
}: {
  page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
  function formatDate(date: DateField) {
    if (isFilled.date(date)) {
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      return new Intl.DateTimeFormat("en-US", dateOptions).format(
        new Date(date),
      );
    }
  }

  const formatedDate = formatDate(page.data.date);

  return (
    <Bounded as="article">
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
        <Heading as="h1">{page.data.title}</Heading>
        <div className="mt-4 flex w-2/3 flex-wrap justify-items-start gap-4 text-xl font-bold text-yellow-400">
          {page.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <p className="mt-8 flex justify-between border-b border-slate-600 text-xl font-medium text-slate-300">
          {formatedDate}
          {isFilled.link(page.data.repository_link) && (
            <PrismicNextLink field={page.data.repository_link}>
              <button
                type="button"
                className="mb-2 me-2 inline-flex items-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-gray-500"
              >
                <FaGithub className="me-2" size={20} />
                Github Repository
              </button>
            </PrismicNextLink>
          )}
        </p>
        <div className="prose prose-lg prose-invert mt-6 w-full max-w-none md:mt-10">
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </div>
    </Bounded>
  );
}
