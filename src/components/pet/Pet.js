import * as moment from 'moment';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from "../../context/UserContext";
import RequestModal from "../RequestModal";

import './Pet.css';

const Pet = ({ pet }) => {
  const navigate = useNavigate();

  const {
    setShowPetModal,
    permissions,
    setInitialData,
    showRequestModal,
    setShowRequestModal,
    setRequestType,
    setPetId,
    userId,
    token
  } = useUserContext();

  const handleShowPet = () => {
    navigate(`petShow/${pet.id}`)
  }

  const handleEditPet = () => {
    setInitialData(pet)
    setShowPetModal(true)
  }

  const handleAdoptPet = () => {
    setShowRequestModal(true)
    console.log(showRequestModal);
  }

  const handleReturnPet = () => {

  }

  const handleFosterPet = () => {
    // code to handle deleting the pet would go here
  }

  const handleDeletePet = () => {
    // code to handle deleting the pet would go here
  }

  return (
    <>
      <div id={pet.id} className={`pet-card ${pet.adoptionStatus}`}>

        <img src={pet.picture} alt={pet.petName} className="pet-picture pet-picture-half" />
        <div className="pet-info">
          <h2 className="pet-name">{pet.petName}</h2>
          <div className="pet-details">
            <div className="pet-age">Age: {pet.petAge}</div>
            <div className="pet-height">Height: {pet.height}</div>
            <div className="pet-weight">Weight: {pet.weight}</div>
            <div className="pet-color">Color: {pet.color}</div>
          </div>

          {/* <p className="pet-bio">{pet.petBio}</p> */}
        </div>
        <div>
          {pet.userName ? (
            <div className="pet-user">
              {pet.adoptionStatus} By: {pet.userName}
            </div>
          ) : (
            <div className={`${pet.adoptionStatus}`}>Status: {pet.adoptionStatus}</div>
          )}
        </div>
        <div className='buttonsDiv'>
          <button className="pet-button show-button" onClick={handleShowPet}>Show</button>
          <button className="pet-button edit-button" onClick={handleEditPet}>Edit</button>

          {(!pet.userId || pet.userId === userId || pet.adoptionStatus === 'Fostered') &&
            <button className={
              pet.adoptionStatus !== "Adopted" ?
                "pet-button adopt-button" : "pet-button delete-button"
            }
              onClick={
                pet.adoptionStatus !== "Adopted" ?
                  handleAdoptPet : handleReturnPet
              }
            >
              {
                pet.adoptionStatus !== "Adopted" ?
                  "Adopt" : "Return"
              }
            </button>
          }

          {(!pet.userId || pet.userId === userId && pet.adoptionStatus === 'Fostered') &&
            <button className={
              pet.adoptionStatus !== "Fostered" ?
                "pet-button foster-button" : "pet-button delete-button"
            }
              onClick={
                pet.adoptionStatus !== "Fostered" ?
                  handleFosterPet : handleReturnPet
              }
            >
              {
                pet.adoptionStatus !== "Fostered" ?
                  "Foster" : "Return"
              }
            </button>
          }

          {/* <button className="pet-button foster-button" onClick={handleFosterPet}>Foster</button> */}
          <button className="pet-button delete-button" onClick={handleDeletePet}>Delete</button>
        </div>
      </div>
    </>
  );
};

export default Pet;