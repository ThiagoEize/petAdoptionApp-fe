import React, { useEffect } from "react";
import Pet from "../pet/Pet";
import { usePetContext } from "../../context/PetContext";
import { useUserContext } from "../../context/UserContext";
import { Col, Row, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './PetList.css';

const PetList = () => {
  const { petsList, pagination, savedPetsList, setPagination, handleSearch, searchFormData, isLoading } = usePetContext();
  const { userId } = useUserContext();
  const { saved } = useParams();

  useEffect(() => {
    if (saved) {
      handleSearch(pagination.currentPage, 9, {
        ...searchFormData,
        ['savedPets.userId']: String(userId)
      });
    } else {
      handleSearch(pagination.currentPage, 9, searchFormData);
    }
  }, [pagination.currentPage]);

  useEffect(() => {

    if (saved) {
      handleSearch(1, 9, {
        ...searchFormData,
        ['savedPets.userId']: String(userId)
      });
    } else {
      handleSearch(1, 9, searchFormData);
    }
    // setPagination({ ...pagination, currentPage: 1 });
  }, [saved]);

  const handlePageChange = (pageNumber) => {
    setPagination({ ...pagination, currentPage: pageNumber });
  };

  const getPaginationNumbers = () => {
    const { totalPages, currentPage } = pagination;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages <= 7) return pageNumbers;

    let start = currentPage - 2;
    let end = currentPage + 2;

    if (start <= 1) {
      start = 2;
      end = 6;
    }

    if (end >= totalPages - 1) {
      start = totalPages - 5;
      end = totalPages - 1;
    }

    const middlePages = pageNumbers.slice(start - 1, end);

    return [1, ...middlePages, totalPages];
  };






  return (
    <Container fluid>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Row>
            {petsList.filter(pet => !saved || savedPetsList.includes(pet.id)).map(pet => (
              <Col xs={12} md={6} lg={4} key={pet.id} className="pet-row">
                <Pet pet={pet} />
              </Col>
            ))}

          </Row>
          <div className="pagination-container">
            <button
              className={`pagination-button ${pagination.currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
            >
              &lt;
            </button>
            {getPaginationNumbers().map(number => (
              <button
                key={number}
                className={`pagination-number ${number === pagination.currentPage ? 'active' : ''}`}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </button>
            ))}
            <button
              className={`pagination-button ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </Container>
  );
};

export default PetList;
