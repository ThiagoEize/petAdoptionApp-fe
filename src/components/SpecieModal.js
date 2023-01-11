import React from "react";
import { Modal } from "react-bootstrap";
import SpecieForm from "./SpecieForm";
// import { useState } from "react";

function SpecieModal({ visible, onClose }) {
    // const handleSubmit = (Specie) => {
    //     // onSubmit(Specie);
    //     onClose();
    // }

    return (
        <Modal show={visible} onHide={onClose}>
            <Modal.Body>
                {/* <SpecieForm Specie={Specie} onSubmit={(Specie) => handleSubmit(Specie)} /> */}
                <SpecieForm onClose={onClose} />
            </Modal.Body>
        </Modal>
    )
}

export default SpecieModal;