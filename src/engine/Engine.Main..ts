/* eslint-disable @typescript-eslint/no-explicit-any */
import { CB } from "../../electron/render";
import { CSVWriter } from "./CsvWriter";
import {
  defaultRequestBodyArticle,
  defaultRequestBodyPromotion,
} from "./default";
import { ContentType, Post } from "./Shared/lib";
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

    return {
      ...e,
      price: (parseFloat(e.product_price) / 100).toFixed(2),
    };
  });
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
  const Writer = new CSVWriter(filePath, name, logger);

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
      if (results.length > 0) {
        const { hits, nbPages } = results[0];
        console.log("Nb Page", nbPages);
        const dhits = formatPromotions(hits, type);
        DATA = dhits;
        totalPages = nbPages as unknown as number;
        logger?.log(`Fetching page ${currentPage} Done Out of ${totalPages}`);

        Writer.writeData(DATA);

        // Progress Calculate
      }
      currentPage++;
      const progressPercentage = ((currentPage / totalPages) * 100).toFixed(2);
      fireEvent("progress", progressPercentage);
      DATA = [];
      if (currentPage == totalPages - 1) fireEvent("complete", "done");
    } catch (e) {
      console.error(e);
      logger?.error("Got Error in Main Loop");
    }
  } while (currentPage < totalPages + 1);
  await Writer.close();
  return {};
}
