import * as moment from 'moment';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from "../../context/UserContext";
import { usePetContext } from "../../context/PetContext";
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

  const { petsList, setPetsList } = usePetContext();

  const [adoptionRequestState, setAdoptionRequestState] = useState({})
  const [fosterRequestState, setFosterRequestState] = useState({})
  const [returnRequestState, setReturnRequestState] = useState({})

  const getUserRequests = async () => {
    try {
      const resAdopt = await axios.get(`http://localhost:8080/adoptionRequests?users.id=${userId}&petId=${pet.id}&requestType=adopt`, { headers: { Authorization: `Bearer ${token}` } });
      if (resAdopt.data.data.length > 0) {
        setAdoptionRequestState(resAdopt.data.data[0])
        console.log(resAdopt.data.data[0]);
      } else {
        setAdoptionRequestState({})
      }
    } catch (err) {
      setAdoptionRequestState({})
      console.log(err);
    }

    try {
      const resFoster = await axios.get(`http://localhost:8080/adoptionRequests?users.id=${userId}&petId=${pet.id}&requestType=foster`, { headers: { Authorization: `Bearer ${token}` } });
      if (resFoster.data.data.length > 0) {
        setFosterRequestState(resFoster.data.data[0])
        console.log('adoptionRequestState', adoptionRequestState);
      } else {
        setFosterRequestState({})
      }
    } catch (err) {
      setFosterRequestState({})
      console.log(err);
    }

    try {
      const resReturn = await axios.get(`http://localhost:8080/adoptionRequests?users.id=${userId}&petId=${pet.id}&requestType=return`, { headers: { Authorization: `Bearer ${token}` } });
      if (resReturn.data.data.length > 0) {
        setReturnRequestState(resReturn.data.data[0])
      } else {
        setReturnRequestState({})
      }
    } catch (err) {
      setReturnRequestState({})
      console.log(err);
    }
    setShowRequestModal(false)
  }

  useEffect(() => {
    if (showRequestModal === false) {
      getUserRequests()
    }
  }, [showRequestModal])

  useEffect(() => {
    if (adoptionRequestState.requestStatus === "Aproved") {
      pet.adoptionStatus = "Adopted"
      pet.userName = adoptionRequestState.userName
      pet.userId = adoptionRequestState.userId
    }
  }, [adoptionRequestState])

  useEffect(() => {
    if (fosterRequestState.requestStatus === "Aproved") {
      pet.adoptionStatus = "Fostered"
      pet.userName = fosterRequestState.userName
      pet.userId = fosterRequestState.userId
    }
  }, [fosterRequestState])

  useEffect(() => {
    if (returnRequestState.requestStatus === "Aproved") {
      pet.adoptionStatus = "Available"
      pet.userName = '';
      pet.userId = ''
    }
  }, [returnRequestState])

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
      setAdoptionRequestState({})
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFosterRequest = async () => {
    try {
      const deleted = await axios.delete(`http://localhost:8080/adoptionRequests/${fosterRequestState.id}`, { headers: { Authorization: `Bearer ${token}` } });
      setFosterRequestState({})
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteReturnRequest = async () => {
    try {
      const deleted = await axios.delete(`http://localhost:8080/adoptionRequests/${returnRequestState.id}`, { headers: { Authorization: `Bearer ${token}` } });
      setReturnRequestState({})
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeletePet = async () => {
    try {
      const deleted = await axios.delete(`http://localhost:8080/pets/${pet.id}`, { headers: { Authorization: `Bearer ${token}` } });
      const newPetList = petsList.filter(deletedPet => deletedPet.id !== pet.id)
      console.log(deleted);
      setPetsList(newPetList)
    } catch (err) {
      console.log(err);
    }
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

        {adoptionRequestState.id &&
          <div className='requestStatus'>
            <p className='requestMessage'>Adoption request {adoptionRequestState.requestStatus}</p>
            <button className="pet-button delete-button" onClick={handleDeleteAdoptionRequest}>{adoptionRequestState.requestStatus === 'Pending' ? "Cancel" : "Close"}</button>
          </div>
        }

        {fosterRequestState.id &&
          <div className='requestStatus'>
            <p className='requestMessage'>Fostering request {fosterRequestState.requestStatus}</p>
            <button className="pet-button delete-button" onClick={handleDeleteFosterRequest}>{fosterRequestState.requestStatus === 'Pending' ? "Cancel" : "Close"}</button>
          </div>
        }

        {returnRequestState.id &&
          <div className='requestStatus'>
            <p className='requestMessage'>Return request {returnRequestState.requestStatus}</p>
            <button className="pet-button delete-button" onClick={handleDeleteReturnRequest}>{returnRequestState.requestStatus === 'Pending' ? "Cancel" : "Close"}</button>
          </div>
        }
        <div className='buttonsDiv'>
          <button className="pet-button show-button" onClick={handleShowPet}>Show</button>
          <button className="pet-button edit-button" onClick={handleEditPet}>Edit</button>

          {((!pet.userId || pet.userId === userId || pet.adoptionStatus === 'Fostered') && !adoptionRequestState.id) &&
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

          {((!pet.userId || (pet.userId === userId && pet.adoptionStatus === 'Fostered')) && !fosterRequestState.id) &&
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