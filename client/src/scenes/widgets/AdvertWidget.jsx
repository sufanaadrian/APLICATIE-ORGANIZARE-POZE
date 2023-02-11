import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { TouchAppOutlined } from "@mui/icons-material";
const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const navigate = useNavigate();

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Info field
        </Typography>
        <Typography color={medium}>V1.1 of the app published!</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/galleryPageView.png"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Sufana Adrian</Typography>
        <Typography color={medium}>domain.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0" textAlign="center">
        The first working version of the app is now available for download.
        Press the button below to go to the github page.
      </Typography>
      <Box display="flex" justifyContent="center">
        <Button
          onClick={() => {
            window.open(
              "https://github.com/sufanaadrian/APLICATIE-ORGANIZARE-POZE/releases/tag/V1.1"
            );
          }}
        >
          <TouchAppOutlined />
        </Button>
      </Box>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
