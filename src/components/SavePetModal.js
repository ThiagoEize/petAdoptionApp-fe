import React from "react";
import { Modal } from "react-bootstrap";
import SavePetForm from "./SavePetForm";
// import { useState } from "react";

function SavePetModal({ visible, onClose }) {

    return (
        <Modal show={visible} onHide={onClose}>
            <Modal.Body>
                {/* <SignupForm SignUp={SignUp} onSubmit={(SignUp) => handleSubmit(SignUp)} /> */}
                <SavePetForm onClose={onClose} />
            </Modal.Body>
        </Modal>
    )
}

export default SavePetModal;