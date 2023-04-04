import { DeleteOutlined, LoopOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import { getUserPosts } from "components/api";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EXIF from "exif-js";
import ColorThief from "colorthief";
const MyPostWidget = ({ picturePath, userId }) => {
  const dispatch = useDispatch();
  const [hasImage, setHasImage] = useState(false);
  const [images, setImages] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formDatas = [];
    setIsLoading(!isLoading);

    const colorThief = new ColorThief();
    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", descriptions[i]);
      formData.append("picture", images[i]);
      formData.append("picturePath", images[i].name);

      if (images[i]) {
        const exifData = await new Promise((resolve, reject) => {
          EXIF.getData(images[i], function () {
            resolve(EXIF.getAllTags(this));
          });
        });
        formData.append("exifData", JSON.stringify(exifData));
        const colorArray = await new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "Anonymous";
          img.src = URL.createObjectURL(images[i]);
          img.onload = () => {
            const colorArray = colorThief.getPalette(img, 3);
            resolve(colorArray);
          };
        });
        const dominantColors = [
          { r: colorArray[0][0], g: colorArray[0][1], b: colorArray[0][2] },
          { r: colorArray[1][0], g: colorArray[1][1], b: colorArray[1][2] },
          { r: colorArray[2][0], g: colorArray[2][1], b: colorArray[2][2] },
        ];

        for (let i = 0; i < dominantColors.length; i++) {
          const color = dominantColors[i];
          formData.append(`dominantColors[${i}][r]`, color.r);
          formData.append(`dominantColors[${i}][g]`, color.g);
          formData.append(`dominantColors[${i}][b]`, color.b);
        }
      }

      formDatas.push(formData);
    }
    for (let i = 0; i < formDatas.length; i++) {
      await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDatas[i],
      });
    }
    setHasImage(!hasImage);
    setIsLoading(false);
    setImages([]);
    setDescriptions([]);
    setPost("");
    getUserPosts(dispatch, token, userId);
  };
  const removeImage = (index) => {
    const newImages = [...images];
    const newDescriptions = [...descriptions];
    newImages.splice(index, 1);
    newDescriptions.splice(index, 1);
    setImages(newImages);
    setDescriptions(newDescriptions);
  };
  useEffect(() => {
    getUserPosts(dispatch, token, userId);
  });

  return (
    <WidgetWrapper>
      <Box border={`1px solid ${medium}`} borderRadius="5px" mt="1rem" p="1rem">
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={true} // allow multiple file selection
          onDrop={(acceptedFiles) => {
            setImages(acceptedFiles);
            setHasImage(!hasImage);
          }} // store all selected files
        >
          {({ getRootProps, getInputProps }) => (
            <Box {...getRootProps()}>
              {hasImage ? (
                images.map((image, index) => (
                  <Box key={index}>
                    <FlexBetween key={index}>
                      <Typography>{image.name}</Typography>

                      <IconButton
                        onClick={() => {
                          removeImage(index);
                          if (images.length === 1) {
                            setHasImage(false);
                          }
                        }}
                        sx={{ width: "15%" }}
                      >
                        <DeleteOutlined />
                      </IconButton>
                    </FlexBetween>
                    <InputBase
                      placeholder="Add description"
                      onChange={(e) => {
                        const newDescriptions = [...descriptions];
                        newDescriptions[index] = e.target.value;
                        setDescriptions(newDescriptions);
                      }}
                      value={descriptions[index]}
                      sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "0.1rem 0.3rem",
                      }}
                    />
                  </Box>
                ))
              ) : (
                <Typography
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      transition: "all 0.3s",
                      transform: "scale(1.1) ",
                    },
                  }}
                >
                  Add or drop image(s) here
                </Typography>
              )}
              {!hasImage && <input {...getInputProps()} />}
            </Box>
          )}
        </Dropzone>
      </Box>

      <Divider sx={{ margin: "0.5rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setHasImage(false)}>
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Cancel
          </Typography>
        </FlexBetween>

        <Button
          disabled={images.length === 0 || isLoading}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: isLoading ? "grey" : palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          {isLoading ? "LOADING..." : "ADD PHOTO"}
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
