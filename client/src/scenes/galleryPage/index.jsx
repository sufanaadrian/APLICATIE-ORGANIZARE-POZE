import React from "react";
import Folder from "components/Folder.jsx";
import Photo from "components/Photo.jsx";

const GalleryPage = () => {
  return (
    <div>
      <h1>Gallery</h1>
      <Folder />
      <Photo />
    </div>
  );
};

export default GalleryPage;
