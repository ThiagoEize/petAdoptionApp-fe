import React, { useState, useEffect } from 'react';
import { useUserContext } from "../../context/UserContext";
import UsersSearch from "../usersSearch/UsersSearch";
import axios from 'axios';

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
                userBio: initialData.userBio
            }
            :
            {}
    )

    const { token, userId, petId, userType, usersList, setUsersList } = useUserContext();

    const [permissionsList, setPermissionsList] = useState([]);

    const getPermissionsList = async () => {
        try {
            const res = await axios.get('http://localhost:8080/permissions', { headers: { Authorization: `Bearer ${token}` } });
            if (res.data.data.length > 0) {
                // const permissions = [{ id: '', permissionName: 'Select a permission...' }, ...res.data.data]
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
        const { name, value, type } = e.target;
        let newValue = value
        if (name === 'permissionId') {
            newValue = parseInt(value)
        }
        setUser({ ...user, [name]: newValue });
    };

    const handleSave = async () => {
        try {
            const res = await axios.put(`http://localhost:8080/users/${initialData.id}`, user, { headers: { Authorization: `Bearer ${token}` } })
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <p>User Name: {user.userName}</p>
            <p>User Last Name: {user.userLastName}</p>
            <p>User Phone Number: {user.phoneNumber}</p>
            <p>
                User Permissions:
                <select type='select' name='permissionId' value={user.permissionId} onChange={handleChange}>
                    {permissionsList.map((permission) => (
                        <option key={permission.id} value={permission.id}>
                            {' ' + permission.permissionName}
                        </option>
                    ))}
                </select>
            </p>
            <p>Date Created: {user.dateCreated}</p>
            <button className='aprove-button'
                onClick={handleSave}
            >
                Save
            </button>
        </div>
    )
}

export default User;