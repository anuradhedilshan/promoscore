/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useReducer } from "react";
import { UniversalFilterType } from "../componets/Catrgories";
import {
  SearchRequest,
  SearchRequestPromotion,
  SearchRequestArticle,
} from "../engine/types";

type ContentType = "articles" | "promotions";
type States = {
  location: string;
  facets: UniversalFilterType;
  selectedType: ContentType;
  query: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  facetFilters: SearchRequest<SearchRequestPromotion | SearchRequestArticle>[];
  status: "idle" | "running";
};

enum ActionType {
  SET_STATUS,
  SET_QUERY,
  SET_TYPE,
  SETCOUNT,
  SETPROGRESS,
  SET_AS_COMPLETE,
  SET_FILE_PATH,
  SET_RUNNING_STATE,
  SET_THREAD,
  SET_WORKING_PROXY_LIST,
  SET_LOGGER_DATA,
  CLEAR_LOG,
  SET_FACETS,
  SET_FACETFilters,
}

interface Action {
  type: ActionType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any; // You can specify the actual payload type based on the ActionType
}

function reducer(state: States, action: Action): States {
  console.log("reducer call", action);
  switch (action.type) {
    case ActionType.SET_FACETS:
      return { ...state, facets: action.payload };
    case ActionType.SET_FILE_PATH:
      return { ...state, location: action.payload };
    case ActionType.SET_TYPE:
      return { ...state, selectedType: action.payload };
    case ActionType.SET_QUERY:
      return { ...state, query: action.payload };
    case ActionType.SET_FACETFilters:
      return { ...state, facetFilters: action.payload };
    case ActionType.SET_STATUS:
      return { ...state, status: action.payload };
    default:
      return state;
  }
}

const defaultVal: States = {
  location: "",
  facets: {},
  selectedType: "articles",
  query: "",
  facetFilters: [],
  status: "idle",
};

const StoreContext = createContext<
  | {
      state: States;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

const Store = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, defaultVal);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
const useStore = () => {
  const c = useContext(StoreContext);
  if (c === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return c;
};

export { StoreContext, Store, ActionType, useStore };
