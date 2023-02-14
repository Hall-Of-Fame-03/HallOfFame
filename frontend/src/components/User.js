import React from "react";
import { Link } from "react-router-dom";

const User = ({ userId, name, avatar }) => {
  return (
    <Link to={`/user/${userId}`} className="homeUser">
      <img src={avatar} alt={name} height="30px" width="30px" />
      <p>{name}</p>
    </Link>
  );
};

export default User;