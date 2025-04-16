import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ActionType, useStore } from "../store/app.store";
import {
  defaultRequestBodyArticle,
  defaultRequestBodyPromotion,
} from "../engine/default";
import {
  SearchRequest,
  SearchRequestArticle,
  SearchRequestPromotion,
} from "../engine/types";

type NestedObject = {
  [key: string]: number;
};

export type UniversalFilterType = {
  [key: string]: NestedObject;
};

function CategoriesComponent() {
  const { state, dispatch } = useStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: string[];
  }>({});

  const data: UniversalFilterType = useMemo(
    () => state.facets || {},
    [state.facets]
  );

  const isLoading = useMemo(
    () => Object.keys(data).length === 0 && !error,
    [data, error]
  );

  const fetchCategories = useCallback(
    (
      facetFilters?:
        | SearchRequest<SearchRequestArticle | SearchRequestPromotion>[]
        | undefined
    ) => {
      console.log("filtersr",facetFilters);

      setError(null);
      window.MyApi.searchData(state.selectedType, facetFilters)
        .then((d) => {
          dispatch({
            type: ActionType.SET_FACETS,
            payload: d,
          });
        })
        .catch((e) => {
          console.error(e);
          setError("Failed to fetch categories. Please try again.");
        });
    },
    [dispatch, state.selectedType]
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filteredItems = useMemo(() => {
    const allFilteredItems: { [key: string]: [string, number][] } = {};
    expandedCategories.forEach((category) => {
      allFilteredItems[category] = Object.entries(data[category] || {}).filter(
        ([key]) => key.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    return allFilteredItems;
  }, [expandedCategories, data, searchTerm]);

  const displayedItems = useMemo(() => {
    const allDisplayedItems: { [key: string]: [string, number][] } = {};
    Object.entries(filteredItems).forEach(([category, items]) => {
      allDisplayedItems[category] = showAll ? items : items.slice(0, 5);
    });
    return allDisplayedItems;
  }, [showAll, filteredItems]);

  const handleCategoryClick = useCallback(
    (category: string) => {
      setExpandedCategories((prev) =>
        prev.includes(category)
          ? prev.filter(
              (c) =>
                c !== category ||
                (selectedItems[c] && selectedItems[c].length > 0)
            )
          : [...prev, category]
      );
    },
    [selectedItems]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const toggleShowAll = useCallback(() => {
    setShowAll((prev) => !prev);
  }, []);

  const handleItemSelect = useCallback(
    (category: string, item: string) => {
      setSelectedItems((prev) => {
        const categoryItems = prev[category] || [];
        const updatedItems = categoryItems.includes(item)
          ? categoryItems.filter((i) => i !== item)
          : [...categoryItems, item];
        return {
          ...prev,
          [category]: updatedItems,
        };
      });
      if (!expandedCategories.includes(category)) {
        setExpandedCategories((prev) => [...prev, category]);
      }
    },
    [expandedCategories]
  );

  const facetFilters = useMemo(() => {
    return (
      Object.entries(selectedItems)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, items]) => items.length > 0)
        .map(([category, items]) => items.map((item) => `${category}:${item}`))
    );
  }, [selectedItems]);

  useEffect(() => {
    console.log("Facet Filters useEffect:", facetFilters);
    // You can dispatch these facet filters to your store or use them as needed
    dispatch({ type: ActionType.SET_FACETFilters, payload: facetFilters });
    const pa: SearchRequest<SearchRequestPromotion | SearchRequestArticle>[] =
      state.selectedType == "articles"
        ? defaultRequestBodyArticle
        : defaultRequestBodyPromotion;
    pa[0].params.facetFilters = facetFilters;
    dispatch({ type: ActionType.SET_FACETFilters, payload: pa });
    fetchCategories(pa);
  }, [dispatch, facetFilters, fetchCategories, state.selectedType]);

  if (error) {
    return (
      <div className="w-full min-w-[300px] max-h-[90vh] h-[90vh] overflow-y-auto p-4 border-[#3970CC] border ml-1 mt-2 rounded-md shadow-md flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-xl font-semibold text-red-600">{error}</p>
          <button
            onClick={() => {
              fetchCategories();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full min-w-[300px] max-h-[90vh] h-[90vh] overflow-y-auto p-4 border-[#3970CC] border ml-1 mt-2 rounded-md shadow-md flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl font-semibold text-blue-600">
            Fetching Categories ...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-w-[320px] max-h-[90vh] h-[90vh] overflow-y-auto p-4 border-[#3970CC] border ml-1 mt-2 rounded-md shadow-md">
      <div className="w-full max-w-md mx-auto bg-white">
        <div className="mb-4 p-2 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Selected Filters:</h3>
          {Object.entries(selectedItems).map(([category, items]) =>
            items.map((item) => (
              <span
                key={`${category}-${item}`}
                className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2"
              >
                {category}: {item}
                <button
                  className="ml-2 text-blue-600 hover:text-blue-800"
                  onClick={() => handleItemSelect(category, item)}
                >
                  ×
                </button>
              </span>
            ))
          )}
        </div>
        {Object.keys(data).map((category) => (
          <div key={category}>
            <div
              className="bg-blue-600 text-white py-1 px-2 mb-2 font-semibold text-sm rounded cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
            {expandedCategories.includes(category) && (
              <div className="p-1">
                <div className="relative mb-2">
                  <input
                    type="text"
                    placeholder={`Search for ${category}...`}
                    className="w-full pl-3 pr-10 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <ul>
                  {displayedItems[category]?.map(([item, count]) => (
                    <li
                      key={item}
                      className="flex items-center justify-between py-2 border-b last:border-b-0"
                    >
                      <span className="flex-grow">{item}</span>
                      <span className="text-gray-500 mr-2">{count}</span>
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        checked={(selectedItems[category] || []).includes(item)}
                        onChange={() => handleItemSelect(category, item)}
                      />
                    </li>
                  ))}
                </ul>
                {filteredItems[category]?.length > 5 && (
                  <button
                    className="mt-3 text-blue-600 hover:underline focus:outline-none"
                    onClick={toggleShowAll}
                  >
                    {showAll ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(CategoriesComponent);
