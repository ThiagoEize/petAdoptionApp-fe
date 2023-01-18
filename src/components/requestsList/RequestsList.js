import React, { useState, useEffect } from 'react';
import { useUserContext } from "../../context/UserContext";
import RequestsSearch from "../requestsSearch/RequestsSearch";
import axios from 'axios';
import './RequestsList.css'

const AdoptionRequests = () => {
    const { token, userId, petId, requestType, requestsList } = useUserContext();

    // const [requests, setRequests] = useState([]);

    // const getRequests = async () => {
    //     try {
    //         const res = await axios.get('http://localhost:8080/adoptionRequests', { headers: { Authorization: `Bearer ${token}` } });
    //         // setRequests(res.data.data)
    //         console.log(res.data.data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // useEffect(() => {
    //     getRequests()
    // }, [])

    const handleApprove = (request) => {

    };

    const handleReject = (request) => {
        // Handle reject logic here
    };

    return (
        <div className='requestList'>
            <RequestsSearch />
            {requestsList.map((request) => (
                <div key={request.id}>
                    <p>User Name: {request.userName}</p>
                    <p>Pet Name: {request.petName}</p>
                    <p>Request Message: {request.adoptionRequestMessage}</p>
                    <p>Request Status: {request.requestStatus}</p>
                    <p>Request Type: {request.requestType}</p>
                    <p>Date Created: {request.dateCreated}</p>
                    <button className='aprove-button'
                        onClick={() => handleApprove(request)}
                    >
                        Approve
                    </button>
                    <button className='reject-button'
                        onClick={() => handleReject(request)}
                    >
                        Reject
                    </button>
                </div>
            ))}
        </div>
    );
};

export default AdoptionRequests;