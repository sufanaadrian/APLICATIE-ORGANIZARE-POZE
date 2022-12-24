import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Folder = () => {
  // Use state to store the list of folders and the currently selected folder
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folderName, setFolderName] = useState("");
  const token = useSelector((state) => state.token);

  // Use effect hook to fetch the list of folders from the backend API
  useEffect(() => {
    const fetchFolders = async () => {
      const { data } = await axios.get("http://localhost:3001/folders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFolders(data); // set folders to data.folders instead of data
    };
    fetchFolders();
  }, [token]);

  // Function to handle folder creation
  const handleCreateFolder = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/folders",
        {
          folderName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFolders([...folders, data]);
      setFolderName("");
    } catch (error) {
      console.error(error);
      alert("Error creating folder");
    }
  };

  // Function to handle folder deletion
  const handleDeleteFolder = async (folderId) => {
    try {
      await axios.delete(`http://localhost:3001/folders/${folderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFolders(folders.filter((folder) => folder._id !== folderId));
      setSelectedFolder(null);
    } catch (error) {
      console.error(error);
      alert("Error deleting folder");
    }
  };

  // Function to handle folder selection
  const handleFolderSelection = (folder) => {
    setSelectedFolder(folder);
  };
  return (
    <div>
      <h1>Folders</h1>
      <form onSubmit={handleCreateFolder}>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Enter folder name"
        />
        <button type="submit">Create folder</button>
      </form>
      <ul>
        {folders.map((folder) => (
          <li key={folder._id}>
            <span onClick={() => handleFolderSelection(folder)}>
              {folder.folderName}
            </span>
            <button onClick={() => handleDeleteFolder(folder._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Folder;
