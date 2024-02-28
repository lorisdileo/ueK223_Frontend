import { Box } from "@mui/system";
import logo from "../../../logo1.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserHomePage = () => {
  const buttonStyle = {
    margin: "8px 0",
    outerWidth: "34%",
    backgroundColor: "black",
    color: "white",
  };
  const navigate = useNavigate();
  //gets user data from localstorage so that the page will only show the users posts
  const userJSON = localStorage.getItem("user");
  const user = userJSON ? JSON.parse(userJSON) : null;

  const handleClick = () => {
    navigate("/dashboard/" + user.id);
  };

  const handleClickAll = () => {
    navigate("/blog/feed");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection={"column"}
    >
      <h1>Welcome back!</h1>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        style={buttonStyle}
        onClick={handleClick}
      >
        Your Blog Posts
      </Button>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        style={buttonStyle}
        onClick={handleClickAll}
      >
        All Blog Posts
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

export default UserHomePage;
