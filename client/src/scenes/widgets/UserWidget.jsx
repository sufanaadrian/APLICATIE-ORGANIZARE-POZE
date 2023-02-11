import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
} from "@mui/icons-material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import CameraIcon from "@mui/icons-material/Camera";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);

  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    cameraBody,
    cameraLens,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}

      {!isProfileDropdown && (
        <div>
          <FlexBetween
            gap="0.5rem"
            pb="1.1rem"
            onClick={() => navigate(`/profile/${userId}`)}
          >
            <FlexBetween gap="1rem">
              <UserImage image={picturePath} />
              <Box>
                <Typography
                  variant="h4"
                  color={dark}
                  fontWeight="500"
                  fontSize="clamp(0.5rem, 1rem, 1.5rem)"
                  sx={{
                    "&:hover": {
                      color: palette.primary.dark,
                      cursor: "pointer",
                    },
                  }}
                >
                  {firstName} {lastName}
                </Typography>
                <Typography color={medium}>{friends.length} friends</Typography>
              </Box>
            </FlexBetween>
            <ManageAccountsOutlined />
          </FlexBetween>

          <Divider />

          {/* SECOND ROW */}
          <Box p="1rem 0">
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              <LocationOnOutlined fontSize="small" sx={{ color: main }} />
              <Typography color={medium}>{location}</Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              gap="1rem"
              paddingTop="0.5rem"
            >
              <CameraAltOutlinedIcon fontSize="small" sx={{ color: main }} />
              <Typography color={medium}>{cameraBody}</Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              gap="1rem"
              paddingTop="0.4rem"
            >
              <CameraIcon fontSize="small" sx={{ color: main }} />
              <Typography color={medium}>{cameraLens}</Typography>
            </Box>
          </Box>

          <Divider />

          {/* THIRD ROW */}
          <Box p="0.5rem 0">
            <FlexBetween>
              <Typography fontSize="0.6rem" color={medium}>
                Impressions of your post
              </Typography>
              <Typography fontSize="0.6rem" color={main} fontWeight="500">
                {impressions}
              </Typography>
            </FlexBetween>
          </Box>

          <Divider />

          {/* FOURTH ROW */}
          <Box p="0.5rem 0">
            <Typography
              fontSize="0.8rem"
              color={main}
              fontWeight="500"
              mb="0.3rem"
            >
              Social Profiles
            </Typography>

            <FlexBetween gap="0.5rem">
              <FlexBetween gap="1rem">
                <img src="../assets/linkedin.png" alt="linkedin" />
                <Box>
                  <Typography color={main} fontWeight="500">
                    Linkedin
                  </Typography>
                  <Typography color={medium}>Network Platform</Typography>
                </Box>
              </FlexBetween>
              <EditOutlined sx={{ color: main }} />
            </FlexBetween>
            <FlexBetween gap="0.5rem">
              <FlexBetween gap="1rem">
                <img src="../assets/linkedin.png" alt="linkedin" />
                <Box>
                  <Typography color={main} fontWeight="500">
                    Linkedin
                  </Typography>
                  <Typography color={medium}>Network Platform</Typography>
                </Box>
              </FlexBetween>
              <EditOutlined sx={{ color: main }} />
            </FlexBetween>
          </Box>
        </div>
      )}
      <Box
        display="flex"
        justifyContent="center"
        onClick={() => setIsProfileDropdown(!isProfileDropdown)}
        sx={{
          "&:hover": {
            color: palette.primary.dark,
            cursor: "pointer",
          },
        }}
      >
        {isProfileDropdown ? (
          <ArrowDropDownOutlined />
        ) : (
          <ArrowDropUpOutlined />
        )}
        <Typography>
          {isProfileDropdown ? "Display profile" : "Hide profile"}
        </Typography>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
