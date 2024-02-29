import { Box } from "@mui/system";
import logo from "../../../logo1.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

/* Home page for logged in users. Allows navigation to all blogs and users blogs */

const UserHomePage = () => {
  const buttonStyle = {
    margin: "8px 0",
    outerWidth: "34%",
    backgroundColor: "black",
    color: "white",
  };
  const navigate = useNavigate();
  //gets user data from localstorage and checks to see if a user is logged in.
  //if true is returned, user will see this page.
  const userJSON = localStorage.getItem("user");
  const user = userJSON ? JSON.parse(userJSON) : null;

  const handleClick = () => {
    navigate("/dashboard/" + user.id);
  };

  const handleClickAll = () => {
    navigate("/blogs");
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
