// import { ipcRenderer } from "electron";
import React from "react";
import { ActionType, useStore } from "../store/app.store";

const FileDownloadSection: React.FC = () => {
  const { state, dispatch } = useStore();

  const handleStartDownload = () => {
    if (state.location) {
      window.MyApi.start(
        state.selectedType,
        state.location,
        state.facetFilters
      );
      dispatch({ type: ActionType.SET_STATUS, payload: "running" });
    } else {
      window.MyApi.showFilePathError();
    }
  };

  return (
    <div className="p-6 w-full">
      {/* File Input and Set Path Button */}
      <div className="flex items-center mb-2">
        <input
          type="text"
          value={state.location}
          disabled
          placeholder="Set File Path"
          className="flex-1 p-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none"
        />
        <button
          className="ml-3 px-4 py-1 bg-blue-600 text-white rounded-md"
          onClick={async () => {
            console.log("click path open");
            const e = await window.MyApi.openFilePicker();

            dispatch({
              type: ActionType.SET_FILE_PATH,
              payload: e,
            });
          }}
        >
          Set Path
        </button>
      </div>
      <span>Location : {state.location}</span>

      {/* Buttons */}
      <div className="flex justify-end mb-2">
        <button
          onClick={handleStartDownload}
          className={`px-4 py-2 ${
            state.status == "running" ? "bg-gray-500" : "bg-blue-600"
          } text-white rounded-md`}
          disabled={state.status == "running"}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default FileDownloadSection;
