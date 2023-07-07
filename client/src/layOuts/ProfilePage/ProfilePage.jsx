import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "components/Navbar";
import FriendListWidget from "layOuts/widgets/FriendListWdoget";
import MyPostWidget from "layOuts/widgets/MyPostWidget";
import PostsWidget from "layOuts/widgets/PostsWidget";
import UserWidget from "layOuts/widgets/UserWidget";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isMobileScreen = useMediaQuery("(min-width:1000px)");
  const getUser = async () => {
    const response = await axios.get(`http://localhost:4444/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(response.data.res);
  };
  useEffect(() => {
    getUser();
  }, []);
  if (!user) return null;
  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isMobileScreen ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isMobileScreen ? "26%" : undefined}>
          <UserWidget userId={userId} image={user.image} />
          <Box m="2rem 0"></Box>
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isMobileScreen ? "42%" : undefined}
          mt={isMobileScreen ? undefined : "2rem"}
        >
          <MyPostWidget imagePath={user.image}/>
          <Box m="2rem 0"></Box>
          <PostsWidget userId={userId} isProfile={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
