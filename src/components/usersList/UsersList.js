import React, { useState, useEffect } from 'react';
import { useUserContext } from "../../context/UserContext";
import UsersSearch from "../usersSearch/UsersSearch";
import Users from "../user/User";
import axios from 'axios';
import './UsersList.css'

const UsersList = () => {
    const { usersList } = useUserContext();

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