import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import './PetSearch.css';
import { useUserContext } from "../../context/UserContext";
import { usePetContext } from "../../context/PetContext";
import { FaBeer } from "@react-icons/all-files/fa/FaBeer";
import axios from 'axios';

function SearchPets() {
    const { token } = useUserContext();
    const { petsList, setPetsList } = usePetContext();


    const [speciesList, setSpeciesList] = useState([]);

    const [breedsList, setBreedsList] = useState([]);

    const [filteredBreedsList, setFilteredBreedsList] = useState([]);

    const [filterAgeBy, setFilterAgeBy] = useState('<');
    const [filterHeightBy, setFilterHeightBy] = useState('<');
    const [filterWeightBy, setFilterWeightBy] = useState('<');

    const getSpeciesList = async () => {
        try {
            const res = await axios.get('http://localhost:8080/species', { headers: { Authorization: `Bearer ${token}` } });
            const species = res.data.data
            setSpeciesList(species);
        } catch (err) {
            console.log(err);
        }
    };

    const getBreedsList = async () => {
        try {
            const res = await axios.get('http://localhost:8080/breeds', { headers: { Authorization: `Bearer ${token}` } });
            const breeds = res.data.data
            setBreedsList(breeds);
            setFilteredBreedsList(breeds);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getSpeciesList()
        getBreedsList()
    }, [])

    const [searchFormData, setSearchFormData] = useState({
        breedId: '',
        petName: '',
        adoptionStatus: '',
        petAge: '',
        height: '',
        weight: '',
        color: ''
    });

    const handleSearch = async () => {
        let query = '';

        for (const [key, value] of Object.entries(searchFormData)) {
            if (value !== '') {
                if (key === 'petName' || key === 'color') {
                    query += `${query === '' ? '?' : '&'}${key}=%${value}%`;
                } else if (key === 'petAge') {
                    query += `${query === '' ? '?' : '&'}${key}=${filterAgeBy + value}`;
                } else if (key === 'height') {
                    query += `${query === '' ? '?' : '&'}${key}=${filterHeightBy + value}`;
                } else if (key === 'weight') {
                    query += `${query === '' ? '?' : '&'}${key}=${filterWeightBy + value}`;
                } else {
                    query += `${query === '' ? '?' : '&'}${key}=${value}`
                }
            }
        }

        console.log('this is the query', query);
        try {
            const res = await axios.get(`http://localhost:8080/pets${query}`, { headers: { Authorization: `Bearer ${token}` } });
            console.log(res.data.data);
            setPetsList(res.data.data);
        } catch (err) {
            console.log(err);
        }


    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        let newValue = value;
        if (name === 'specieId') {
            const newBreedList = breedsList.filter(breed => breed.specieId === parseInt(newValue) || !breed.specieId)
            setFilteredBreedsList(newBreedList);
        } else {
            setSearchFormData({ ...searchFormData, [name]: newValue });
        }
    };

    const handleAgeChange = (event) => {
        const { value } = event.target;
        setFilterAgeBy(value);
    };

    const handleHeightChange = (event) => {
        const { value } = event.target;
        setFilterHeightBy(value);
    };

    const handleWeightChange = (event) => {
        const { value } = event.target;
        setFilterWeightBy(value);
    };

    return (
        <div className="search-pets-container">
            <div className='specie'>
                <Form.Label>Specie</Form.Label>
                <Form.Control as="select" name="specieId" value={searchFormData.specieId} onChange={handleChange}>
                    <option value="">Select a specie</option>
                    {speciesList.map((specie) => (
                        <option key={specie.id} value={specie.id}>
                            {specie.specieName}
                        </option>
                    ))}
                </Form.Control>
            </div>
            <div className='breed'>
                <Form.Label>Breed</Form.Label>
                <Form.Control as="select" name="breedId" value={searchFormData.breedId} onChange={handleChange}>
                    <option value="">Select a breed</option>
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
                    placeholder="Pet Name"
                    name="petName"
                    value={searchFormData.petName}
                    onChange={handleChange}
                />
            </div>
            <div className='status'>
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" name="adoptionStatus" value={searchFormData.adoptionStatus} onChange={handleChange}>
                    <option value="">Select a status</option>
                    <option value="Available">Available</option>
                    <option value="Adopted">Adopted</option>
                    <option value="Fostered">Fostered</option>
                </Form.Control>
            </div>
            <div className='age'>
                <Form.Label>Age</Form.Label>
                <div className='iconsInputs'>
                    <Form.Control as="select" name="filterByAge" value={filterAgeBy} onChange={handleAgeChange}>
                        <option value="<">{"<="}</option>
                        <option value="">{"="}</option>
                        <option value=">">{">="}</option>
                    </Form.Control>
                    <Form.Control
                        type="text"
                        placeholder="Age"
                        name="petAge"
                        value={searchFormData.petAge}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className='height'>
                <Form.Label>Height</Form.Label>
                <div className='iconsInputs'>
                    <Form.Control as="select" name="filterByHeight" value={filterHeightBy} onChange={handleHeightChange}>
                        <option value="<">{"<="}</option>
                        <option value="">{"="}</option>
                        <option value=">">{">="}</option>
                    </Form.Control>
                    <Form.Control
                        type="text"
                        placeholder="Height"
                        name="height"
                        value={searchFormData.height}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className='weight'>
                <Form.Label>Weight</Form.Label>
                <div className='iconsInputs'>
                    <Form.Control as="select" name="filterByWeight" value={filterWeightBy} onChange={handleWeightChange}>
                        <option value="<">{"<="}</option>
                        <option value="">{"="}</option>
                        <option value=">">{">="}</option>
                    </Form.Control>
                    <Form.Control
                        type="text"
                        placeholder="Weight"
                        name="weight"
                        value={searchFormData.weight}
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
                    value={searchFormData.color}
                    onChange={handleChange}
                />
            </div>
            {/* <Button variant="secondary" onClick={handleReset}>
                    Reset
                </Button> */}
            <Button className="searchButton" variant="primary" onClick={handleSearch}>
                Search
            </Button>
        </div>
    );
}
export default SearchPets;