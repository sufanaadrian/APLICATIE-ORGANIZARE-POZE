import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import Form from "./Form";
import videoBG from "../../assets/video2.mp4";
import { useState, useEffect } from "react";

const LoginPage = () => {
  const theme = useTheme();
  const [showContent, setShowContent] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:1000px)");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 6010);

    return () => clearTimeout(timer);
  }, []);
  const scrollToForm = () => {
    window.scrollTo({
      top: document.getElementById("login-form").offsetTop,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <div className="video">
        <video src={videoBG} autoPlay loop muted></video>
        <div className="overlayVideo"></div>
        {showContent && (
          <div className="contentVideo">
            <Typography
              fontWeight="bold"
              fontSize={isNonMobile ? "120px" : "70px"}
            >
              Photogram
            </Typography>
          </div>
        )}
        <Box
          sx={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          <Button
            size="large"
            sx={{
              animation: "pulse 1s infinite",
              "@keyframes pulse": {
                "0%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.1)" },
                "100%": { transform: "scale(1)" },
              },
              fontSize: "1rem",
            }}
            onClick={scrollToForm}
          >
            Log In
          </Button>
        </Box>
      </div>
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        <Box
          id="login-form"
          width={isNonMobile ? "30%" : "100%"}
          p="2rem"
          m="2rem 0"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome to Photogram, the place where all photographers meet!
          </Typography>
          <Form />
        </Box>
      </Box>
    </div>
  );
};

export default LoginPage;
