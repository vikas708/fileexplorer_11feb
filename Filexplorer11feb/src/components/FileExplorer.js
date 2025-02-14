import React, { useState, useEffect, useCallback } from "react";
import { PlusCircle, Trash2, Pencil } from "lucide-react";
import RenameInput from "./RenameInput";
import AddInput from "./AddInput";
import "../styles/Fileexplorer.css";

export default function FileExplorer({ folderData, onUpdate }) {
  const [showChildren, setShowChildren] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(folderData.name);
  const [isAdding, setIsAdding] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleClick = () => setShowChildren((prev) => !prev);

  const showError = useCallback((message) => {
    setError(message);
    setShake(true);
    setTimeout(() => setShake(false), 500);
    setTimeout(() => setError(""), 2000);
  }, []);

  const handleRename = useCallback(() => {
    if (!isRenaming) {
      setIsRenaming(true);
      return;
    }
    if (!newName.trim()) {
      showError("Name cannot be empty.");
      return;
    }
    onUpdate(folderData, "rename", newName.trim());
    setIsRenaming(false);
  }, [isRenaming, newName, onUpdate, folderData, showError]);

  const handleAdd = useCallback(() => {
    if (!isAdding) {
      setIsAdding(true);
      return;
    }
    if (!newItemName.trim()) {
      showError("Name cannot be empty.");
      return;
    }

    const isDuplicate = (folderData.children || []).some(
      (item) => item.name.toLowerCase() === newItemName.trim().toLowerCase()
    );

    if (isDuplicate) {
      showError("A file or folder with this name already exists.");
      return;
    }

    const newItemType = newItemName.includes(".") ? "file" : "folder";
    onUpdate(folderData, "add", newItemName.trim(), newItemType);
    setNewItemName("");
    setIsAdding(false);
  }, [isAdding, newItemName, folderData, onUpdate, showError]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      setIsAdding(false);
      setIsRenaming(false);
      setError("");
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="parentcontainer">
      <h5 className="folders">
        <span onClick={handleClick} style={{ cursor: "pointer" }}>
          {folderData.type === "folder" ? (showChildren ? "📂" : "📁") : "📄"}{" "}
          {isRenaming ? (
            <RenameInput value={newName} onChange={setNewName} onSubmit={handleRename} shake={shake} />
          ) : (
            folderData.name
          )}
        </span>

        <div className="action-buttons">
          <button data-tooltip="Edit" onClick={handleRename}>
            <Pencil size={10} />
          </button>
          <button data-tooltip="Delete" onClick={() => onUpdate(folderData, "delete")}>
            <Trash2 size={10} />
          </button>
          {folderData.type === "folder" && (
            <button data-tooltip="Create" onClick={handleAdd}>
              {isAdding ? "Save" : <PlusCircle size={10} />}
            </button>
          )}
        </div>
      </h5>

      {isAdding && <AddInput value={newItemName} onChange={setNewItemName} onSubmit={handleAdd} error={error} shake={shake} />}

      {showChildren &&
        folderData?.children?.map((child, index) => (
          <FileExplorer key={index} folderData={child} onUpdate={onUpdate} />
        ))}
    </div>
  );
}
