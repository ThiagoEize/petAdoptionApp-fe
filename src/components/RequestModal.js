import React from "react";
import { Modal } from "react-bootstrap";
import RequestForm from "./RequestForm";
// import { useState } from "react";

function RequestModal({ visible, onClose }) {

    return (
        <Modal show={visible} onHide={onClose}>
            <Modal.Body>
                {/* <SignupForm SignUp={SignUp} onSubmit={(SignUp) => handleSubmit(SignUp)} /> */}
                <RequestForm onClose={onClose} />
            </Modal.Body>
        </Modal>
    )
}

export default RequestModal;