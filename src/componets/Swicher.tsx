import React from "react";
import { ActionType, useStore } from "../store/app.store";

export type ContentType = "articles" | "promotions";

const ContentTypeToggle: React.FC = () => {
  console.log("Switch rerender");

  const { dispatch, state } = useStore();

  return (
    <div className="flex space-x-2 mt-4">
      <button
        onClick={() =>
          dispatch({ type: ActionType.SET_TYPE, payload: "articles" })
        }
        className={`flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          state.selectedType === "articles"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700"
        }`}
      >
        Articles
      </button>
      <button
        onClick={() =>
          dispatch({ type: ActionType.SET_TYPE, payload: "promotions" })
        }
        className={`flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          state.selectedType === "promotions"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700"
        }`}
      >
        Promotions
      </button>
    </div>
  );
};

export default React.memo(ContentTypeToggle);
