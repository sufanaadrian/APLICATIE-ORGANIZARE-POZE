// controllers/photos.js

import mongoose from "mongoose";
import Photo from "../models/Photo.js";

export const getPhotosByFolderFunc = async (req, res) => {
  try {
    // Parse the selected criterion from the query parameters
    const criterion = req.query.criterion;
    // Retrieve the photos for the specified folder from the database
    const photos = await Photo.find({ folderId: req.params.folderId });
    // Sort the photos based on the selected criterion
    const sortedPhotos = sortPhotos(photos, criterion);
    // Return the sorted photos to the client
    res.json(sortedPhotos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadPhotoFunc = async (req, res) => {
  try {
    // Create a new Photo model with the uploaded file's details
    const photo = new Photo({
      userId: req.user._id,
      folderId: req.body.folderId,
      name: req.file.originalname,
      date: new Date(),
      url: req.file.path,
    });
    // Save the photo to the database
    await photo.save();
    // Return the uploaded photo to the client
    res.json(photo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePhotoFunc = async (req, res) => {
  try {
    // Delete the photo from the database
    await Photo.findByIdAndDelete(req.params.id);
    // Return a success message to the client
    res.json({ message: "Photo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function for sorting photos based on the selected criterion
function sortPhotos(photos, criterion) {
  switch (criterion) {
    case "date":
      return photos.sort((a, b) => b.date - a.date);
    case "name":
      return photos.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return photos;
  }
}
