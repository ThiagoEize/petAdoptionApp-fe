import React, { useState, useEffect } from 'react';
import { useUserContext } from "../../context/UserContext";
import RequestsSearch from "../requestsSearch/RequestsSearch";
import axios from 'axios';
import './RequestsList.css'

const AdoptionRequests = () => {
    const { token, userId, petId, requestType, requestsList, setRequestsList } = useUserContext();

    const handleApprove = async (request) => {
        if (request.requestType !== 'return') {
            try {
                const rejects = await axios.get(`http://localhost:8080/adoptionRequests?petId=${request.petId}`, { headers: { Authorization: `Bearer ${token}` } });
                for (let i = 0; i < rejects.data.data.length; i++) {
                    await axios.put(`http://localhost:8080/adoptionRequests/${rejects.data.data[i].id}`, { "requestStatus": "Rejected" }, { headers: { Authorization: `Bearer ${token}` } });
                }
                const aproved = await axios.put(`http://localhost:8080/adoptionRequests/${request.id}`, { "requestStatus": "Aproved" }, { headers: { Authorization: `Bearer ${token}` } });
                const pet = await axios.put(`http://localhost:8080/pets/aprove/${request.petId}`, { "userId": request.userId, "adoptionStatus": request.requestType === "adopt" ? "Adopted" : "Fostered" }, { headers: { Authorization: `Bearer ${token}` } });

                const filteredRequests = requestsList.filter(item => item.petId !== request.petId)
                setRequestsList(filteredRequests)
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const aproved = await axios.put(`http://localhost:8080/adoptionRequests/${request.id}`, { "requestStatus": "Aproved" }, { headers: { Authorization: `Bearer ${token}` } });
                const pet = await axios.put(`http://localhost:8080/pets/aprove/${request.petId}`, { "userId": null, "adoptionStatus": "Available" }, { headers: { Authorization: `Bearer ${token}` } });
                const filteredRequests = requestsList.filter(item => item.petId !== request.petId)
                setRequestsList(filteredRequests)
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleReject = async (request) => {
        try {
            await axios.put(`http://localhost:8080/adoptionRequests/${request.id}`, { "requestStatus": "Rejected" }, { headers: { Authorization: `Bearer ${token}` } });
            const filteredRequests = requestsList.filter(item => item.id !== request.id)
            setRequestsList(filteredRequests)
        } catch (err) {
            console.log(err);
        }
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