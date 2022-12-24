import React, { useState, useEffect } from "react";
import axios from "axios";

const Photo = () => {
  // Use state to store the list of photos and the selected folder
  const [photos, setPhotos] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);

  // Use effect hook to fetch the list of photos for the selected folder from the backend API
  useEffect(() => {
    const fetchPhotos = async () => {
      if (!selectedFolder) return;
      const { data } = await axios.get(
        `/api/photos?folderId=${selectedFolder._id}`
      );
      setPhotos(data);
    };
    fetchPhotos();
  }, [selectedFolder]);

  // Function to handle photo upload
  const handlePhotoUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", e.target.photo.files[0]);
    formData.append("folderId", selectedFolder._id);
    try {
      const { data } = await axios.post("/api/photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      setPhotos([...photos, data]);
    } catch (error) {
      console.error(error);
      alert("Error uploading photo");
    }
  };

  // Function to handle photo deletion
  const handleDeletePhoto = async (photoId) => {
    try {
      await axios.delete(`/api/photos/${photoId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      setPhotos(photos.filter((photo) => photo._id !== photoId));
    } catch (error) {
      console.error(error);
      alert("Error deleting photo");
    }
  };

  // Render the component
  return (
    <div>
      {selectedFolder && (
        <>
          <h1>Photos in {selectedFolder.folderName}</h1>
          <form onSubmit={handlePhotoUpload}>
            <input type="file" name="photo" />
            <button type="submit">Upload photo</button>
          </form>
          <ul>
            {photos.map((photo) => (
              <li key={photo._id}>
                <img src={photo.url} alt={photo.name} />
                <button onClick={() => handleDeletePhoto(photo._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      {!selectedFolder && <h1>No folder selected</h1>}
    </div>
  );
};

export default Photo;
