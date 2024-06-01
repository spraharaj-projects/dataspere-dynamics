"use client";

import algoliasearch from "algoliasearch/lite";
import { InstantSearch, RefinementList, SearchBox } from "react-instantsearch";
import InstantSearchBox from "./InstantSearchBox";
import RefinementTags from "./RefinementTags";

const Search = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID ?? "",
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY ?? "",
  );

  return (
    <InstantSearch searchClient={searchClient} indexName="blog">
      <InstantSearchBox />
      <RefinementTags attribute="tags" />

      {children}
    </InstantSearch>
  );
};

export default Search;
