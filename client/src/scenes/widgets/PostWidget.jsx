import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  InfoOutlined,
  RemoveCircleOutlined,
  MoreVert,
  DeleteOutline,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  MenuItem,
  Menu,
  Typography,
  useTheme,
  Paper,
  MenuList,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  Popper,
  Popover,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UploadDetails from "components/PhotoUpload";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import PostsWidget from "./PostsWidget";
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
  exifData,
}) => {
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
  const [showExifData, setShowExifData] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const regex = /\/profile/;

  const exifDataObject = JSON.parse(exifData);

  useEffect(() => {
    const imgElement = document.querySelector(".post-image");
    setOriginalWidth(imgElement.offsetWidth);
    setOriginalHeight(imgElement.offsetHeight);
    const handleScroll = () => {
      if (isMenuVisible || showExifData) {
        setIsMenuVisible(false);
        setShowExifData(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuVisible]);
  const handleDetailsClick = () => {
    setShowExifData(!showExifData);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsMenuVisible(true);
    // setTimeout(() => {
    //   setIsMenuVisible(false);
    // }, 5000);
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
  const handleDeleteClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/deletePost`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        // Fetch the updated list of posts from the server
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        subtitle={"Shot on: " + exifDataObject.Model + " Location: " + location}
        userPicturePath={userPicturePath}
      />
      <div
        className={isFullScreen ? "full-screen" : ""}
        onClick={toggleFullScreen}
      >
        {!showExifData && picturePath && (
          <img
            className="post-image"
            width={isFullScreen ? originalWidth : "100%"}
            height={isFullScreen ? originalHeight : "auto"}
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}
        {showExifData && (
          <div style={{ position: "relative" }}>
            <img
              className="post-image"
              width={isFullScreen ? originalWidth : "100%"}
              height={isFullScreen ? originalHeight : "auto"}
              alt="post"
              style={{
                borderRadius: "0.75rem",
                marginTop: "0.75rem",
                opacity: "0.1",
                zIndex: 1,
              }}
              src={`http://localhost:3001/assets/${picturePath}`}
            />
            <List style={{ position: "absolute", top: 0, left: 0 }}>
              <ListItem>
                <ListItemText primary="f:" secondary={exifDataObject.FNumber} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Shutter speed:"
                  secondary={exifDataObject.ShutterSpeedValue}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="ISO"
                  secondary={exifDataObject.ISOSpeedRatings}
                />
              </ListItem>
            </List>
          </div>
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

        <IconButton onClick={handleMenuClick}>
          <MoreVert />
        </IconButton>

        <Popper
          anchorEl={anchorEl}
          open={isMenuVisible}
          onClose={handleMenuClose}
          placement="top-start" // Set the placement of the menu relative to the anchor element
          disablePortal={true} // Prevent the menu from being rendered in a separate portal element
          modifiers={{
            flip: {
              enabled: true, // Enable flipping of the menu to the opposite side if it overflows the viewport
            },
          }}
          style={{
            zIndex: "1",
            opacity: "1",
            backgroundColor: "rgba(0,0,0,0.5",
          }}
        >
          <Paper>
            <List>
              {!isSharable && postUserId === loggedInUserId && (
                <ListItem onClick={patchSharable}>
                  <ListItemIcon>
                    <ShareOutlined fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Share on feed</ListItemText>
                </ListItem>
              )}
              {isSharable && postUserId === loggedInUserId && (
                <ListItem onClick={patchSharableFalse}>
                  <ListItemIcon>
                    <RemoveCircleOutlined fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove from feed</ListItemText>
                </ListItem>
              )}

              <ListItem onClick={handleDetailsClick}>
                <ListItemIcon>
                  <InfoOutlined fontSize="small" />
                </ListItemIcon>
                <ListItemText>Details</ListItemText>
              </ListItem>
              {postUserId === loggedInUserId && (
                <ListItem onClick={handleDeleteClick} style={{ color: "red" }}>
                  <ListItemIcon>
                    <DeleteOutline fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Delete photo</ListItemText>
                </ListItem>
              )}

              <Divider />
            </List>
          </Paper>
        </Popper>
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
