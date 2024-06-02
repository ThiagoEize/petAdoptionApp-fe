import Pet from "../pet/Pet";
import { usePetContext } from "../../context/PetContext";
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import './PetList.css';

const PetList = () => {
  const { petsList, savedPetsList } = usePetContext();
  const { saved } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Calculate current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = petsList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(petsList.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const getPaginationNumbers = () => {
    if (totalPages <= 7) return pageNumbers;
    if (currentPage <= 4) return pageNumbers.slice(0, 7);
    if (currentPage + 3 >= totalPages) return pageNumbers.slice(-7);
    return pageNumbers.slice(currentPage - 4, currentPage + 3);
  };

  return (
    <div>
      <Row>
        {currentItems.filter(pet => !saved || savedPetsList.includes(pet.id)).map(pet => (
          <Col xs={12} md={6} lg={4} key={pet.id} className="pet-row">
            <Pet pet={pet} />
          </Col>
        ))}
      </Row>
      <div className="pagination-container">
        <button
          className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {getPaginationNumbers().map(number => (
          <button
            key={number}
            className={`pagination-number ${number === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}
        <button
          className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default PetList;
