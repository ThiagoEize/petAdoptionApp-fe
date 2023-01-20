import * as moment from 'moment';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from "../../context/UserContext";
import axios from 'axios';
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

  const [didSendAdoptionRequest, setDidSendAdoptionRequest] = useState(false)

  const [didSendFosterRequest, setDidSendFosterRequest] = useState(false)

  const [adoptionRequestState, setAdoptionRequestState] = useState('')

  const [fosterRequestState, setFosterRequestState] = useState('')

  const getUserRequests = async () => {
    try {
      const resAdopt = await axios.get(`http://localhost:8080/adoptionRequests?users.id=${userId}&petId=${pet.id}&requestType=adopt`, { headers: { Authorization: `Bearer ${token}` } });
      if (resAdopt.data.data.length > 0) {
        setDidSendAdoptionRequest(true)
        setAdoptionRequestState(resAdopt.data.data[0])
        console.log(resAdopt.data.data[0]);
      } else {
        setDidSendAdoptionRequest(false)
      }
    } catch (err) {
      setDidSendAdoptionRequest(false)
      console.log(err);
    }

    try {
      const resFoster = await axios.get(`http://localhost:8080/adoptionRequests?users.id=${userId}&petId=${pet.id}&requestType=foster`, { headers: { Authorization: `Bearer ${token}` } });
      if (resFoster.data.data.length > 0) {
        setDidSendFosterRequest(true)
        setFosterRequestState(resFoster.data.data[0])
        console.log('adoptionRequestState', adoptionRequestState);
      } else {
        setDidSendFosterRequest(false)
      }
    } catch (err) {
      setDidSendFosterRequest(false)
      console.log(err);
    }

    // try {
    //   const resFoster = await axios.get(`http://localhost:8080/adoptionRequests?users.id=${userId}&petId=${pet.id}&requestType=return`, { headers: { Authorization: `Bearer ${token}` } });
    //   console.log(resFoster);
    //   if (resFoster.data.data.length > 0) {
    //     setDidSendFosterRequest(true)
    //   } else {
    //     setDidSendFosterRequest(false)
    //   }
    //   setShowRequestModal(false)
    // } catch (err) {
    //   setDidSendFosterRequest(false)
    //   console.log(err);
    // }

    setShowRequestModal(false)
  }

  useEffect(() => {
    if (showRequestModal === false) {
      getUserRequests()
    }
  }, [showRequestModal])

  const handleShowPet = () => {
    navigate(`petShow/${pet.id}`)
  }

  const handleEditPet = () => {
    setInitialData(pet)
    setShowPetModal(true)
  }

  const handleAdoptPet = () => {
    try {
      setShowRequestModal(true)
      setPetId(pet.id)
      setRequestType('adopt')
    } catch (err) {
      console.log(err);
    }
  }

  const handleReturnPet = () => {
    try {
      setShowRequestModal(true)
      setPetId(pet.id)
      setRequestType('return')
    } catch (err) {
      console.log(err);
    }
  }

  const handleFosterPet = () => {
    setShowRequestModal(true)
    setPetId(pet.id)
    setRequestType('foster')
  }

  const handleDeleteAdoptionRequest = async () => {
    try {
      const deleted = await axios.delete(`http://localhost:8080/adoptionRequests/${adoptionRequestState.id}`, { headers: { Authorization: `Bearer ${token}` } });
      setDidSendAdoptionRequest(false)
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFosterRequest = async () => {
    try {
      const deleted = await axios.delete(`http://localhost:8080/adoptionRequests/${fosterRequestState.id}`, { headers: { Authorization: `Bearer ${token}` } });
      setDidSendFosterRequest(false)
    } catch (err) {
      console.log(err);
    }
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
          {pet.userName ?
            <div className="pet-user">
              {pet.adoptionStatus} By: {pet.userName}
            </div>
            :
            <div className={`${pet.adoptionStatus}`}>Status: {pet.adoptionStatus}</div>
          }
        </div>

        {didSendAdoptionRequest &&
          <div className='requestStatus'>
            <p className='requestMessage'>Adoption request {adoptionRequestState.requestStatus}</p>
            <button className="pet-button delete-button" onClick={handleDeleteAdoptionRequest}>Cancel</button>
          </div>
        }

        {didSendFosterRequest &&
          <div className='requestStatus'>
            <p className='requestMessage'>Fostering request {fosterRequestState.requestStatus}</p>
            <button className="pet-button delete-button" onClick={handleDeleteFosterRequest}>Cancel</button>
          </div>
        }
        <div className='buttonsDiv'>
          <button className="pet-button show-button" onClick={handleShowPet}>Show</button>
          <button className="pet-button edit-button" onClick={handleEditPet}>Edit</button>

          {((!pet.userId || pet.userId === userId || pet.adoptionStatus === 'Fostered') && !didSendAdoptionRequest) &&
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

          {((!pet.userId || pet.userId === userId && pet.adoptionStatus === 'Fostered') && !didSendFosterRequest) &&
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
                pet.adoptionStatus !== "Adopted" ?
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