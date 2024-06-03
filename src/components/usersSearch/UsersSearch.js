import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import { useUserContext } from "../../context/UserContext";
import { usePetContext } from "../../context/PetContext";
import { FaBeer } from "@react-icons/all-files/fa/FaBeer";
import axios from 'axios';

import './UsersSearch.css';

function UserSearch() {
    const { token, usersList, setUsersList } = useUserContext();

    const [permissionsList, setPermissionsList] = useState([]);

    const getPermissionsList = async () => {
        try {
            const res = await axios.get('http://localhost:8080/permissions', { headers: { Authorization: `Bearer ${token}` } });
            const permissions = [{ id: '', permissionName: 'Select a permission...' }, ...res.data.data]
            setPermissionsList(permissions);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getPermissionsList()
    }, [])

    const [searchFormData, setSearchFormData] = useState({
        userName: '',
        userLastName: '',
        permissionId: ''
    });

    const handleSearch = async () => {
        let query = '';

        for (const [key, value] of Object.entries(searchFormData)) {
            if (value !== '') {
                if (key === 'userName' || key === 'userLastName') {
                    query += `${query === '' ? '?' : '&'}${key}=${value}`;
                } else {
                    query += `${query === '' ? '?' : '&'}${key}=${value}`
                }
            }
        }

        try {
            const res = await axios.get(`http://localhost:8080/users${query}`, { headers: { Authorization: `Bearer ${token}` } });
            setUsersList(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearchFormData({ ...searchFormData, [name]: value });
    };

    return (
        <div className="search-users-container">
            <div className='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Name"
                    name="userName"
                    value={searchFormData.userName}
                    onChange={handleChange}
                />
            </div>
            <div className='name'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="userLastName"
                    value={searchFormData.userLastName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <Form.Label>Permission</Form.Label>
                <Form.Control as="select" name="permissionId" value={searchFormData.permissionId} onChange={handleChange}>
                    {permissionsList.map((permission) => (
                        <option key={permission.id} value={permission.id}>
                            {permission.permissionName}
                        </option>
                    ))}
                </Form.Control>
            </div>
            <Button className="searchButton" variant="primary" onClick={handleSearch}>
                Search
            </Button>
        </div>
    );
}
export default UserSearch;