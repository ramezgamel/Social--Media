import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/Flexbetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const UserWidget = ({ userId }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const nUser = await axios.get(`http://localhost:4444/users/${userId}`, {
      headers: { Authorization: `Bearer ${state.token}` },
    });
    setUser(nUser.data.res);
  };
  useEffect(() => {
    getUser();
  }, []);
  if (!user) return null;
  const { firstName, lastName, friends, posts, location, image } = state.user;
  return (
    <WidgetWrapper>
      <FlexBetween
        gap=".5rem"
        pb="1rem"
        onClick={() => navigate(`/profile/${state.user._id}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={image}></UserImage>
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb=".5rem">
          <LocationOnOutlined sx={{ color: main }} fontSize="large" />
          <Typography color={medium}>{location}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box p="1rem 0">
        <FlexBetween mb=".5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          {/* <Typography color={main} fontWeight='500'>{viewedProfile}</Typography> */}
        </FlexBetween>
      </Box>
      <Divider />
      <Box p="1rem 0">
        <Typography color={main} fontWeight="500" fontSize="1rem" mb="1rem">
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem" mb=".5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
