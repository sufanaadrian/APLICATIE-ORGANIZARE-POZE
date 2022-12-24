import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { Container, Row, Col } from "react-grid-system";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
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
    if (!isProfile) {
      getPosts();
    } else {
      getUserPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const sortedPosts = [...posts].sort((a, b) => {
    // Compare the values of the property you want to sort by
    // and return a negative number if a is greater than b,
    // a positive number if a is less than b,
    // and 0 if a and b are equal.
    return a.createdAt > b.createdAt ? -1 : 1;
  });
  return (
    <Container lg={3}>
      <Row style={{ width: "100%" }}>
        {sortedPosts.map(
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
          }) => (
            <Col key={_id} xs={12} sm={6} md={4}>
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
              />
            </Col>
          )
        )}
      </Row>
    </Container>
  );
};

export default PostsWidget;
