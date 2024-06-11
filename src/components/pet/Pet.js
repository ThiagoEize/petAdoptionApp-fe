import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from "../../context/UserContext";
import { usePetContext } from "../../context/PetContext";
import axios from 'axios';
import { Col, Row, Container } from 'react-bootstrap';

import './Pet.css';

const Pet = ({ pet }) => {
  const navigate = useNavigate();

  const {
    setShowPetModal,
    permissions,
    setInitialData,
    showRequestModal,
    setShowRequestModal,
    showSavePetModal,
    setShowSavePetModal,
    setRequestType,
    setPetId,
    userId,
    token
  } = useUserContext();

  const { petsList, setPetsList, setReloud, savedPetsList, setSavedPetsList } = usePetContext();

  const [adoptionRequestState, setAdoptionRequestState] = useState({})
  const [fosterRequestState, setFosterRequestState] = useState({})
  const [returnRequestState, setReturnRequestState] = useState({})

  const [savePetState, setSavePetState] = useState({})

  const getSavePets = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/savedPets?users.id=${userId}&petId=${pet.id}`, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.data.length > 0) {
        setSavePetState(response.data.data[0])
      } else {
        setSavePetState({})
      }
    } catch (err) {
      setSavePetState({})
      console.log(err);
    }
  }

  useEffect(() => {
    if (showSavePetModal === false) {
      getSavePets()
    }
  }, [showSavePetModal])

  const getUserRequests = async () => {
    try {
      const resAdopt = await axios.get(`http://localhost:8080/adoptionRequests?users.id=${userId}&petId=${pet.id}&requestType=adopt`, { headers: { Authorization: `Bearer ${token}` } });
      if (resAdopt.data.data.length > 0) {
        setAdoptionRequestState(resAdopt.data.data[0])
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
    navigate(`/petShow/${pet.id}`)
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

  const handleSavePet = async () => {
    if (savedPetsList.includes(pet.id)) {
      try {
        const response = await axios.delete(`http://localhost:8080/savedPets/${savePetState.id}`, { headers: { Authorization: `Bearer ${token}` } });
        setSavedPetsList(prev => prev.filter(id => id !== pet.id))
        setSavePetState({})
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        setShowSavePetModal(true)
        setPetId(pet.id)
      } catch (err) {
        console.log(err);
      }
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
      if (adoptionRequestState.requestStatus !== "Pending") {
        const deleted = await axios.delete(`http://localhost:8080/adoptionRequests/${adoptionRequestState.id}`, { headers: { Authorization: `Bearer ${token}` } });
        setAdoptionRequestState({});
      } else {
        const confirmed = window.confirm("Are you sure you want to cancel your adoption request?");
        if (confirmed) {
          const deleted = await axios.delete(`http://localhost:8080/adoptionRequests/${adoptionRequestState.id}`, { headers: { Authorization: `Bearer ${token}` } });
          setAdoptionRequestState({});
        }
      }

    } catch (err) {
      console.log(err);
    }
  }


  const handleDeleteFosterRequest = async () => {
    try {
      if (fosterRequestState.requestStatus !== "Pending") {
        const deleted = await axios.delete(`http://localhost:8080/adoptionRequests/${fosterRequestState.id}`, { headers: { Authorization: `Bearer ${token}` } });
        setFosterRequestState({})
      } else {
        const confirmed = window.confirm("Are you sure you want to cancel your foster request?");
        if (confirmed) {
          const deleted = await axios.delete(`http://localhost:8080/adoptionRequests/${fosterRequestState.id}`, { headers: { Authorization: `Bearer ${token}` } });
          setFosterRequestState({})
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteReturnRequest = async () => {
    try {
      if (returnRequestState.requestStatus !== "Pending") {
        const deleted = await axios.delete(`http://localhost:8080/adoptionRequests/${returnRequestState.id}`, { headers: { Authorization: `Bearer ${token}` } });
        setReturnRequestState({});
      } else {
        const confirmed = window.confirm("Are you sure you want to cancel this return request?");
        if (confirmed) {
          const deleted = await axios.delete(`http://localhost:8080/adoptionRequests/${returnRequestState.id}`, { headers: { Authorization: `Bearer ${token}` } });
          setReturnRequestState({});
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeletePet = async () => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this pet?");
      if (confirmed) {
        const deleted = await axios.delete(`http://localhost:8080/pets/${pet.id}`, { headers: { Authorization: `Bearer ${token}` } });
        const newPetList = petsList.filter(deletedPet => deletedPet.id !== pet.id);
        setPetsList(newPetList);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Container id={pet.id} className={`pet-card ${pet.adoptionStatus}`}>
        <Row col={12}>
          <Col>
            <img col={2} src={pet.picture ? pet.picture : "https://thumbs.dreamstime.com/z/grupo-de-animais-de-estima%C3%A7%C3%A3o-junto-15228977.jpg"} alt={pet.petName} className="pet-picture pet-picture-half" />
          </Col>
          <Col>
            <div col={10} className="pet-info">
              <h2 className="pet-name">{pet.petName}</h2>
              <div className="pet-details">
                <div className="pet-color">Specie: {pet.specieName}</div>
                <div className="pet-color">Breed: {pet.breedName}</div>
                <div className="pet-age">Age: {pet.petAge}</div>
                <div className="pet-height">Height: {pet.height}</div>
                <div className="pet-weight">Weight: {pet.weight}</div>
                <div className="pet-color">Color: {pet.color}</div>

                {/* {savePetState.id &&
                  <div className="pet-saved">Pet Saved</div>
                } */}
              </div>
            </div>
          </Col>
        </Row>
        {/* <div col={12}> */}
        {/* <Col col={8}> */}
        <div className='side-by-side'>
          <div>
            {pet.userName ?
              <div className="pet-user">
                {pet.adoptionStatus} By: {pet.userName}
              </div>
              :
              <div className={`${pet.adoptionStatus}`}>Status: {pet.adoptionStatus}</div>
            }
          </div>
          {/* </Col> */}
          {/* <Col col={2}> */}

          <button className={savedPetsList.includes(pet.id) ? "pet-button unsave-button" : "pet-button save-button"} onClick={handleSavePet}>{savedPetsList.includes(pet.id) ? 'Delete from my list' : 'Add to my list'}</button>
          {/* </Col> */}
          {/* </div> */}
        </div>

        <Row col={12}>
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
            {((permissions.canEditCreatePets && pet.userId === null && permissions.fosteringHouse !== undefined) || (userId === pet.userId)) &&
              <button className="pet-button edit-button" onClick={handleEditPet}>Edit</button>
            }
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
            {((permissions.canEditCreatePets && pet.userId === null && permissions.fosteringHouse !== undefined) || (userId === pet.userId)) &&
              <button className="pet-button delete-button" onClick={handleDeletePet}>Delete</button>
            }
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Pet;