import React from "react";
import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <div>
      Sorry, you don't have access to this feature <br />
      <Link to={"/"}>Home</Link>
    </div>
  );
}
