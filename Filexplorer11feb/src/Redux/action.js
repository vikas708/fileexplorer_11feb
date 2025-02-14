// src/redux/fileExplorerActions.js

import { UPDATE_FILE_STRUCTURE,SET_SEARCH_QUERY } from "./constant";

export const updateFileStructure = (item, actionType, newName = "", newType = "file") => ({
  type: UPDATE_FILE_STRUCTURE,
  payload: { item, actionType, newName, newType },
});

export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});
