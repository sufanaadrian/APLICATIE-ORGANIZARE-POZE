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
  Typography,
  useTheme,
  Paper,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  Popper,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UploadDetails from "components/PhotoUpload";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { useNavigate } from "react-router-dom";
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
  isLargeGrid,
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
  const [showIconButton, setShowIconButton] = useState(false);
  const regex = /\/profile/;
  const exifDataObject = JSON.parse(exifData);
  const navigate = useNavigate();

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
  }, [isMenuVisible, showExifData]);
  const handleDetailsClick = () => {
    setShowExifData(!showExifData);
    setIsMenuVisible(!isMenuVisible);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsMenuVisible(!isMenuVisible);
    setTimeout(() => {
      setIsMenuVisible(false);
    }, 10000);
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
    <WidgetWrapper
      m={!isLargeGrid ? "0.5rem 0 0.5rem 0" : "0.1rem 0 0.1rem 0"}
      tag="gallery"
      onMouseEnter={() => setShowIconButton(true)}
      onMouseLeave={() => {
        setShowIconButton(false);
        setIsMenuVisible(false);
      }}
    >
      <UploadDetails
        style={{ position: "absolute", top: 0, left: 0 }}
        friendId={postUserId}
        name={name}
        subtitle={"Shot on: " + exifDataObject.Model + " Location: " + location}
        userPicturePath={userPicturePath}
        onClick={() => navigate(`/profile/${loggedInUserId}`)}
      />

      <div style={{ position: "relative" }}>
        <div
          className={isFullScreen ? "full-screen" : ""}
          onClick={toggleFullScreen}
        >
          <img
            className="post-image"
            width={isFullScreen ? originalWidth : "100%"}
            height={isFullScreen ? originalHeight : "auto"}
            alt="post"
            loading="lazy"
            border
            style={{
              borderRadius: !isLargeGrid ? "0.75rem" : "0",
              opacity: showExifData ? "0.1" : "1",
              zIndex: 1,
            }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
          {isFullScreen &&
            isLargeGrid &&
            regex.test(window.location.pathname) && (
              <div>
                <Typography
                  style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    marginBottom: "2.5rem",
                    color: "white",
                    fontSize: "small",
                    fontWeight: "500",
                  }}
                  color={main}
                  sx={{ ml: "0.5rem" }}
                >
                  {description}
                </Typography>
                <List
                  className="scrollbar"
                  style={{
                    maxHeight: "90vh",
                    overflow: "auto",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    width: "100%",
                  }}
                >
                  <ListItem>
                    <ListItemText
                      primary="f/"
                      secondary={exifDataObject.FNumber}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Exposure Time:"
                      secondary={"1/" + 1 / exifDataObject.ExposureTime}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="ISO"
                      secondary={exifDataObject.ISOSpeedRatings}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Focal length:"
                      secondary={exifDataObject.FocalLength + "mm"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Focal length:"
                      secondary={exifDataObject.FocalLength + "mm"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Focal length:"
                      secondary={exifDataObject.FocalLength + "mm"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Focal length:"
                      secondary={exifDataObject.FocalLength + "mm"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Focal length:"
                      secondary={exifDataObject.FocalLength + "mm"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Focal length:"
                      secondary={exifDataObject.FocalLength + "mm"}
                    />
                  </ListItem>
                </List>
                <FlexBetween
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    marginBottom: "0.2rem",
                    color: "white",
                  }}
                >
                  <FlexBetween gap="0.1rem">
                    <FlexBetween>
                      <IconButton
                        onClick={patchLike}
                        style={{ color: "white" }}
                      >
                        {isLiked ? (
                          <FavoriteOutlined sx={{ color: primary }} />
                        ) : (
                          <FavoriteBorderOutlined />
                        )}
                      </IconButton>
                      <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.2rem">
                      <IconButton
                        onClick={() => setIsComments(!isComments)}
                        style={{ color: "white" }}
                      >
                        <ChatBubbleOutlineOutlined />
                      </IconButton>
                      <Typography m="0px 1rem 0 0">
                        {comments.length}
                      </Typography>
                    </FlexBetween>
                  </FlexBetween>
                </FlexBetween>
              </div>
            )}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: !isLargeGrid ? "0.75rem" : "0",
            height: "45%",
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))",
          }}
        />
        {isSharable === true && (
          <Typography
            style={{ position: "absolute", top: 0, right: 3, color: "white" }}
            sx={{
              opacity: "0.4",
              textAlign: "right",
            }}
          >
            On feed
          </Typography>
        )}
        {showExifData && !isLargeGrid && (
          <List
            className="scrollbar"
            style={{
              maxHeight: originalHeight,
              overflow: "auto",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
            }}
          >
            <ListItem>
              <ListItemText primary="f/" secondary={exifDataObject.FNumber} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Exposure Time:"
                secondary={"1/" + 1 / exifDataObject.ExposureTime}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="ISO"
                secondary={exifDataObject.ISOSpeedRatings}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Focal length:"
                secondary={exifDataObject.FocalLength + "mm"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Focal length:"
                secondary={exifDataObject.FocalLength + "mm"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Focal length:"
                secondary={exifDataObject.FocalLength + "mm"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Focal length:"
                secondary={exifDataObject.FocalLength + "mm"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Focal length:"
                secondary={exifDataObject.FocalLength + "mm"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Focal length:"
                secondary={exifDataObject.FocalLength + "mm"}
              />
            </ListItem>
          </List>
        )}
        {!isLargeGrid && (
          <Box>
            <Typography
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                marginBottom: "2.5rem",
                color: "white",
                fontSize: "small",
                fontWeight: "500",
              }}
              color={main}
              sx={{ ml: "0.5rem" }}
            >
              {description}
            </Typography>
            <FlexBetween
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                marginBottom: "0.2rem",
                color: "white",
              }}
            >
              <FlexBetween gap="0.1rem">
                <FlexBetween>
                  <IconButton onClick={patchLike} style={{ color: "white" }}>
                    {isLiked ? (
                      <FavoriteOutlined sx={{ color: primary }} />
                    ) : (
                      <FavoriteBorderOutlined />
                    )}
                  </IconButton>
                  <Typography>{likeCount}</Typography>
                </FlexBetween>

                <FlexBetween gap="0.2rem">
                  <IconButton
                    onClick={() => setIsComments(!isComments)}
                    style={{ color: "white" }}
                  >
                    <ChatBubbleOutlineOutlined />
                  </IconButton>
                  <Typography m="0px 1rem 0 0">{comments.length}</Typography>
                </FlexBetween>
              </FlexBetween>
            </FlexBetween>
          </Box>
        )}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            marginBottom: "0.2rem",
          }}
        >
          {showIconButton && isLargeGrid && (
            <IconButton onClick={handleMenuClick} style={{ color: "white" }}>
              <MoreVert />
            </IconButton>
          )}
          {!isLargeGrid && (
            <IconButton onClick={handleMenuClick} style={{ color: "white" }}>
              <MoreVert />
            </IconButton>
          )}

          <Popper
            anchorEl={anchorEl}
            open={isMenuVisible}
            placement="top-start" // Set the placement of the menu relative to the anchor element
            disablePortal={true} // Prevent the menu from being rendered in a separate portal element
            style={{
              zIndex: "1",
              opacity: "1",
              backgroundColor: "rgba(0,0,0,0.5",
              cursor: "pointer",
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
                {!isLargeGrid && (
                  <ListItem onClick={handleDetailsClick}>
                    <ListItemIcon>
                      <InfoOutlined fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Details</ListItemText>
                  </ListItem>
                )}

                {postUserId === loggedInUserId && (
                  <ListItem
                    onClick={handleDeleteClick}
                    style={{ color: "red" }}
                  >
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
        </div>
        {isComments && (
          <Box mt="0.5rem" style={{ position: "absolute" }}>
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
      </div>
    </WidgetWrapper>
  );
};

export default PostWidget;
