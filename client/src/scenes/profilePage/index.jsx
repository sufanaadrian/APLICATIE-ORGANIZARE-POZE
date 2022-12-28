import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostsWidget from "scenes/widgets/PostsWidget";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import PhotoUploadWidget from "scenes/widgets/PhotoUploadWidget";
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1300px)");
  const { picturePath } = useSelector((state) => state.user);

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

  if (!user) return null;
  const spans = document.querySelectorAll(".word span");

  spans.forEach((span, idx) => {
    span.addEventListener("click", (e) => {
      e.target.classList.add("active");
    });

    span.addEventListener("animationend", (e) => {
      e.target.classList.remove("active");
    });

    // Initial animation
    setTimeout(() => {
      span.classList.add("active");
    }, 750 * (idx + 1));
  });

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding={isNonMobileScreens ? "1%" : "0%"}
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box
          flexBasis={isNonMobileScreens ? "25%" : undefined}
          padding="2rem 0%"
        >
          <Typography className="word">
            <span>G</span>
            <span>A</span>
            <span>L</span>
            <span>L</span>
            <span>E</span>
            <span>R</span>
            <span>Y</span>
          </Typography>
          <Box pb="2rem" />

          <div className="sticky">
            <PhotoUploadWidget picturePath={picturePath} />
            <Box m="2rem 0" />

            <UserWidget userId={userId} picturePath={user.picturePath} />
            <Box m="2rem 0" />
          </div>
          {/* <FriendListWidget userId={userId} /> */}
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? undefined : "30%"}
          mt={isNonMobileScreens ? undefined : undefined}
          ml={isNonMobileScreens ? undefined : "2rem"}
        >
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
