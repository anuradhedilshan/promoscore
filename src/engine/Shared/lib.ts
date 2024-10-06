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
