import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostsWidget from "scenes/widgets/PostsWidget";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import SortMenu from "scenes/widgets/SortMenu";
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
  const [sortCriteria, setSortCriteria] = useState("all");
  const [filterCriteria, setFilterCriteria] = useState("all");

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
        padding={isNonMobileScreens ? "1%" : "2%"}
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
        mt={isNonMobileScreens ? "0.5rem" : "1rem"}
      >
        <Box>
          <Typography className="word">
            <span>G</span>
            <span>A</span>
            <span>L</span>
            <span>L</span>
            <span>E</span>
            <span>R</span>
            <span>Y</span>
          </Typography>
          <Box pb="1rem" />

          <div className="sticky">
            <PhotoUploadWidget picturePath={picturePath} />
            <Box m="1rem 0" />

            <UserWidget userId={userId} picturePath={user.picturePath} />
            <Box m="2rem 0" />
          </div>
          {/* <FriendListWidget userId={userId} /> */}
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? "80%" : "3%"}
          mt={isNonMobileScreens ? undefined : undefined}
          ml={isNonMobileScreens ? undefined : "2rem"}
        >
          <SortMenu
            onSortCriteriaChange={setSortCriteria}
            onFilterCriteriaChange={setFilterCriteria}
          />
          <PostsWidget
            userId={userId}
            isProfile
            sortCriteria={sortCriteria}
            filterCriteria={filterCriteria}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
