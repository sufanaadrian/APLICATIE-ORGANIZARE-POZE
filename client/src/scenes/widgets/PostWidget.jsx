import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  InfoOutlined,
  RemoveCircleOutlined,
  MoreVert,
  DeleteOutline,
  FileDownloadOutlined,
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
  useMediaQuery,
} from "@mui/material";

import FlexBetween from "components/FlexBetween";
import UploadDetails from "components/PhotoUpload";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { useNavigate } from "react-router-dom";
import { getUserPosts } from "components/api";
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
  isProfile,
  dominantColors,
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
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [showExifData, setShowExifData] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorComments, setAnchorComments] = useState(null);
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
      setTimeout(() => {
        setIsComments(false);
        setIsMenuVisible(false);
      }, 5000);
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
  };
  const handleCommentsMenuClick = (event) => {
    setAnchorComments(event.currentTarget);
    setIsComments(!isComments);
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
        // Call the getUserPosts function to refetch the updated list of posts
        getUserPosts(dispatch, token, loggedInUserId);
      }
    } catch (error) {
      console.error(error);
    }
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
  const handleSaveClick = () => {
    const url = `http://localhost:3001/assets/${picturePath}`;

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", picturePath);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => console.error(error));
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
            style={{
              borderRadius: !isLargeGrid ? "0.75rem" : "0",
              opacity: showExifData ? "0.1" : "1",
              zIndex: 1,
            }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
          {isFullScreen && isLargeGrid && (
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
                {description === "undefined" ? "" : description}
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
                  color: "white",
                }}
              >
                <ListItem>
                  <ListItemText
                    primary="DominantColors Palette"
                    secondary={
                      <div
                        style={{
                          backgroundColor: !isNonMobileScreens
                            ? "rgba(0,0,0,0.5)"
                            : undefined,
                          padding: "0.3rem",
                          borderRadius: "0.5rem",
                          display: "block",
                        }}
                      >
                        {dominantColors.map((color, index) => (
                          <div
                            key={index}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div
                              style={{
                                width: "50px",
                                height: "50px",
                                backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                              }}
                            />
                            <span
                              style={{
                                marginLeft: "10px",
                                fontWeight: "bold",
                                color: "white",
                              }}
                            >
                              {`RGB[${index + 1}]: ${color.r} ${color.g} ${
                                color.b
                              }`}
                            </span>
                          </div>
                        ))}
                      </div>
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="f/"
                    secondary={exifDataObject.FNumber}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Exposure Time"
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
                    primary="FocalLength"
                    secondary={exifDataObject.FocalLength + "mm"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Make"
                    secondary={exifDataObject.Make}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Model"
                    secondary={exifDataObject.Model}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="DateTime"
                    secondary={exifDataObject.DateTimeOriginal}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="ExposureMode"
                    secondary={exifDataObject.ExposureMode}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Flash"
                    secondary={
                      exifDataObject.Flash ===
                      "Flash did not fire, compulsory flash mode"
                        ? "Off"
                        : "On"
                    }
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
                      onClick={handleCommentsMenuClick}
                      style={{ color: "white" }}
                    >
                      <ChatBubbleOutlineOutlined />
                    </IconButton>
                    <Typography m="0px 1rem 0 0">{comments.length}</Typography>
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
              <ListItemText
                primary="Colors Palette"
                secondary={
                  <div
                    style={{
                      backgroundColor: !isNonMobileScreens
                        ? "rgba(0,0,0,0.5)"
                        : undefined,
                      padding: "0.3rem",
                      borderRadius: "0.5rem",
                      display: "block",
                    }}
                  >
                    {dominantColors.map((color, index) => (
                      <div
                        key={index}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <div
                          style={{
                            width: isLargeGrid
                              ? !isNonMobileScreens
                                ? "50px"
                                : "30px"
                              : !isNonMobileScreens
                              ? "50px"
                              : "30px",
                            height: isLargeGrid
                              ? !isNonMobileScreens
                                ? "50px"
                                : "30px"
                              : !isNonMobileScreens
                              ? "50px"
                              : "30px",
                            backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                          }}
                        />
                        <span
                          style={{
                            marginLeft: "10px",
                            fontWeight: isLargeGrid
                              ? !isNonMobileScreens
                                ? "bold"
                                : "undefined"
                              : !isNonMobileScreens
                              ? "bold"
                              : "undefine",
                            fontSize: isLargeGrid
                              ? !isNonMobileScreens
                                ? "0.8rem"
                                : "0.5rem"
                              : !isNonMobileScreens
                              ? "0.8rem"
                              : "0.5rem",
                            color: "white",
                          }}
                        >
                          {`[${index + 1}]: ${color.r} ${color.g} ${color.b}`}
                        </span>
                      </div>
                    ))}
                  </div>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="f/" secondary={exifDataObject.FNumber} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Exposure Time"
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
                primary="FocalLength"
                secondary={exifDataObject.FocalLength + "mm"}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Make" secondary={exifDataObject.Make} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Model" secondary={exifDataObject.Model} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="DateTime"
                secondary={exifDataObject.DateTimeOriginal}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="ExposureMode"
                secondary={exifDataObject.ExposureMode}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Flash"
                secondary={
                  exifDataObject.Flash ===
                  "Flash did not fire, compulsory flash mode"
                    ? "Off"
                    : "On"
                }
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
              {description === "undefined" ? "" : description}
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
                    onClick={handleCommentsMenuClick}
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
                <ListItem onClick={handleSaveClick}>
                  <ListItemIcon>
                    <FileDownloadOutlined fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Save</ListItemText>
                </ListItem>
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
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          marginBottom: "0.2rem",
        }}
      >
        <Popper
          anchorEl={anchorComments}
          open={isComments}
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
            {comments
              .slice()
              .reverse()
              .map((comment, i) => (
                <Box
                  padding="0.2rem 0.5rem"
                  display="flex"
                  maxWidth="250px"
                  key={`${name}-${i}`}
                >
                  <Typography
                    color={palette.primary.dark}
                    fontSize="0.7rem"
                    fontWeight="bold"
                  >
                    {"UserId:"}
                  </Typography>
                  <Typography fontSize="0.7rem" sx={{}} ml="0.3rem">
                    {comment}
                  </Typography>
                </Box>
              ))}
          </Paper>
        </Popper>
      </div>
    </WidgetWrapper>
  );
};

export default PostWidget;
