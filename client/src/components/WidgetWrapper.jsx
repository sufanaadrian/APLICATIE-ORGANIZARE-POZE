import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme, tag }) => ({
  padding: tag === "gallery" ? 0 : "0.5rem 1rem 0.5rem 1rem",
  backgroundColor: tag === "gallery" ? 0 : theme.palette.background.alt,
  borderRadius: tag === "gallery" ? 0 : "0.75rem",
}));

export default WidgetWrapper;
