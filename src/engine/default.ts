import {
  SearchRequest,
  SearchRequestPromotion,
  SearchRequestArticle,
} from "./types";

const defaultRequestBodyPromotion: SearchRequest<SearchRequestPromotion>[] = [
  {
    indexName: "search-promoscore-promotions",
    params: {
      aroundLatLng: "44.4267674, 26.1025384",
      aroundRadius: 5000,
      facets: [
        "brand",
        "category",
        "characteristics_search",
        "origin",
        "promo_score",
        "retailer",
      ],
      highlightPostTag: "__/ais-highlight__",
      highlightPreTag: "__ais-highlight__",
      hitsPerPage: 2,
      maxValuesPerFacet: 20,
      page: 0,
      query: "",
    },
  },
];

const defaultRequestBodyArticle: SearchRequest<SearchRequestArticle>[] = [
  {
    indexName: "search-promoscore-articles",
    params: {
      facets: ["brand", "category", "characteristics_search", "origin"],
      highlightPostTag: "__/ais-highlight__",
      highlightPreTag: "__ais-highlight__",
      hitsPerPage: 2,
      maxValuesPerFacet: 20,
      page: 0,
      query: "",
    },
  },
];

export { defaultRequestBodyArticle, defaultRequestBodyPromotion };
