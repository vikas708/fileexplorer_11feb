import React from "react";
import { useSelector, useDispatch } from "react-redux";
import FileExplorer from "./components/FileExplorer";
import { updateFileStructure, setSearchQuery } from "./Redux/action";
import "./App.css";

export default function App() {
  const dispatch = useDispatch();
  const fileStructure = useSelector((state) => state.fileStructure);
  const searchQuery = useSelector((state) => state.searchQuery);

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const clearSearch = () => {
    dispatch(setSearchQuery(""));
  };

  const filterFileStructure = (folder) => {
    if (!folder) return null;

    const isFolder = folder.type === "folder";
    const isMatch = folder.name.toLowerCase().includes(searchQuery.toLowerCase());

    let filteredChildren = [];

    if (folder.children) {
      filteredChildren = folder.children.map(filterFileStructure).filter(Boolean);
    }

    if (isFolder && (isMatch || filteredChildren.length > 0)) {
      return { ...folder, children: filteredChildren };
    }

    if (!isFolder && isMatch) {
      return folder;
    }

    return null;
  };

  const filteredFileStructure = filterFileStructure({ ...fileStructure });

  // Check if no results found
  const isEmptyResult =
    searchQuery &&
    (!filteredFileStructure || !filteredFileStructure.children || filteredFileStructure.children.length === 0);

  const safeFilteredStructure = filteredFileStructure || { name: "File Explorer", type: "folder", children: [] };

  return (
    <div className="app-container">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search files & folders..."
          value={searchQuery}
          onChange={handleSearch}
        />
        {searchQuery && <button className="clear-btn" onClick={clearSearch}>×</button>}
      </div>

      {isEmptyResult ? (
        <p className="no-results">No files or folders found.</p>
      ) : (
        <FileExplorer
          folderData={safeFilteredStructure}
          onUpdate={(item, actionType, newName, newType) => {
            dispatch(updateFileStructure(item, actionType, newName, newType));
          }}
        />
      )}
    </div>
  );
}
