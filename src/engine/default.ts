import {
  SearchRequest,
  SearchRequestPromotion,
  SearchRequestArticle,
} from "./types";

const defaultRequestBodyPromotion: SearchRequest<SearchRequestPromotion>[] = [
  {
    indexName: "_cheapest",
    params: {
      aroundLatLng: "44.4267674, 26.1025384",
      aroundRadius: 5000,
      facets: [
        "brand",
        "category",
        "characteristics_search",
        "is_promo",
        "origin",
        "promo_score",
        "retailer",
      ],
      filters: "",
      highlightPostTag: "__/ais-highlight__",
      highlightPreTag: "__ais-highlight__",
      hitsPerPage: 2,
      maxValuesPerFacet: 2,
      page: 1,
      query: "",
    },
  },
];
const defaultRequestBodyArticle: SearchRequest<SearchRequestArticle>[] = [
  {
    indexName: "search-promoscore-articles",
    params: {
      facets: ["brand", "category", "characteristics_search", "origin"],
      filters: "country:ro",
      highlightPostTag: "__/ais-highlight__",
      highlightPreTag: "__ais-highlight__",
      hitsPerPage: 2,
      maxValuesPerFacet: 2,
      page: 2,
      query: "",
    },
  },
];

export { defaultRequestBodyArticle, defaultRequestBodyPromotion };
