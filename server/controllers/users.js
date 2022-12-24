import User from "../models/User.js";

/* get the user exp func*/
export const getUserFunc = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
/* ada or remove users func */
export const addRemoveFriendFunc = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const friendOfUserId = await User.findById(friendId);
    const userId = await User.findById(id);

    //setting up the add remove conditions by filtering the friend id's lists
    if (userId.friends.includes(friendId)) {
      userId.friends = userId.friends.filter((id) => id !== friendId);
      friendOfUserId.friends = friendOfUserId.friends.filter((id) => id !== id);
    } else {
      userId.friends.push(friendId);
      friendOfUserId.friends.push(id);
    }
    await userId.save();
    await friendOfUserId.save();

    //mapping the friends
    const friends = await Promise.all(
      userId.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({
        _id,
        firstName,
        lastName,
        cameraBody,
        cameraLens,
        location,
        picturePath,
      }) => {
        return {
          _id,
          firstName,
          lastName,
          cameraBody,
          cameraLens,
          location,
          picturePath,
        };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriendsFunc = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = await User.findById(id);

    const friends = await Promise.all(
      userId.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({
        _id,
        firstName,
        lastName,
        cameraBody,
        cameraLens,
        location,
        picturePath,
      }) => {
        return {
          _id,
          firstName,
          lastName,
          cameraBody,
          cameraLens,
          location,
          picturePath,
        };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
