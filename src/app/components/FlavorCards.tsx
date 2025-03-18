"use client";

import { useFilterContext } from "../contexts/FilterProvider";

const FlavorCards = () => {
  const { flavorList, selectedTags, setSelectedTags } = useFilterContext();

  const toggleTag = (tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]
    );
  };

  return (
    <div className="basis-1/3 display-card">
      <h1 className="flex w-full justify-center items-center font-bold text-lg">
        What Flavors Are We Feeling Today?
      </h1>
      <div className="sticky top-2 flex max-h-full overflow-y-auto flex-wrap gap-2 border border-slate-500 p-2 rounded-md inset-shadow-black inset-shadow-xs">
        {flavorList.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`p-2 rounded-md border hover:bg-blue-400 ${
              selectedTags.includes(tag)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 shadow-black shadow-xs"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FlavorCards;
