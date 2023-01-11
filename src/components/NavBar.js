// import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
// import { createContext, useContext, useState } from "react";
import { useUserContext } from "../context/UserContext";

const NavBar = () => {
  // const navigate = useNavigate();
  const { setShowSignUpModal, setShowLogInModal, setShowPetModal } = useUserContext();

  const handleSignUpClick = () => {
    setShowSignUpModal(true)
  }
  const handlePetClick = () => {
    setShowPetModal(true)
  }

  const handleLoginClick = () => {
    setShowLogInModal(true)
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
          <div className="align-right">
            <li>
              <Button onClick={handlePetClick}>Add Pet</Button>
            </li>
            <li>
              <Button onClick={handleSignUpClick}>SignUp</Button>
            </li>
            <li>
              <Button onClick={handleLoginClick}>Login</Button>
            </li>
          </div>
        </ul>
      </div>
    </>

  );
};

export default NavBar;