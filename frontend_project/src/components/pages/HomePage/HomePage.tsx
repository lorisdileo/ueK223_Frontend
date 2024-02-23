import { Box } from "@mui/system";
import Button from "@mui/material/Button/Button";
import logo from "../../../logo1.png";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const buttonStyle = {
    margin: "8px 0",
    outerWidth: "34%",
    backgroundColor: "black",
    color: "white",
  };
  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate("/login");
  };

  const handleClickBlogs = () => {
    navigate("/blog/feed");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection={"column"}
    >
      <h1>Welcome to the Homepage</h1>

      <Button
        type="submit"
        color="primary"
        variant="contained"
        style={buttonStyle}
        onClick={handleClickLogin}
      >
        Login
      </Button>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        style={buttonStyle}
        onClick={handleClickBlogs}
      >
        Blogs
      </Button>
      <img
        src={logo}
        style={{ filter: "invert(100%)" }}
        className="App-logo"
        alt="logo"
      />
    </Box>
  );
};

export default HomePage;
