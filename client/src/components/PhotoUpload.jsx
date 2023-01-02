import { Box, Typography, useTheme } from "@mui/material";

import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
const UploadDetails = ({ userId, name, subtitle, userPicturePath }) => {
  const { palette } = useTheme();

  const medium = palette.neutral.medium;
  const regex = /\/profile/;
  if (!regex.test(window.location.pathname)) {
    return (
      <FlexBetween p="0 0 0.5rem 0">
        <FlexBetween gap="1rem">
          <UserImage image={userPicturePath} size="45px" />
          <Box>
            <Typography
              color={palette.primary.main}
              variant="h6"
              fontSize="13px"
              fontWeight="500"
            >
              {name}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
              {subtitle}
            </Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>
    );
  }
};

export default UploadDetails;
