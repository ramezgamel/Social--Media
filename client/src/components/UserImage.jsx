import { Box } from "@mui/material";

const UserImage = ({ size = "60px", image }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:4444/${image}`}
      />
    </Box>
  );
};

export default UserImage;
