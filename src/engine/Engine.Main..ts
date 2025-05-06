/* eslint-disable @typescript-eslint/no-explicit-any */
import { CB } from "../../electron/render";
import {
  defaultRequestBodyArticle,
  defaultRequestBodyPromotion,
} from "./default";
import JSONWriter from "./JSONWriter";
import {
  ContentType,
  fetchStoreData,
  getOfferDetails,
  LocationData,
  Post,
} from "./Shared/lib";
import Logger from "./Shared/Logger";
import {
  SearchRequest,
  SearchRequestArticle,
  SearchRequestPromotion,
} from "./types";

let logger: Logger | null = null;
let f: CB | null = null;

export function setLoggerCallback(cb: CB): Logger {
  f = cb;
  logger = new Logger(cb);
  return logger;
}

function fireEvent(
  Type:
    | "progress"
    | "count"
    | "complete"
    | "error"
    | "details"
    | "warn"
    | "data",
  message: number | boolean | string | null | object | Array<any>
) {
  if (f) f(Type, message);
}

interface Promoscore_Response {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: { [key: string]: any[] }[];
}

export async function search_promoscore(
  type: ContentType,
  body?:
    | SearchRequest<SearchRequestPromotion | SearchRequestArticle>[]
    | undefined
): Promise<Promoscore_Response> {
  logger?.log("searching _promoscore .....");
  if (!body) {
    body =
      type == "articles"
        ? defaultRequestBodyArticle
        : defaultRequestBodyPromotion;
  }
  const { data } = await Post(body, type);

  return data as Promoscore_Response;
}

let DATA: any[] = [];

function formatPromotions(promotions: any[], contentType: ContentType) {
  return promotions.map((e) => {
    e = cleanData(e, contentType);

    // Create base object without price properties
    const formattedPromotion = { ...e };

    // Only add product_price if it exists
    if (e.mapPrice) {
      formattedPromotion.mapPrice.amount = (
        parseFloat(e.mapPrice.amount) / 100
      ).toFixed(2);
    }

    // Only add product_unit_price if it exists
    if (e.unitPrice) {
      // Fixed the property name here
      formattedPromotion.unitPrice.amount = (
        parseFloat(e.unitPrice.amount) / 100
      ).toFixed(2);
    }

    return formattedPromotion;
  });
}

const retailerCache = new Map<
  string,
  { name: string; retailer: LocationData }
>();

interface RetailerInfo {
  name: string;
  retailer: LocationData;
  offerId?: number;
}

async function getRetailerData(
  retailerId: string,
  offerId?: number
): Promise<RetailerInfo | null> {
  if (!retailerId) {
    logger?.warn("Empty retailerId passed");
    return null;
  }

  if (retailerCache.has(retailerId)) {
    logger?.log(`Found retailer ${retailerId} in cache`);
    console.log("data AVible in systen ", retailerCache.get(retailerId)!);

    return retailerCache.get(retailerId)!;
  }

  logger?.log(`Retailer ${retailerId} not found in cache, fetching details...`);

  try {
    if (offerId) {
      logger?.log(`Fetching offer details for ID: ${offerId}`);
      const offerResponse = await getOfferDetails(offerId);

      const { retailer } = offerResponse.data.data;

      if (retailer && retailer.name === retailerId) {
        console.log("fetching retailer id", retailer.id);
        const storeData = await fetchStoreData(retailer.id);
        console.log("reteerlers", storeData.data);
        if (storeData.data) {
          const retailerInfo: RetailerInfo = {
            name: retailer.name,
            retailer: storeData.data.data,
          };
          retailerCache.set(retailerId, retailerInfo);
          return retailerInfo;
        }
      }
    }
  } catch (e: any) {
    console.error(e.message);

    logger?.error("Error fetching retailer");
    return null;
  }

  return null;
}

async function addRetailer(promotions: any[]) {
  const updated = await Promise.all(
    promotions.map(async (e) => {
      if (e?.retailer?.name) {
        const ret = await getRetailerData(e.retailer.name, e.id);
        if (ret) {
          e.retailer = ret;
        }
      }
      return e;
    })
  );

  return updated;
}

interface CleanConfig {
  articles: string[];
  promotions: string[];
}

// Configuration for fields to remove
const REMOVE_FIELDS: CleanConfig = {
  articles: ["_index", "picture"],
  promotions: ["_geoloc", "_index", "graphee_id", "locations", "picture"],
};

function cleanData(data: any, contentType: ContentType): any | any[] {
  // Handle single object
  if (!Array.isArray(data)) {
    const cleanedData = { ...data };
    REMOVE_FIELDS[contentType].forEach((field) => {
      delete cleanedData[field];
    });
    return cleanedData;
  }
}

export async function start(
  type: ContentType,
  filePath: string,
  body: SearchRequest<SearchRequestPromotion | SearchRequestArticle>[]
) {
  logger?.log("Start Engine in Main.... ");
  const name = `${type}_${Date.now()}`;
  // const Writer = new CSVWriter(filePath, name, logger);
  const Writer = new JSONWriter(filePath, name, logger);

  let currentPage = 0;
  let totalPages = 1;

  if (body) {
    body[0].params.hitsPerPage = 100;
  } else {
    logger?.error("Body is Undefined");
  }

  do {
    try {
      logger?.log(`Fetching page ${currentPage}`);
      body[0].params.page = currentPage;
      const { results } = await search_promoscore(type, body);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      if (results.length > 0 && results[0].hits) {
        const { hits, nbPages } = results[0];
        console.log("Nb Page", nbPages);
        const dhits = formatPromotions(hits, type);
        if (type == "promotions") {
          console.log("IS PROMOTION ******");

          DATA = await addRetailer(dhits);
        } else {
          DATA = dhits;
        }

        totalPages = nbPages as unknown as number;
        logger?.log(`Fetching page ${currentPage} Done Out of ${totalPages}`);

        Writer.appendData(DATA);

        // Progress Calculate
      }
      currentPage++;
      const progressPercentage = ((currentPage / totalPages) * 100).toFixed(2);
      fireEvent("progress", progressPercentage);
      DATA = [];
      if (currentPage == totalPages - 1) fireEvent("complete", "done");
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
        logger?.error(`Main Loop Error: ${e.message}`);
      } else {
        console.error("Caught a non-Error value:", e);
        logger?.error("Main Loop Error: An unexpected error occurred");
      }
    }
  } while (currentPage < totalPages);
  await Writer.close();
  return {};
}
