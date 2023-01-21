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
import RequestModal from "../RequestModal";
import { useNavigate } from 'react-router-dom';

import './NavBar.css';
import { useEffect, useState } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const {
    showSignUpModal,
    showLogInModal,
    showSpecieModal,
    showPermissionModal,
    showBreedModal,
    showPetModal,
    showRequestModal,
    setShowSignUpModal,
    setShowLogInModal,
    setShowSpecieModal,
    setShowPermissionModal,
    setShowBreedModal,
    setShowPetModal,
    setShowRequestModal,
    permissions,
    setPermissions,
    setInitialData,
    setToken,
    setUserId,
    token
  } = useUserContext();

  let activeStyle = {
    fontWeight: 'bold',
    color: 'black'
  };

  const [logedIn, setLogedIn] = useState(token ? true : false)

  useEffect(() => {
    setLogedIn(token ? true : false)
    console.log(logedIn);
  }, [token])


  const handleLogOut = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken('');
    setUserId('');
    setPermissions('');
    setLogedIn(false)
    navigate("/logedOut");
    // setShowLogInModal(false)
  }

  const handleLogIn = () => {
    setShowLogInModal(true)
  }

  const handleShowSpecieModal = () => {
    setShowSpecieModal(true);
    setInitialData({})
  }

  const handleShowBreedModal = () => {
    setShowBreedModal(true);
    setInitialData({})
  }

  const handleShowPermissionModal = () => {
    setShowPermissionModal(true);
    setInitialData({})
  }

  const handleShowPetModal = () => {
    setShowPetModal(true);
    setInitialData({})
  }

  useEffect(() => {
    console.log(permissions.canAcceptAdoptionRequests);
    console.log('type of', typeof permissions.canAcceptAdoptionRequests);
  })

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
          {permissions.canAcceptAdoptionRequests &&
            <li>
              <NavLink
                to="adoptionRequests"
                style={({ isActive }) =>
                  isActive ? activeStyle : undefined}
              >
                Adoption Requests
              </NavLink>
            </li>
          }
          <div className="align-right">
            {permissions.canAcceptAdoptionRequests &&
              <li>
                <Button onClick={handleShowSpecieModal}>Add Specie</Button>
              </li>
            }
            {permissions.canAcceptAdoptionRequests &&
              <li>
                <Button onClick={handleShowBreedModal}>Add Breed</Button>
              </li>
            }
            {permissions.canEditUserPermissions &&
              <li>
                <Button onClick={handleShowPermissionModal}>Add Permission</Button>
              </li>
            }
            {permissions.canAcceptAdoptionRequests &&
              <li>
                <Button onClick={handleShowPetModal}>Add Pet</Button>
              </li>
            }
            {!logedIn &&
              <li>
                <Button onClick={setShowSignUpModal}>SignUp</Button>
              </li>
            }
            <li>
              <Button onClick={logedIn ? handleLogOut : handleLogIn}>{logedIn ? 'LogOut' : 'LogIn'}</Button>
            </li>
          </div>
        </ul>
      </div>
      <SpecieModal
        visible={showSpecieModal}
        onClose={() => setShowSpecieModal(false)}
      />
      <BreedModal
        visible={showBreedModal}
        onClose={() => setShowBreedModal(false)}
      />
      <PetModal
        visible={showPetModal}
        onClose={() => setShowPetModal(false)}
      />
      <PermissionModal
        visible={showPermissionModal}
        onClose={() => setShowPermissionModal(false)}
      />
      <RequestModal
        visible={showRequestModal}
        onClose={() => setShowRequestModal(false)}
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