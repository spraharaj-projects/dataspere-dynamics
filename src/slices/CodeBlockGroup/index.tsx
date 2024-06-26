"use client";

import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useState } from "react";
import CodeHighligher from "../../components/CodeHighligher";

/**
 * Props for `CodeBlockGroup`.
 */
export type CodeBlockGroupProps =
  SliceComponentProps<Content.CodeBlockGroupSlice>;

/**
 * Component for "CodeBlockGroup" Slices.
 */
const CodeBlockGroup = ({ slice }: CodeBlockGroupProps): JSX.Element => {
  const [openTab, setOpenTab] = useState(0);
  return (
    <div className="w-4/5">
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="-mb-px flex list-none flex-wrap" role="tablist">
          {slice.items.map((item, index) => (
            <li className="mr-2" role="presentation" key={index}>
              <button
                className={`inline-block rounded-t-lg border-b-2 px-4 py-2 text-center text-sm font-medium ${
                  openTab === index
                    ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
                type="button"
                role="tab"
                onClick={() => setOpenTab(index)}
              >
                {item.coding_language}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Tab Content */}
      <div>
        {slice.items.map((item, index) => (
          <div
            key={index}
            className={`${openTab === index ? "block" : "hidden"}`}
            role="tabpanel"
          >
            <CodeHighligher codeBlock={asText(item.code)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeBlockGroup;
