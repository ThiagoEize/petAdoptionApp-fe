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