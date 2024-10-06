interface BaseSearchRequestParams {
  facets: string[];
  filters?: string;
  highlightPostTag: string;
  highlightPreTag: string;
  hitsPerPage: number;
  maxValuesPerFacet: number;
  page: number;
  query: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  facetFilters?: Array<any>;
}

export interface SearchRequestArticle extends BaseSearchRequestParams {}

export interface SearchRequestPromotion extends BaseSearchRequestParams {
  aroundLatLng: string;
  aroundRadius: number;
  analytics?: boolean;
  clickAnalytics?: boolean;
}

export interface SearchRequest<T extends BaseSearchRequestParams> {
  indexName: string;
  params: T;
}

export interface BaseProduct {
  brand: string;
  picture: string;
  market: string;
  category: string;
  packaging: string;
}

export interface Article extends BaseProduct {
  objectID: string;
  name: string;
  ean: string;
  tendency_3m: string;
  tendency_1y: string;
  tendency_full: string;
}

export interface Promotion extends BaseProduct {
  objectID: string;
  article_name: string;
  retailer: string;
  product_price: string;
  product_discount: number;
  product_unit_price: string;
  price_unit: string;
  promo_score: string;
  locations: string[];
}
