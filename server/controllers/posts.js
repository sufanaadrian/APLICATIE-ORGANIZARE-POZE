import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPostInFeedFunc = async (req, res) => {
  try {
    const {
      userId,
      description,
      picturePath,
      isSharable,
      exifData,
      dominantColors,
    } = req.body;
    const user = await User.findById(userId);
    const newPostInfEED = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      cameraBody: user.cameraBody,
      cameraLens: user.cameraLens,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      isSharable: isSharable,
      comments: [],
      exifData,
      dominantColors,
    });
    await newPostInfEED.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getPostsFromFeedFunc = async (req, res) => {
  try {
    const post = await Post.find({ isSharable: true });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPostsByUserFunc = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

export const likePostFromFeedFunc = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const sharePostInFeedFunc = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { isSharable: true },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const removePostFromFeedFunc = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { isSharable: false },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const deletePostFunc = async (req, res) => {
  try {
    // Get the postId from the URL parameter
    const { id } = req.params;

    // Delete the post from the collection
    await Post.findByIdAndDelete(id);
    // Send a response to the client
    res.send({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
