import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { Container, Row, Col } from "react-grid-system";
import { Pagination } from "@mui/material";
const PostsWidget = ({ userId, sortCriteria, filterCriteria, xl }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const regex = /\/profile/;
  const [page, setPage] = useState(1);
  let postsPerPage;
  let isLargeGrid;
  let isProfile;
  if (xl === 2) {
    postsPerPage = 12;
    isLargeGrid = false;
  } else {
    postsPerPage = 30;
    isLargeGrid = true;
  }
  if (regex.test(window.location.pathname)) isProfile = true;
  else isProfile = false;

  const getPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts?isSharable=true`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();

    dispatch(setPosts({ posts: data }));
  };
  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();

    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (regex.test(window.location.pathname)) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const sortedPostsFeed = Array.isArray(posts)
    ? [...posts].sort((a, b) => {
        return a.createdAt > b.createdAt ? -1 : 1;
      })
    : [];

  const filteredAndSortedPosts = Array.isArray(posts)
    ? [...posts]
        .map((post) => ({
          ...post,
          exifDataObject: JSON.parse(post.exifData),
        }))
        .sort((a, b) => {
          switch (sortCriteria) {
            case "dateUp":
              return a.createdAt > b.createdAt ? -1 : 1;
            case "dateDown":
              return a.createdAt < b.createdAt ? -1 : 1;
            case "likes":
              const aLikesCount = Object.keys(a.likes).length;
              const bLikesCount = Object.keys(b.likes).length;
              return bLikesCount - aLikesCount;
            default:
              return a.createdAt > b.createdAt ? -1 : 1;
          }
        })
        .filter((post) => {
          if (!filterCriteria) return post;
          if (filterCriteria === "showAll") return post;
          if (filterCriteria === "isOnFeed") return post.isSharable;
          if (filterCriteria.startsWith("f/")) {
            const [, value] = filterCriteria.split("/");
            return post.exifDataObject.FNumber === Number(value.trim());
          }
          if (filterCriteria.startsWith("ISO:")) {
            const [, value] = filterCriteria.split(":");
            return post.exifDataObject.ISOSpeedRatings === Number(value.trim());
          }
          if (filterCriteria.startsWith("1/")) {
            const [, value] = filterCriteria.split("/");
            return post.exifDataObject.ExposureTime === Number(value.trim());
          }
          if (filterCriteria.startsWith("mm")) {
            const [, value] = filterCriteria.split(":");
            return post.exifDataObject.FocalLength === Number(value.trim());
          } else {
            return post;
          }
        })
    : [];
  const paginatedPosts = filteredAndSortedPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  return regex.test(window.location.pathname) ? (
    <Container>
      <Row gutterWidth={isLargeGrid ? 0 : undefined} style={{ width: "100%" }}>
        {paginatedPosts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            cameraBody,
            cameraLens,
            location,
            picturePath,
            userPicturePath,
            likes,
            isSharable,
            comments,
            exifData,
            filterCriteria,
          }) => (
            <Col key={_id} xs={12} sm={6} md={3} lg={3} xl={xl}>
              <PostWidget
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                description={description}
                cameraBody={cameraBody}
                cameraLens={cameraLens}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                isSharable={isSharable}
                comments={comments}
                exifData={exifData}
                isLargeGrid={isLargeGrid}
                isProfile={isProfile}
              />
            </Col>
          )
        )}
      </Row>
      <Row justify="center" style={{ margin: "1rem" }}>
        <Pagination
          count={Math.ceil(posts.length / postsPerPage)}
          page={page}
          onChange={(event, newPage) => setPage(newPage)}
          style={{ position: "fixed", bottom: 0, marginBottom: "1rem" }}
        />
      </Row>
    </Container>
  ) : (
    <Container>
      <Row style={{ width: "100%" }}>
        {sortedPostsFeed.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            cameraBody,
            cameraLens,
            location,
            picturePath,
            userPicturePath,
            likes,
            isSharable,
            comments,
            exifData,
          }) => (
            <Col key={_id} xs={3} sm={3} md={5}>
              <PostWidget
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                description={description}
                cameraBody={cameraBody}
                cameraLens={cameraLens}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                isSharable={isSharable}
                comments={comments}
                exifData={exifData}
              />
            </Col>
          )
        )}
      </Row>
    </Container>
  );
};
export default PostsWidget;
