import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  Close,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UploadDetails from "components/PhotoUpload";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { Button } from "@mui/material";
const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  cameraBody,
  cameraLens,
  location,
  picturePath,
  userPicturePath,
  likes,
  isSharable,
  comments,
}) => {
  const theme = useTheme();
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  let isProfile = false;
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };
  const patchSharable = async () => {
    // send a request to set isSharable to true
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/share`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isSharable: true }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };
  const patchSharableFalse = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/removeShare`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isSharable: false }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    window.location.reload();
  };
  return (
    <WidgetWrapper m="2rem 0">
      <UploadDetails
        friendId={postUserId}
        name={name}
        subtitle={"Shot on: " + cameraBody + " Location: " + location}
        userPicturePath={userPicturePath}
      />

      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="0.5rem">
          <FlexBetween gap="0.2rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.2rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography m="0px 1rem 0 0">{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        {isSharable === false && (
          <Button
            onClick={patchSharable}
            sx={{
              color: palette.background.alt,

              backgroundColor: palette.primary.main,
              borderRadius: "3rem",

              "&:hover": {
                cursor: "pointer",
                backgroundColor: palette.primary.main,

                transition: "all 0.3s",
                transform: "scale(1.1) ",
              },
            }}
          >
            <Typography width="5rem" height="2rem" fontSize="0.8rem">
              {" "}
              SHARE ON FEED
            </Typography>
          </Button>
        )}
        {isSharable === true && (
          <Button
            onClick={patchSharableFalse}
            sx={{
              color: "red",

              "&:hover": {
                cursor: "pointer",
                backgroundColor: theme.palette.background.alt,
                transition: "all 0.3s",
                transform: "scale(1.4)",
              },
            }}
          >
            <Typography color="rgba(184, 71, 71, 0.8)">on feed - </Typography>

            <Close sx={{ fontSize: "35px" }}></Close>
          </Button>
        )}
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
