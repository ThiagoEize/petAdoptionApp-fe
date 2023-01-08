// import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
// import { createContext, useContext, useState } from "react";
import { useUserContext } from "../context/UserContext";

const NavBar = () => {
  // const navigate = useNavigate();
  const { setShowSignUpModal } = useUserContext();

  const handleLoginClick = () => {
    setShowSignUpModal(true)
  }

  let activeStyle = {
    fontWeight: 'bold',
    color: 'black'
  };

  return (
    <>
      <div className="nav-bar">
        <ul>
          <li>
            <NavLink
              to=""
              style={({ isActive }) =>
                isActive ? activeStyle : undefined}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="profile"
              style={({ isActive }) =>
                isActive ? activeStyle : undefined}
            >
              Profile
            </NavLink>
          </li>
          <div className="alignRight">
            <li>
              <Button onClick={handleLoginClick}>SignUp</Button>
            </li>
            <li>
              <Button>Login</Button>
            </li>
          </div>
        </ul>
      </div>
    </>

  );
};

export default NavBar;