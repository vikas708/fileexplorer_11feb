
import initialData from "../data.json";
import { UPDATE_FILE_STRUCTURE, SET_SEARCH_QUERY } from "./constant";

const initialState = {
  fileStructure: initialData,
  searchQuery: "",
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FILE_STRUCTURE: {
      const { item, actionType, newName, newType } = action.payload;

      const updateStructure = (folder) => {
        if (!folder) return folder;

        if (folder.name === item.name && folder.type === item.type) {
          if (actionType === "delete") return null;
          if (actionType === "rename") return { ...folder, name: newName };
          if (actionType === "add") {
            const newItem = { name: newName, type: newType, children: [] };
            return { ...folder, children: [...folder.children, newItem] };
          }
        }

        if (folder.children) {
          folder.children = folder.children.map(updateStructure).filter(Boolean);
        }
        return folder;
      };

      const newStructure = updateStructure({ ...state.fileStructure });

      return {
        ...state,
        fileStructure: newStructure || { name: "File Explorer", type: "folder", children: [] },
      };
    }

    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload.toLowerCase(),
      };

    default:
      return state;
  }
};

export default Reducer;
