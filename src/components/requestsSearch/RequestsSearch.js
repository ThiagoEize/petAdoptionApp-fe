import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useUserContext } from "../../context/UserContext";
import axios from 'axios';

import './RequestsSearch.css';

function RequestSearch() {
    const { token, setRequestsList } = useUserContext();

    const [searchFormData, setSearchFormData] = useState({
        userName: '',
        petName: '',
        requestType: '',
        requestStatus: 'Pending'
    });

    useEffect(() => {
        handleSearch();
    }, []);

    const handleSearch = async () => {
        let query = '';

        for (const [key, value] of Object.entries(searchFormData)) {
            if (value !== '') {
                if (key === 'petName' || key === 'userName') {
                    query += `${query === '' ? '?' : '&'}${key}=${value}`;
                } else {
                    query += `${query === '' ? '?' : '&'}${key}=${value}`
                }
            }
        }

        try {
            const res = await axios.get(`http://localhost:8080/adoptionRequests${query}`, { headers: { Authorization: `Bearer ${token}` } });
            setRequestsList(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearchFormData({ ...searchFormData, [name]: value });
    };

    return (
        <div className="search-requests-container">
            <div className='name'>
                <Form.Label>User Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="User Name"
                    name="userName"
                    value={searchFormData.userName}
                    onChange={handleChange}
                />
            </div>
            <div className='name'>
                <Form.Label>Pet Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Pet Name"
                    name="petName"
                    value={searchFormData.petName}
                    onChange={handleChange}
                />
            </div>
            <div className='status'>
                <Form.Label>Request Status</Form.Label>
                <Form.Control as="select" name="requestStatus" value={searchFormData.requestStatus} onChange={handleChange}>
                    <option value="">Select a request status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </Form.Control>
            </div>
            <div className='status'>
                <Form.Label>Request Type</Form.Label>
                <Form.Control as="select" name="requestType" value={searchFormData.requestType} onChange={handleChange}>
                    <option value="">Select a request type</option>
                    <option value="adopt">Adopt</option>
                    <option value="foster">Foster</option>
                    <option value="return">Return</option>
                </Form.Control>
            </div>
            <Button className="searchButton" variant="primary" onClick={handleSearch}>
                Search
            </Button>
        </div>
    );
}

export default RequestSearch;
