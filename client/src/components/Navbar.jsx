import { React, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./Flexbetween";

const NavBar = () => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const fullName = `${user?.firstName} ${user?.lastName}`;
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <Typography
        fontWeight="bold"
        fontSize="clamp(1rem, 2rem, 2.25rem)"
        color="primary"
        onClick={() => navigate("/home")}
        sx={{
          "&:hover": {
            color: primaryLight,
            cursor: "pointer",
          },
        }}
      >
        SocialMedia
      </Typography>
      {isNonMobileScreen && (
        <FlexBetween
          backgroundColor={neutralLight}
          borderRadius="9px"
          gap="3rem"
          padding=".1rem 1.5rem"
        >
          <InputBase placeholder="Search" />
          <IconButton>
            <Search />
          </IconButton>
        </FlexBetween>
      )}
      {isNonMobileScreen ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ fontSize: "25px", color: dark }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value="">
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: ".25rem",
                p: ".25rem 1re",
                "& .MuiSvgIcon-root": { pr: ".25rem", width: "3rem" },
                "&MuiSelect-select :focus": { backgroundColor: neutralLight },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setIsMenuToggled(!isMenuToggled)}>
          <Menu />
        </IconButton>
      )}
      {!isNonMobileScreen && isMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          <Box display="flex" p="1rem" justifyContent="flex-end">
            <IconButton onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <Close />
            </IconButton>
          </Box>
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap="2rem"
          >
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ fontSize: "25px", color: dark }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value="">
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: ".25rem",
                  p: ".25rem 1re",
                  "& .MuiSvgIcon-root": { pr: ".25rem", width: "3rem" },
                  "&MuiSelect-select :focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Logout
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default NavBar;
