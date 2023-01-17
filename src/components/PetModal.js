import React from "react";
import { Modal } from "react-bootstrap";
import PetForm from "./PetForm";
// import { useState } from "react";

function PetModal({ visible, onClose, initialData }) {
    // const handleSubmit = (Pet) => {
    //     // onSubmit(Pet);
    //     onClose();
    // }

    return (
        <Modal show={visible} onHide={onClose}>
            <Modal.Body>
                {/* <PetForm Pet={Pet} onSubmit={(Pet) => handleSubmit(Pet)} /> */}
                <PetForm onClose={onClose} initialData={initialData} />
            </Modal.Body>
        </Modal>
    )
}

export default PetModal;