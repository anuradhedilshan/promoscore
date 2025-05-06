import axios, { AxiosResponse, RawAxiosRequestHeaders } from "axios";

export type ContentType = "articles" | "promotions";

const HeadersS: RawAxiosRequestHeaders = {
  Accept: "*/*",
  "Accept-Language": "en-US,en;q=0.9,si;q=0.8",
  "Content-Type": "application/json",
  DNT: "1",
  Origin: "https://promoscore.io",
  Priority: "u=1, i",
  Referer: "https://promoscore.io/offers",
  "Sec-CH-UA":
    '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
  "Sec-CH-UA-Mobile": "?0",
  "Sec-CH-UA-Platform": '"Linux"',
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
};

export function Post(
  requestBody: string | unknown[],
  contentType: ContentType
): Promise<AxiosResponse> {
  return axios.post(
    `https://promoscore.io/api/search/search-promoscore-${
      contentType == "articles" ? "articles" : "promotions"
    }`,
    requestBody,
    {
      headers: {
        ...HeadersS,
      },
    }
  );
}

export interface OfferResponse {
  data: {
    id: string;
    ean: string;
    article: {
      id: string;
      name: string;
      slug: string;
      brand: string;
      packaging: string;
      category: string;
      parentCategoryId: string;
    };
    picture: string;
    country: string;
    market: string;
    retailer: {
      id: string;
      name: string;
      logo: string;
    };
    score: string;
    discount: number;
    externalLink: string;
    period: Record<string, unknown>;
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
    crossedPrice: {
      amount: number;
      currency: string;
    };
    priceEvolution: {
      [quarter: string]: number;
    };
    monthlyVariation: number[];
    priceStats: {
      count: number;
      min: number;
      max: number;
    };
    tendency: {
      "3M": number;
      "1Y": number;
      FULL: number;
    };
    type: string;
  };
}

export type LocationData = {
  id: string;
  placeId: string;
  gmapUrl: string;
  country: string;
  street: string;
  zipCode: string;
  location: [number, number]; // [latitude, longitude]
  city: string;
  retailer: {
    id: string;
    name: string;
    logo: string;
    website: string;
  };
  distance: number;
};

export function getOfferDetails(
  offerId: number
): Promise<AxiosResponse<OfferResponse>> {
  return axios.get(`https://promoscore.io/api/offers/${offerId}`, {
    headers: HeadersS,
  });
}

export async function fetchStoreData(
  retailerId: string
): Promise<AxiosResponse<{ data: LocationData }>> {
  return await axios.get(
    `https://promoscore.io/api/retailers/${retailerId}/nearest-store?latLng=44.4267674%2C26.1025384&distance=9000000`,
    { headers: HeadersS }
  );
}
