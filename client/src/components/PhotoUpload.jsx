import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const UploadDetails = ({ userId, name, subtitle, userPicturePath }) => {
  const { palette } = useTheme();

  const medium = palette.neutral.medium;
  const regex = /\/profile/;
  if (!regex.test(window.location.pathname)) {
    return (
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserImage image={userPicturePath} size="55px" />
          <Box>
            <Typography
              color={palette.primary.main}
              variant="h5"
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
