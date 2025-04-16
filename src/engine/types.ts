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
  favoriteKey: string;
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

export interface Article {
  objectID: string;
  _index: string;
  _score: null;
  id: string;
  slug: string | null;
  name: string;
  picture: string;
  brand: string;
  category: string;
  market: string;
  packaging: string;
  tendency: {
    "3m": number;
    "1y": number;
    full: number;
  };
}

export interface Promotion {
  objectID: string;
  _index: string;
  _score: null;
  id: string;
  brand: string;
  article: {
    id: string;
    name: string;
    slug: string;
    brand: string;
    packaging: string;
  };
  picture: string;
  country: string;
  market: string;
  retailer: {
    name: string;
  };
  score: string;
  discount: number;
  externalLink: string;
  period: Record<string, never>;
  status: string;
  daysRemaining: number;
  unitPrice: {
    amount: number;
    currency: string;
    unit: string;
  };
  mapPrice: {
    amount: number;
    currency: string;
  };
}
