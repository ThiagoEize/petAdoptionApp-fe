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
        token
    } = useUserContext();

    const {
        pet,
        setPet
    } = usePetContext();

    const { petId } = useParams();

    const getPetData = async () => {
        const res = await axios.get(`http://localhost:8080/pets/${petId}`, { headers: { Authorization: `Bearer ${token}` } });
        setPet(res.data.data)
        console.log(res);
        console.log('this is the pet', pet);
    }

    useEffect(() => {
        getPetData()
    }, [])

    const handleEditPet = () => {
        setInitialData(pet)
        setShowPetModal(true)
    }

    const handleAdoptPet = () => {
        // code to handle adopting the pet would go here
    }

    const handleFosterPet = () => {
        // code to handle deleting the pet would go here
    }

    const handleDeletePet = () => {
        // code to handle deleting the pet would go here
    }

    return (
        <>
            <div id={pet.id} className='pet-show-card'>
                <img src={pet.picture} alt={pet.petName} className="pet-show-picture" />
                <div className="pet-show-info">
                    <h2 className="pet-show-name">{pet.petName}</h2>
                    <div className="pet-show-details">
                        <div className="pet-show-age">Age: {pet.petAge}</div>
                        <div className="pet-show-height">Height: {pet.height}</div>
                        <div className="pet-show-weight">Weight: {pet.weight}</div>
                        <div className="pet-show-color">Color: {pet.color}</div>
                    </div>
                    <div>
                        <h3>Bio</h3>
                        <p className="pet-show-bio">{pet.petBio}</p>
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

                    <p className="pet-show-food-restrictions">Food restrictions: {pet.foodRestrictions}</p>

                </div>
                <div className='buttonsDiv'>
                    <button className="pet-show-button edit-button" onClick={handleEditPet}>Edit</button>
                    <button className="pet-show-button adopt-button" onClick={handleAdoptPet}>Adopt</button>
                    <button className="pet-show-button foster-button" onClick={handleFosterPet}>Foster</button>
                    <button className="pet-show-button delete-button" onClick={handleDeletePet}>Delete</button>
                </div>

            </div>
        </>
    );
};

export default PetShow;