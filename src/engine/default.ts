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
      aroundRadius: 10000,
      facets: [
        "brand",
        "category",
        "characteristics_search",
        "market",
        "origin",
        "promo_score",
        "retailer",
      ],
      favoriteKey: "id",
      filters: "NOT offer_type:coupon",
      highlightPostTag: "__/ais-highlight__",
      highlightPreTag: "__ais-highlight__",
      hitsPerPage: 30,
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
      favoriteKey: "id",
      filters: "country:ro",
      highlightPostTag: "__/ais-highlight__",
      highlightPreTag: "__ais-highlight__",
      hitsPerPage: 30,
      maxValuesPerFacet: 20,
      page: 0,
      query: "",
    },
  },
];

export { defaultRequestBodyArticle, defaultRequestBodyPromotion };
