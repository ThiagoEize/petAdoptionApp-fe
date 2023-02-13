import React, { useState, useEffect } from 'react';
import { useUserContext } from "../../context/UserContext";
import UsersSearch from "../usersSearch/UsersSearch";
import Users from "../user/User";
import axios from 'axios';
import './UsersList.css'

const UsersList = () => {
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
        const { thisUser, name, value, type } = e.target;

        const updatedUserIndex = usersList.findIndex(user => user.id === thisUser)

        const currentUsers = usersList
    };

    const handleSave = async (user) => {

    };

    return (
        <div className='userList'>
            <UsersSearch />
            {usersList.map((user) => (
                <div key={user.id}>
                    <Users initialData={user} />
                </div>
            ))}
        </div>
    );
};

export default UsersList;