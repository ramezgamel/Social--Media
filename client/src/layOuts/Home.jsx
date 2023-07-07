import { Box, useMediaQuery } from "@mui/material";
import NavBar from "components/Navbar";
import React from "react";
import UserWidget from "./widgets/UserWidget";
import { useSelector } from "react-redux";
import MyPostWidget from "./widgets/MyPostWidget";
import PostsWidget from "./widgets/PostsWidget";
import AdvertWidget from "./widgets/AdvertWidget";
import FriendListWidget from "./widgets/FriendListWdoget";

const Home = () => {
  const isMobileScreen = useMediaQuery("(min-width:1000px)");
  const { _id, image } = useSelector((state) => state.user);
  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isMobileScreen ? "flex" : "block"}
        gap=".5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isMobileScreen ? "26%" : undefined}>
          <UserWidget userId={_id} image={image} />
        </Box>
        <Box
          flexBasis={isMobileScreen ? "42%" : undefined}
          mt={isMobileScreen ? undefined : "2rem"}
        >
          <MyPostWidget imagePath={image} />
          <PostsWidget userId={_id} />
        </Box>
        {isMobileScreen && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0">
              <FriendListWidget/>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
