import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Input,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import FlexBetween from "components/Flexbetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  content,
  comments,
  likes,
  location,
  images,
  userPic,
}) => {
  const [commentsList, setCommentsList] = useState(comments);
  const [isComments, setIsComments] = useState(Boolean(commentsList));
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.light;

  const addComment = async (e) => {
    e.preventDefault();
    const content = e.currentTarget.content.value;
    try {
      const response = await axios.post(
        `http://localhost:4444/posts/${postId}/comment`,
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCommentsList(response.data.res);
      setIsComments(true);
    } catch (err) {
      console.log(err);
    }
  };

  const patchLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4444/posts/${postId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setPost({ post: response.data.res }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPic={userPic}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {content}
      </Typography>
      {images &&
        images.map((img, i) => (
          <img
            key={`${img}-${i}`}
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: ".75rem", marginTop: ".75rem" }}
            src={`https://localhost:4444/${img}`}
          ></img>
        ))}
      <FlexBetween mt=".25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap=".3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined sx={{ color: primary }} />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          <FlexBetween gap=".3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt=".5rem">
          {commentsList.map((comment) => (
            <Box key={`&{name}-${comment._id}`}>
              <Divider />
              <Typography sx={{ color: main, m: ".5rem 0", pl: "1rem" }}>
                {comment.content}
              </Typography>
              <Divider />
            </Box>
          ))}
        </Box>
      )}
      <form onSubmit={addComment}>
        <Input
          fullWidth
          name="content"
          placeholder="Write comment here!"
        ></Input>
      </form>
    </WidgetWrapper>
  );
};

export default PostWidget;
