import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "./Flexbetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Friend = ({ friendId, name, subtitle, userPic }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const isFriend = friends.find((friend) => friend._id === friendId);
  const patchFriend = async () => {
    const response = await axios.patch(
      `http://localhost:4444/users/${_id}/${friendId}`,{},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(setFriends({friends: response.data.res }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPic} size="55ox" />
        <Box
          onClick={() => {
            navigate(`profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize=".75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: ".6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined
            sx={{ color: primaryDark }}
          ></PersonRemoveOutlined>
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }}></PersonAddOutlined>
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
