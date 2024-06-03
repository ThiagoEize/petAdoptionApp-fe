import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from "../../context/UserContext";
import { usePetContext } from "../../context/PetContext";
import { useNavigate } from 'react-router-dom';
import PetModal from "../PetModal";
import './PetShow.css';

const PetShow = () => {
    const navigate = useNavigate();

    const {
        setShowPetModal,
        permissions,
        initialData,
        setInitialData,
        setShowRequestModal,
        setRequestType,
        setPetId,
        userId,
        showRequestModal,
        showSavePetModal,
        setShowSavePetModal,
        token
    } = useUserContext();

    const {
        pet,
        setPet,
        savedPetsList,
        setSavedPetsList
    } = usePetContext();

    useEffect(() => {
        console.log('teste');
    })

    const { petId } = useParams();

    const getPetData = async () => {
        const res = await axios.get(`http://localhost:8080/pets/${petId}`);
        setPet(res.data.data)
        console.log(res);
    }

    useEffect(() => {
        getPetData()
    }, [])

    const handleEditPet = () => {
        setInitialData(pet)
        setShowPetModal(true)
    }

    const [adoptionRequestState, setAdoptionRequestState] = useState({})
    const [fosterRequestState, setFosterRequestState] = useState({})
    const [returnRequestState, setReturnRequestState] = useState({})

    const [savePetState, setSavePetState] = useState({})

    // useEffect(() => {
    //   setReloud(true)
    // }, [savePetState])

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
        getSavePets()
    }, [showSavePetModal])

    useEffect(() => {
        getSavePets()
    }, [pet])

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

    const handleSavePet = async () => {
        if (savedPetsList.includes(pet.id)) {
            try {
                console.log("savePetState", savePetState.id);
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

    return (
        <>
            <div id={pet.id} className='pet-show-card'>
                <div className='pet-show-general-information'>
                    <img src={pet.picture ? pet.picture : "https://thumbs.dreamstime.com/z/grupo-de-animais-de-estima%C3%A7%C3%A3o-junto-15228977.jpg"} alt={pet.petName} className="pet-show-picture" />
                    <div className="pet-show-info">
                        <h2 className="pet-show-name">{pet.petName}</h2>
                        <div className="pet-show-details">
                            <div className="pet-show-age">Specie: {pet.specieName}</div>
                            <div className="pet-show-age">Breed: {pet.breedName}</div>
                            <div className="pet-show-age">Age: {pet.petAge}</div>
                            <div className="pet-show-height">Height: {pet.height}</div>
                            <div className="pet-show-weight">Weight: {pet.weight}</div>
                            <div className="pet-show-color">Color: {pet.color}</div>

                        </div>
                        <div>
                            <h3>Bio</h3>
                            <p className="pet-show-bio">{pet.petBio}</p>
                        </div>
                        <div>
                            <h3>Food restriction</h3>
                            <p className="pet-show-bio">{pet.foodRestrictions}</p>
                        </div>
                    </div>
                </div>
                <div className="pet-show-user-status-restrictions">
                    {pet.userName ? (
                        <div>
                            Adopted By: {pet.userName}
                        </div>
                    ) : (
                        <div className={`${pet.adoptionStatus}`}>Status: {pet.adoptionStatus}</div>
                    )}
                </div>
                <div className="pet-show-comentary">
                    {savePetState.personalComentary && 'Personal comentary: ' + savePetState.personalComentary}
                </div>

                {adoptionRequestState.id &&
                    <div className='show-pet-RequestMessage'>
                        <p className='show-pet-text-message'>Adoption request {adoptionRequestState.requestStatus}</p>
                        <button className="pet-button delete-button" onClick={handleDeleteAdoptionRequest}>{adoptionRequestState.requestStatus === 'Pending' ? "Cancel" : "Close"}</button>
                    </div>
                }

                {fosterRequestState.id &&
                    <div className='show-pet-RequestMessage'>
                        <p className='show-pet-text-message'>Fostering request {fosterRequestState.requestStatus}</p>
                        <button className="pet-button delete-button" onClick={handleDeleteFosterRequest}>{fosterRequestState.requestStatus === 'Pending' ? "Cancel" : "Close"}</button>
                    </div>
                }

                {returnRequestState.id &&
                    <div className='show-pet-RequestMessage'>
                        <p className='show-pet-text-message'>Return request {returnRequestState.requestStatus}</p>
                        <button className="pet-button delete-button" onClick={handleDeleteReturnRequest}>{returnRequestState.requestStatus === 'Pending' ? "Cancel" : "Close"}</button>
                    </div>
                }
                <div className='buttonsDiv'>
                    {permissions.canAcceptAdoptionRequests &&
                        <button className="pet-show-button pet-show-edit-button" onClick={handleEditPet}>Edit</button>
                    }
                    {((!pet.userId || pet.userId === userId || pet.adoptionStatus === 'Fostered') && !adoptionRequestState.id) &&
                        <button className={
                            pet.adoptionStatus !== "Adopted" ?
                                "pet-button pet-show-adopt-button" : "pet-button delete-button"
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
                                "pet-button pet-show-foster-button" : "pet-button delete-button"
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
                    <button className={!savePetState ? "pet-button unsave-button" : "pet-button save-button"} onClick={handleSavePet}>{!savePetState ? 'Unsave' : 'Save'}</button>
                    {/* <button className="pet-show-button delete-button" onClick={handleDeletePet}>Delete</button> */}
                </div>

            </div>
        </>
    );
};

export default PetShow;