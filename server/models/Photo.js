// models/Photo.js

import mongoose from "mongoose";
const photoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  folderId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  tags: {
    type: [String],
  },
});

const Photo = mongoose.model("Photo", photoSchema);

export default Photo;
