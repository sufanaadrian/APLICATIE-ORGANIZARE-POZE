import { useState } from "react";
import "../../index.css";
import {
  Message,
  AccountBoxOutlined,
  DarkMode,
  LightMode,
  Notifications,
  CollectionsOutlined,
  Menu,
  Close,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { red } from "@mui/material/colors";

const Navbar = () => {
  const isDesktop = useMediaQuery("(min-width: 1000px)"); //if width >1000 we are on desktop
  const loggedInUserId = useSelector((state) => state.user._id);
  const [isMobileDropDownPressed, setIsMobileDropDownPressed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const darkColor = theme.palette.neutral.dark;
  const backgroundColor = theme.palette.background.default;
  const primaryDarkColor = theme.palette.primary.dark;
  const alternativeColor = theme.palette.background.alt;
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alternativeColor}>
      <FlexBetween gap="1.75rem">
        <Typography
          color="primary"
          fontWeight="bold"
          textOverflow="ellipsis"
          fontSize="clamp(1rem, 2rem, 2.35rem)"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryDarkColor,
              cursor: "pointer",
            },
          }}
        >
          Photogram
        </Typography>
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isDesktop ? (
        <FlexBetween gap="2rem">
          <MenuItem value="Gallery" onClick={() => navigate("/gallery")}>
            <CollectionsOutlined
              sx={{ fontSize: "35px" }}
            ></CollectionsOutlined>
            <Typography>Gallery</Typography>
          </MenuItem>
          <MenuItem>
            <AccountBoxOutlined
              onClick={() => navigate(`/profile/${loggedInUserId}`)}
              sx={{ fontSize: "35px" }}
            ></AccountBoxOutlined>
          </MenuItem>

          <Message sx={{ fontSize: "20px" }} />
          <Notifications sx={{ fontSize: "20px" }} />

          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <LightMode sx={{ fontSize: "20px" }} />
            ) : (
              <DarkMode sx={{ color: darkColor, fontSize: "20px" }} />
            )}
          </IconButton>
          <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileDropDownPressed(!isMobileDropDownPressed)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isDesktop && isMobileDropDownPressed && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="300px"
          minWidth="100px"
          backgroundColor={backgroundColor}
        >
          {/* MENU ITEMS */}
          <FlexBetween
            flexDirection="column"
            justifyContent="center"
            gap="2rem"
          >
            <MenuItem value="Gallery" onClick={() => navigate("/gallery")}>
              <CollectionsOutlined
                sx={{ fontSize: "35px" }}
              ></CollectionsOutlined>
              <Typography p="2rem 0rem">Gallery</Typography>
            </MenuItem>
            <AccountBoxOutlined
              onClick={() => navigate(`/profile/${loggedInUserId}`)}
              sx={{ fontSize: "35px" }}
            ></AccountBoxOutlined>
            <Message sx={{ fontSize: "20px" }} />
            <Notifications sx={{ fontSize: "20px" }} />

            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "20px" }}
            >
              {theme.palette.mode === "dark" ? (
                <LightMode sx={{ fontSize: "20px" }} />
              ) : (
                <DarkMode sx={{ color: darkColor, fontSize: "20px" }} />
              )}
            </IconButton>

            <Typography
              onClick={() => dispatch(setLogout())}
              fontSize="15px"
              fontWeight="bold"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  transition: "all 0.3s",
                  transform: "scale(1.1) ",
                },
              }}
            >
              Log Out
            </Typography>
          </FlexBetween>
          {/* CLOSE ICON */}
          <Box position="fixed" bottom="0" p="0rem 1.5rem">
            <MenuItem
              value="Close"
              sx={{
                "&:hover": {
                  color: "red",
                  cursor: "pointer",
                  backgroundColor: backgroundColor,
                  transition: "all 0.3s",
                  transform: "scale(1.4) rotate(180deg)",
                },
              }}
              onClick={() =>
                setIsMobileDropDownPressed(!isMobileDropDownPressed)
              }
            >
              <Close sx={{ fontSize: "35px" }}></Close>
            </MenuItem>
          </Box>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
