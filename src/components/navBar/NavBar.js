// import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
// import { createContext, useContext, useState } from "react";
import { useUserContext } from "../../context/UserContext";

import './NavBar.css';

const NavBar = () => {
  // const navigate = useNavigate();
  const {
    setShowSignUpModal,
    setShowLogInModal,
    setShowSpecieModal,
    setShowPermissionModal,
    setShowBreedModal,
    setShowPetModal
  } = useUserContext();

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
              <Button onClick={setShowSpecieModal}>Add Specie</Button>
            </li>
            <li>
              <Button onClick={setShowBreedModal}>Add Breed</Button>
            </li>
            <li>
              <Button onClick={setShowPermissionModal}>Add Permission</Button>
            </li>
            <li>
              <Button onClick={setShowPetModal}>Add Pet</Button>
            </li>
            <li>
              <Button onClick={setShowSignUpModal}>SignUp</Button>
            </li>
            <li>
              <Button onClick={setShowLogInModal}>Login</Button>
            </li>

          </div>
        </ul>
      </div>
    </>

  );
};

export default NavBar;