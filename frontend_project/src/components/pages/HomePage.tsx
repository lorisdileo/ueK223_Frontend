import { Box } from "@mui/system";
import logo from "../../logo1.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection={"column"}
    >
      <h1>Welcome to the Homepage</h1>
      <img
        src={logo}
        style={{ filter: "invert(100%)" }}
        className="App-logo"
        alt="logo"
      />
    </Box>
  );
}
