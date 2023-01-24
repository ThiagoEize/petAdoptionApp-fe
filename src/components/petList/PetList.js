import Pet from "../pet/Pet";
import { usePetContext } from "../../context/PetContext";
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import axios from 'axios';
import './PetList.css';

const PetList = () => {
  const { petsList, setPetsList, reloud, setReloud, savedPetsList } = usePetContext();
  // const { petsList, setPetsList, reloud, setReloud } = usePetContext();

  const { userId, token } = useUserContext();

  const { saved } = useParams();
  // console.log('petsListComponent', petsList);

  // const handleIsSaved = async (petId) => {
  //   try {
  //     const response = await axios.get(`http://localhost:8080/savedPets?users.id=${userId}&petId=${petId}`, { headers: { Authorization: `Bearer ${token}` } });
  //     if (response.data.data.length > 0) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return false
  //   }
  // }

  // const setListAgain = async () => {
  //   let newPetList = []
  //   if (petsList.length > 0) {
  //     console.log('test');
  //     for (let i = 0; i < petsList.length; i++) {
  //       newPetList[i] = { ...petsList[i], 'isSaved': await handleIsSaved(petsList[i].id) }
  //     }
  //     setPetsList(newPetList)
  //     // console.log('newPetList', newPetList);
  //   } else {
  //     newPetList = petsList
  //   }
  // }

  // useEffect(() => {
  //   if (reloud === true) {
  //     console.log('is reloading?');
  //     setListAgain()
  //     setReloud(false)
  //   }
  // }, [reloud])

  return (

    <div>
      {!saved ?
        <Row>
          {
            petsList.map((pet) => (
              <Col xs={12} md={6} lg={4} key={pet.id} className="pet-row">
                <Pet pet={pet} />
              </Col>
            ))}
        </Row>
        :
        <Row>
          {petsList.filter(pet => savedPetsList.includes(pet.id)).map((pet) => (
            <Col xs={12} md={6} lg={4} key={pet.id} className="pet-row">
              <Pet pet={pet} />
            </Col>
          ))}
        </Row>
      }
    </div>
  );
};

export default PetList;