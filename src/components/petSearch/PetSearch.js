import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './PetSearch.css';
import { useUserContext } from "../../context/UserContext";
import { usePetContext } from "../../context/PetContext";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SearchPets() {
    const { token, userId } = useUserContext();
    const { pagination, setPagination, handleSearch, searchFormData, setSearchFormData, filters, setFilters } = usePetContext();
    const { saved } = useParams();

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
        // handleSearch(page, limit, searchFormData);
        if (saved) {
            handleSearch(pagination.currentPage, 9, {
                ...searchFormData,
                ['savedPets.userId']: String(userId)
            });
        } else {
            handleSearch(pagination.currentPage, 9, searchFormData);
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

    const handleAgeChange = (event) => {
        const { value } = event.target;
        setFilters({ ...filters, filterAgeBy: value });
    };

    const handleHeightChange = (event) => {
        const { value } = event.target;
        setFilters({ ...filters, filterHeightBy: value });
    };

    const handleWeightChange = (event) => {
        const { value } = event.target;
        setFilters({ ...filters, filterWeightBy: value });
    };

    const handleSearchButtonClick = () => {
        setPagination({ ...pagination, currentPage: 1 }); // Reset to first page on new search
        handleSearchWithPagination(1);
    };

    return (
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
                    <Form.Control as="select" name="filterByAge" value={filters.filterAgeBy} onChange={handleAgeChange}>
                        <option value="<">{"<="}</option>
                        <option value="">{"="}</option>
                        <option value=">">{">="}</option>
                    </Form.Control>
                    <Form.Control
                        type="text"
                        placeholder="Age"
                        name="petAge"
                        value={searchFormData.petAge || ''}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className='height'>
                <Form.Label>Height</Form.Label>
                <div className='iconsInputs'>
                    <Form.Control as="select" name="filterByHeight" value={filters.filterHeightBy} onChange={handleHeightChange}>
                        <option value="<">{"<="}</option>
                        <option value="">{"="}</option>
                        <option value=">">{">="}</option>
                    </Form.Control>
                    <Form.Control
                        type="text"
                        placeholder="Height"
                        name="height"
                        value={searchFormData.height || ''}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className='weight'>
                <Form.Label>Weight</Form.Label>
                <div className='iconsInputs'>
                    <Form.Control as="select" name="filterByWeight" value={filters.filterWeightBy} onChange={handleWeightChange}>
                        <option value="<">{"<="}</option>
                        <option value="">{"="}</option>
                        <option value=">">{">="}</option>
                    </Form.Control>
                    <Form.Control
                        type="text"
                        placeholder="Weight"
                        name="weight"
                        value={searchFormData.weight || ''}
                        onChange={handleChange}
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
            <div className='color'>
                <Form.Label>My pets</Form.Label>
                <Form.Check
                    type="checkbox"
                    label="Filter"
                    name="doFilter"
                    checked={searchFormData.doFilter || false}
                    onChange={handleChange}
                />
            </div>
            <Button className="searchButton" variant="primary" onClick={handleSearchButtonClick}>
                Search
            </Button>
        </div>
    );
}

export default SearchPets;