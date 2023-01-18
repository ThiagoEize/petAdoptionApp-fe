import Pet from "../pet/Pet";
import { usePetContext } from "../../context/PetContext";
import { Col, Row } from 'react-bootstrap';

import './PetList.css';

const PetList = () => {
  const { petsList } = usePetContext();
  // console.log('petsListComponent', petsList);
  return (
    <div>
      <Row>
        {petsList.map((pet) => (
          <Col xs={12} md={6} lg={4} key={pet.id} className="pet-row">
            <Pet pet={pet} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PetList;