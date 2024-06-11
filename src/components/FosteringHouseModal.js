import React from "react";
import { Modal } from "react-bootstrap";
import FosteringHouseForm from "./FosteringHouseForm";

function FosteringHouseModal({ visible, onClose, initialData }) {
    return (
        <Modal show={visible} onHide={onClose}>
            <Modal.Body>
                <FosteringHouseForm onClose={onClose} initialData={initialData} />
            </Modal.Body>
        </Modal>
    )
}

export default FosteringHouseModal;
