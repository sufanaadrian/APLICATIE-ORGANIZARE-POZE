import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  RemoveCircleOutlineOutlined,
  SendOutlined,
  ShareOutlined,
  MoreVert,
} from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Box,
  Divider,
  IconButton,
  MenuItem,
  Menu,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UploadDetails from "components/PhotoUpload";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
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
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const regex = /\/profile/;

  useEffect(() => {
    const imgElement = document.querySelector(".post-image");
    setOriginalWidth(imgElement.offsetWidth);
    setOriginalHeight(imgElement.offsetHeight);
  }, []);
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsMenuVisible(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsMenuVisible(false);
  };

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
    if (!regex.test(window.location.pathname)) {
      window.location.reload();
    }
  };
  function shareOnFeedBtn(isSharable) {
    return (
      isSharable === false && (
        <div>
          <IconButton onClick={handleMenuClick}>
            <ShareOutlined sx={{ color: palette.primary.main }} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            open={isMenuVisible}
            onClose={handleMenuClose}
            sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <MenuItem
              onClick={patchSharable}
              sx={{
                opacity: "1",
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.main,
                },
              }}
            >
              <Typography>Share on feed</Typography>
            </MenuItem>
          </Menu>
        </div>
      )
    );
  }

  function unshareFromFeedBtn(isSharable) {
    if (loggedInUserId === postUserId) {
      return (
        isSharable === true && (
          <div>
            <IconButton onClick={handleMenuClick}>
              <RemoveCircleOutlineOutlined
                sx={{ color: "red" }}
              ></RemoveCircleOutlineOutlined>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              open={isMenuVisible}
              onClose={handleMenuClose}
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                opacity: "1",
              }}
            >
              <MenuItem
                onClick={patchSharableFalse}
                sx={{
                  opacity: "1",
                  "&:hover": {
                    cursor: "pointer",
                    color: "red",
                  },
                }}
              >
                <Typography>Remove from feed</Typography>
              </MenuItem>
            </Menu>
          </div>
        )
      );
    }
  }
  return (
    <WidgetWrapper m="2rem 0 0 0 ">
      {isSharable === true && (
        <Typography
          sx={{
            opacity: "0.2",
            textAlign: "right",
          }}
        >
          On feed
        </Typography>
      )}
      <UploadDetails
        friendId={postUserId}
        name={name}
        subtitle={"Shot on: " + cameraBody + " Location: " + location}
        userPicturePath={userPicturePath}
      />

      <div
        className={isFullScreen ? "full-screen" : ""}
        onClick={toggleFullScreen}
      >
        {picturePath && (
          <img
            className="post-image"
            width={isFullScreen ? originalWidth : "100%"}
            height={isFullScreen ? originalHeight : "auto"}
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}
      </div>
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
        {unshareFromFeedBtn(isSharable)}

        {shareOnFeedBtn(isSharable)}
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
