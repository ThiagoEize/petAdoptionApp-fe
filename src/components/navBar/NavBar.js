import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";

import SignUpModal from "../SignUpModal";
import LogInModal from "../LogInModal";
import BreedModal from "../BreedModal";
import SpecieModal from "../SpecieModal";
import PetModal from "../PetModal";
import PermissionModal from "../PermissionModal";
import RequestModal from "../RequestModal";
import SavePetModal from "../SavePetModal";
import FosteringHouseModal from "../FosteringHouseModal"; // Import the new component

import './NavBar.css';

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
    showSavePetModal,
    showFosteringHouseModal, // Add state for Fostering House Modal
    setShowSignUpModal,
    setShowLogInModal,
    setShowSpecieModal,
    setShowPermissionModal,
    setShowBreedModal,
    setShowPetModal,
    setShowRequestModal,
    setShowSavePetModal,
    setShowFosteringHouseModal, // Add setter for Fostering House Modal
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

  const [logedIn, setLogedIn] = useState(token ? true : false);

  useEffect(() => {
    setLogedIn(!!token);
  }, [token]);

  const handleLogOut = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setToken('');
      setUserId('');
      setPermissions('');
      setLogedIn(false);
      navigate("/");
    }
  };

  const handleLogIn = () => {
    setShowLogInModal(true);
  };

  const handleShowSpecieModal = () => {
    setShowSpecieModal(true);
    setInitialData({});
  };

  const handleShowBreedModal = () => {
    setShowBreedModal(true);
    setInitialData({});
  };

  const handleShowPermissionModal = () => {
    setShowPermissionModal(true);
    setInitialData({});
  };

  const handleShowPetModal = () => {
    setShowPetModal(true);
    setInitialData({});
  };


  return (
    <div className="nav-bar-container">
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
              to="myList"
              style={({ isActive }) =>
                isActive ? activeStyle : undefined}
            >
              My pets list
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
          {permissions.canEditUsersPermissions &&
            <li>
              <NavLink
                to="users"
                style={({ isActive }) =>
                  isActive ? activeStyle : undefined}
              >
                Users
              </NavLink>
            </li>
          }
          <div className="align-right">
            {permissions.canEditCreatePets &&
              <li className="nav-list dropdown">
                <button className="dropbtn">Pets</button>
                <div className="dropdown-content">
                  <NavLink to="#" onClick={handleShowPetModal}>Add Pet</NavLink>
                  <NavLink to="#" onClick={handleShowSpecieModal}>Add Specie</NavLink>
                  <NavLink to="#" onClick={handleShowBreedModal}>Add Breed</NavLink>
                  {permissions.canAcceptAdoptionRequests &&
                    <NavLink to="adoptionRequests">Adoption Requests</NavLink>
                  }
                </div>
              </li>
            }

            {!logedIn &&
              <li className="nav-list">
                <button onClick={() => setShowSignUpModal(true)}>SignUp</button>
              </li>
            }
            <li className="nav-list">
              <button onClick={logedIn ? handleLogOut : handleLogIn}>{logedIn ? 'LogOut' : 'LogIn'}</button>
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
      <SavePetModal
        visible={showSavePetModal}
        onClose={() => setShowSavePetModal(false)}
      />
      <FosteringHouseModal
        visible={showFosteringHouseModal} // Add Fostering House Modal
        onClose={() => setShowFosteringHouseModal(false)}
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
    </div>
  );
};

export default NavBar;
