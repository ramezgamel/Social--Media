import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import axios from "axios";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const getPosts = async () => {
    const response = await axios.get("http://localhost:4444/posts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setPosts(response.data.res));
  };
  const getUserPosts = async () => {
    const response = await axios.get(`http://localhost:4444/posts/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setPosts(response.data.res));
  };
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);
  return (
    <>
      {posts.map((post) => (
        <PostWidget
          key={post._id}
          postId={post._id}
          postUserId={userId}
          name={`${post.firstName} ${post.lastName}`}
          content={post.content}
          comments={post.comments}
          likes={post.likes}
          images={post.images}
          userPic={post.userPic}
          location={post.location}
        />
      ))}
    </>
  );
};
export default PostsWidget;
