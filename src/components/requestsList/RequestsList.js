import React, { useState, useEffect } from 'react';
import { useUserContext } from "../../context/UserContext";
import RequestsSearch from "../requestsSearch/RequestsSearch";
import axios from 'axios';
import './RequestsList.css';

const AdoptionRequests = () => {
    const { token, userId, petId, requestType, requestsList, setRequestsList } = useUserContext();

    const handleApprove = async (request) => {
        if (window.confirm("Are you sure you want to aprove this request?")) {
            if (request.requestType !== 'return') {
                try {
                    const rejects = await axios.get(`http://localhost:8080/adoptionRequests?petId=${request.petId}`, { headers: { Authorization: `Bearer ${token}` } });
                    for (let i = 0; i < rejects.data.data.length; i++) {
                        await axios.put(`http://localhost:8080/adoptionRequests/${rejects.data.data[i].id}`, { "requestStatus": "Rejected" }, { headers: { Authorization: `Bearer ${token}` } });
                    }
                    await axios.put(`http://localhost:8080/adoptionRequests/${request.id}`, { "requestStatus": "Aproved" }, { headers: { Authorization: `Bearer ${token}` } });
                    await axios.put(`http://localhost:8080/pets/aprove/${request.petId}`, { "userId": request.userId, "adoptionStatus": request.requestType === "adopt" ? "Adopted" : "Fostered" }, { headers: { Authorization: `Bearer ${token}` } });

                    const filteredRequests = requestsList.filter(item => item.petId !== request.petId)
                    setRequestsList(filteredRequests)
                } catch (err) {
                    console.log(err);
                }
            } else {
                try {
                    await axios.put(`http://localhost:8080/adoptionRequests/${request.id}`, { "requestStatus": "Aproved" }, { headers: { Authorization: `Bearer ${token}` } });
                    await axios.put(`http://localhost:8080/pets/aprove/${request.petId}`, { "userId": null, "adoptionStatus": "Available" }, { headers: { Authorization: `Bearer ${token}` } });
                    const filteredRequests = requestsList.filter(item => item.petId !== request.petId)
                    setRequestsList(filteredRequests)
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };

    const handleReject = async (request) => {
        if (window.confirm("Are you sure you want to reject this request?")) {
            try {
                await axios.put(`http://localhost:8080/adoptionRequests/${request.id}`, { "requestStatus": "Rejected" }, { headers: { Authorization: `Bearer ${token}` } });
                const filteredRequests = requestsList.filter(item => item.id !== request.id)
                setRequestsList(filteredRequests)
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className='requestList'>
            <RequestsSearch />
            {requestsList.map((request) => (

                <div key={request.id}>
                    <div className="titles">
                        <p>User Name:</p>
                        <p>Pet Name:</p>
                        <p>Request status:</p>
                        <p>Request type:</p>
                        <p>Date created:</p>
                        <button className='approve-button'
                            onClick={() => handleApprove(request)}
                        >
                            Approve
                        </button>
                    </div>
                    <p>{request.userName}</p>
                    <p>{request.petName}</p>
                    <p>{request.requestStatus}</p>
                    <p>{request.requestType}</p>
                    <p>{request.dateCreated}</p>
                    <button className='reject-button'
                        onClick={() => handleReject(request)}
                    >
                        Reject
                    </button>
                    <div className='request-message'>
                        <p><strong>Request Message: {request.adoptionRequestMessage}</strong></p>
                    </div>

                </div>


            ))}
        </div>
    );
};

export default AdoptionRequests;
