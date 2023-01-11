import React from "react";
import { Modal } from "react-bootstrap";
import SavedPetForm from "./SavedPetForm";
// import { useState } from "react";

function SavedPetModal({ visible, onClose }) {
    // const handleSubmit = (SavedPet) => {
    //     // onSubmit(SavedPet);
    //     onClose();
    // }

    return (
        <Modal show={visible} onHide={onClose}>
            <Modal.Body>
                {/* <SavedPetForm SavedPet={SavedPet} onSubmit={(SavedPet) => handleSubmit(SavedPet)} /> */}
                <SavedPetForm onClose={onClose} />
            </Modal.Body>
        </Modal>
    )
}

export default SavedPetModal;