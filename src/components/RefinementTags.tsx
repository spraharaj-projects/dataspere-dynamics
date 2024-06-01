import React, { useEffect, useState } from "react";
import { useRefinementList, UseRefinementListProps } from "react-instantsearch";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

const RefinementTags = (props: UseRefinementListProps) => {
  const { items, refine, searchForItems } = useRefinementList(props);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleTagSelection = (tag: string) => {
    let updatedTags;
    if (selectedTags.includes(tag)) {
      updatedTags = selectedTags.filter((t) => t !== tag);
    } else {
      updatedTags = [...selectedTags, tag];
    }
    setSelectedTags(updatedTags);
    refine(tag);
  };

  useEffect(() => {
    searchForItems(searchQuery)
  }, [searchQuery, searchForItems])

  return (
    <div className="mt-5 inline-flex gap-5">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-2xl bg-gray-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          Options
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom start"
            static
            className="w-60 origin-top-right rounded-md border border-white/5 bg-slate-800 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
          >
            <input
              type="search"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              maxLength={512}
              onChange={(event) => setSearchQuery(event.currentTarget.value)}
              className="w-full rounded-md px-2 font-bold text-black"
            />
            {items
              .sort((item1, item2) =>
                item1.label > item2.label
                  ? 1
                  : item2.label > item1.label
                    ? -1
                    : 0,
              )
              .map((item, index) => (
                <MenuItem key={index}>
                  <div
                    className="flex cursor-pointer items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => handleTagSelection(item.label)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(item.label)}
                      readOnly
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                    />
                    <label
                      htmlFor={`checkbox-item-${index}`}
                      className="ms-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {item.label}
                    </label>
                  </div>
                </MenuItem>
              ))}
          </MenuItems>
        </Transition>
      </Menu>
      <div className="inline-flex gap-2 px-3 py-1.5">
        {selectedTags.map((tag, index) => (
          <span key={index} className="rounded-xl bg-yellow-500 px-3">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RefinementTags;
