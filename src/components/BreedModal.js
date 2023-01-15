import React from "react";
import { Modal } from "react-bootstrap";
import BreedForm from "./BreedForm";
// import { useState } from "react";

function BreedModal({ visible, onClose, initialData }) {

    return (
        <Modal show={visible} onHide={onClose}>
            <Modal.Body>
                {/* <BreedForm Breed={Breed} onSubmit={(Breed) => handleSubmit(Breed)} /> */}
                <BreedForm initialData={initialData} onClose={onClose} />
            </Modal.Body>
        </Modal>
    )
}

export default BreedModal;