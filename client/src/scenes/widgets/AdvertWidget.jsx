import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { Button, Divider, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { TouchAppOutlined } from "@mui/icons-material";
const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <WidgetWrapper className="sticky" height="100vh" overflow="scroll">
      <FlexBetween p="0.5rem">
        <Typography color={dark} variant="h5" fontWeight="500">
          Latest news:
        </Typography>
        <Typography color={medium}>V1.2 of the app published!</Typography>
      </FlexBetween>
      <Divider />
      <Box>
        <Typography color={medium} m="0.5rem 0 0 0 ">
          11-03-2023
        </Typography>
        <img
          width="100%"
          height="auto"
          alt="advert"
          src="http://localhost:3001/assets/pagev1.2.png"
          style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        />
        <FlexBetween>
          <Typography color={main}>Sufana Adrian</Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography
            color={medium}
            m="0.5rem 0"
            maxWidth={isNonMobileScreens ? "75%" : undefined}
          >
            The latest working version of the app is now available for download.
            Press the button to go to the github page.
          </Typography>
          <Box display="flex">
            <Button
              onClick={() => {
                window.open(
                  "https://github.com/sufanaadrian/APLICATIE-ORGANIZARE-POZE/releases/tag/V1.2"
                );
              }}
            >
              <TouchAppOutlined />
            </Button>
          </Box>
        </FlexBetween>
      </Box>
      <Box p={2} />
      <Divider />

      <Box>
        <Typography color={medium} m="0.5rem 0 0 0 ">
          10-02-2023
        </Typography>
        <img
          width="100%"
          height="auto"
          alt="advert"
          src="http://localhost:3001/assets/galleryPageView.png"
          style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        />
        <FlexBetween>
          <Typography color={main}>Sufana Adrian</Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography
            color={medium}
            m="0.5rem 0"
            maxWidth={isNonMobileScreens ? "80%" : undefined}
          >
            The first working version of the app is now available for download.
            Press the button to go to the github page.
          </Typography>
          <Box display="flex">
            <Button
              onClick={() => {
                window.open(
                  "https://github.com/sufanaadrian/APLICATIE-ORGANIZARE-POZE/releases/tag/V1.2"
                );
              }}
            >
              <TouchAppOutlined />
            </Button>
          </Box>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
