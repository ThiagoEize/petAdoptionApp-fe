import React, { useState, useEffect } from 'react';
import { useUserContext } from "../../context/UserContext";
import axios from 'axios';
import './User.css';

const User = ({ initialData }) => {
    const [user, setUser] = useState(
        initialData ?
            {
                userName: initialData.userName,
                userLastName: initialData.userLastName,
                phoneNumber: initialData.phoneNumber,
                permissionId: initialData.permissionId,
                email: initialData.email,
                password: initialData.password,
                userBio: initialData.userBio,
                dateCreated: initialData.dateCreated // Added dateCreated
            }
            :
            {}
    );

    const { token } = useUserContext();

    const [permissionsList, setPermissionsList] = useState([]);

    const getPermissionsList = async () => {
        try {
            const res = await axios.get('http://localhost:8080/permissions', { headers: { Authorization: `Bearer ${token}` } });
            if (res.data.data.length > 0) {
                setPermissionsList(res.data.data);
            } else {
                console.log('No permission');
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getPermissionsList()
    }, [])

    const handleChange = async (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let newValue = value;
        if (name === 'permissionId') {
            newValue = parseInt(value);
        }
        setUser({ ...user, [name]: newValue });
    };

    const handleSave = async () => {
        if (window.confirm("Are you sure you want to alter this user permission?")) {
            try {
                const res = await axios.put(`http://localhost:8080/users/${initialData.id}`, user, { headers: { Authorization: `Bearer ${token}` } });
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className='user-container'>
            <div className='user-row'>
                <span>User Name:</span>
                <span>User Last Name:</span>
                <span>User Phone Number:</span>
                <span>Date Created:</span>
                <span>User Permissions:</span>
            </div>
            <div className='user-row'>
                <p>{user.userName}</p>
                <p>{user.userLastName}</p>
                <p>{user.phoneNumber}</p>
                <p>{user.dateCreated}</p>
                <select name='permissionId' value={user.permissionId} onChange={handleChange}>
                    {permissionsList.map((permission) => (
                        <option key={permission.id} value={permission.id}>
                            {' ' + permission.permissionName}
                        </option>
                    ))}
                </select>
            </div>
            <button className='change-permission-button' onClick={handleSave}>
                Alter user permissions
            </button>
        </div>
    )
}

export default User;
