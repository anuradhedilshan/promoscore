import React, { useState } from "react";
import { ActionType, useStore } from "../store/app.store";

export type ContentType = "articles" | "promotions";

const ContentTypeToggle: React.FC = () => {
  console.log("Switch rerender");

  const { dispatch, state } = useStore();

  return (
    <div className="flex space-x-2 mt-2">
      <button
        onClick={() =>
          dispatch({ type: ActionType.SET_TYPE, payload: "articles" })
        }
        className={`flex-grow px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          state.selectedType === "articles"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700"
        }`}
      >
        Articles
      </button>
      <button
        onClick={() =>
          dispatch({ type: ActionType.SET_TYPE, payload: "promotions" })
        }
        className={`flex-grow px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          state.selectedType === "promotions"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700"
        }`}
      >
        Promotions
      </button>
    </div>
  );
};

const LocationFilter = () => {
  return (
    <div className="flex-1">
      <input
        disabled
        type="text"
        placeholder="Search location (for now, Bucharest only)"
        className="w-full pl-3 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-100"
      />
    </div>
  );
};

const ProductFilter = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex-1">
      <input
        value={search}
        type="text"
        placeholder="Name, Brand, Category..."
        className="w-full pl-3 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
};

const SearchFilter = () => {
  console.log("Filter render");
  const [search, setSearch] = useState("");
  const { dispatch } = useStore();
  return (
    <div className="border-[#3970CC] border p-4 rounded-lg">
      <div className=" flex items-center gap-4">
        <ProductFilter search={search} setSearch={setSearch} />
        <LocationFilter />
        <button
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          aria-label="Search"
          onClick={() => {
            dispatch({ type: ActionType.SET_QUERY, payload: search });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      <ContentTypeToggle />
    </div>
  );
};

export default SearchFilter;
