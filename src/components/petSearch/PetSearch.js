import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import './PetSearch.css';
import { useUserContext } from "../../context/UserContext";
import { usePetContext } from "../../context/PetContext";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SearchPets() {
    const { token, userId } = useUserContext();
    const { handleSearch, searchFormData, setSearchFormData, filters, setFilters } = usePetContext();
    const { saved } = useParams();

    const [showFilters, setShowFilters] = useState(false);
    const [speciesList, setSpeciesList] = useState([]);
    const [breedsList, setBreedsList] = useState([]);
    const [filteredBreedsList, setFilteredBreedsList] = useState([]);

    const getSpeciesList = async () => {
        try {
            const res = await axios.get('http://localhost:8080/species', { headers: { Authorization: `Bearer ${token}` } });
            const species = res.data.data;
            setSpeciesList(species);
        } catch (err) {
            console.log(err);
        }
    };

    const getBreedsList = async () => {
        try {
            const res = await axios.get('http://localhost:8080/breeds', { headers: { Authorization: `Bearer ${token}` } });
            const breeds = res.data.data;
            setBreedsList(breeds);
            setFilteredBreedsList(breeds);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getSpeciesList();
        getBreedsList();
    }, []);

    const handleSearchWithPagination = (page = 1, limit = 9) => {
        if (saved === 'myList') {
            handleSearch(1, 9, {
                ...searchFormData,
                ['savedPets.userId']: String(userId)
            });
        } else {
            handleSearch(1, 9, searchFormData);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        let newValue = value;
        if (name === 'specieId') {
            const newBreedList = breedsList.filter(breed => breed.specieId === parseInt(newValue) || !breed.specieId);
            setFilteredBreedsList(newBreedList);
        } else if (name === "doFilter") {
            newValue = event.target.checked;
        }
        setSearchFormData({ ...searchFormData, [name]: newValue });
    };



    const handleSearchButtonClick = () => {
        handleSearchWithPagination(1);
        setShowFilters(false);
    };

    return (
        <div className="search-pets-wrapper">
            <Button className="filter-button" variant="primary" onClick={() => setShowFilters(true)}>
                <FontAwesomeIcon icon={faFilter} /> Filter
            </Button>

            <Modal show={showFilters} onHide={() => setShowFilters(false)} dialogClassName="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Filters</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="search-pets-container">
                        <div className='specie'>
                            <Form.Label>Specie</Form.Label>
                            <Form.Control as="select" name="specieId" value={searchFormData.specieId || ''} onChange={handleChange}>
                                <option value="">Filter by specie...</option>
                                {speciesList.map((specie) => (
                                    <option key={specie.id} value={specie.id}>
                                        {specie.specieName}
                                    </option>
                                ))}
                            </Form.Control>
                        </div>
                        <div className='breed'>
                            <Form.Label>Breed</Form.Label>
                            <Form.Control as="select" name="breedId" value={searchFormData.breedId || ''} onChange={handleChange}>
                                <option value="">Filter by breed...</option>
                                {filteredBreedsList.map((breed) => (
                                    <option key={breed.id} value={breed.id}>
                                        {breed.breedName}
                                    </option>
                                ))}
                            </Form.Control>
                        </div>
                        <div className='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Filter by name..."
                                name="petName"
                                value={searchFormData.petName || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='status'>
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" name="adoptionStatus" value={searchFormData.adoptionStatus || ''} onChange={handleChange}>
                                <option value="">Filter by status...</option>
                                <option value="Available">Available</option>
                                <option value="Adopted">Adopted</option>
                                <option value="Fostered">Fostered</option>
                            </Form.Control>
                        </div>
                        <div className='age'>
                            <Form.Label>Age</Form.Label>
                            <div className='iconsInputs'>
                                <Form.Label>Older than</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Older than..."
                                    name="age_greaterThan"
                                    value={searchFormData.age_greaterThan || ''}
                                    onChange={handleChange}
                                    className='number-input'
                                />
                            </div>
                            <div className='iconsInputs'>
                                <Form.Label>Younger than</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Younger than..."
                                    name="age_lessThan"
                                    value={searchFormData.age_lessThan || ''}
                                    onChange={handleChange}
                                    className='number-input'
                                />
                            </div>
                        </div>
                        <div className='height'>
                            <Form.Label>Height</Form.Label>
                            <div className='iconsInputs'>
                                <Form.Label>Taller than</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Taller than..."
                                    name="height_greaterThan"
                                    value={searchFormData.height_greaterThan || ''}
                                    onChange={handleChange}
                                    className='number-input'
                                />
                            </div>
                            <div className='iconsInputs'>
                                <Form.Label>Shorter than</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Shorter than..."
                                    name="height_lessThan"
                                    value={searchFormData.height_lessThan || ''}
                                    onChange={handleChange}
                                    className='number-input'
                                />
                            </div>
                        </div>
                        <div className='weight'>
                            <Form.Label>Weight</Form.Label>
                            <div className='iconsInputs'>
                                <Form.Label>Heavier than</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Heavier than..."
                                    name="weight_greaterThan"
                                    value={searchFormData.weight_greaterThan || ''}
                                    onChange={handleChange}
                                    className='number-input'
                                />
                            </div>
                            <div className='iconsInputs'>
                                <Form.Label>Lighter than</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Lighter than..."
                                    name="weight_lessThan"
                                    value={searchFormData.weight_lessThan || ''}
                                    onChange={handleChange}
                                    className='number-input'
                                />
                            </div>
                        </div>
                        <div className='color'>
                            <Form.Label>Color</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Color"
                                name="color"
                                value={searchFormData.color || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='my-pets'>
                            <Form.Label>My pets</Form.Label>
                            <Form.Check
                                type="checkbox"
                                label="Filter"
                                name="doFilter"
                                checked={searchFormData.doFilter || false}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowFilters(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSearchButtonClick}>
                        <FontAwesomeIcon icon={faSearch} /> Search
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default SearchPets;
