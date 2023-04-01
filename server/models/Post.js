import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    cameraBody: String,
    cameraLens: String,
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    isSharable: {
      type: Boolean,
      default: false,
    },
    comments: {
      type: Array,
      default: [],
    },
    exifData: {
      type: Object,
      default: [],
    },
    dominantColors: {
      type: [
        {
          r: { type: Number },
          g: { type: Number },
          b: { type: Number },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
