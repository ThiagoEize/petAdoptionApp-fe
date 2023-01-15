// import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
// import { createContext, useContext, useState } from "react";
import { useUserContext } from "../../context/UserContext";

import SignUpModal from "../SignUpModal";
import LogInModal from "../LogInModal";
import BreedModal from "../BreedModal";
import SpecieModal from "../SpecieModal";
import PetModal from "../PetModal";
import PermissionModal from "../PermissionModal";

import './NavBar.css';

const NavBar = () => {
  // const navigate = useNavigate();
  const {
    showSignUpModal,
    showLogInModal,
    showSpecieModal,
    showPermissionModal,
    showBreedModal,
    showPetModal,
    setShowSignUpModal,
    setShowLogInModal,
    setShowSpecieModal,
    setShowPermissionModal,
    setShowBreedModal,
    setShowPetModal,
    permissions,
    setToken,
    setUserId,
    token
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
      <SpecieModal
        visible={showSpecieModal}
        onClose={() => setShowSpecieModal(false)}
      // initialData={initialData}
      />
      <BreedModal
        visible={showBreedModal}
        onClose={() => setShowBreedModal(false)}
      // setSpeciesList={setSpeciesList}
      />
      <PetModal
        visible={showPetModal}
        onClose={() => setShowPetModal(false)}
      // initialData={initialData}
      />
      <PermissionModal
        visible={showPermissionModal}
        onClose={() => setShowPermissionModal(false)}
      // initialData={initialData}
      />
      <SignUpModal
        visible={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
      />
      <LogInModal
        visible={showLogInModal}
        onClose={() => setShowLogInModal(false)}
        token={token}
        setToken={setToken}
        setUserId={setUserId}
      />
    </>

  );
};

export default NavBar;