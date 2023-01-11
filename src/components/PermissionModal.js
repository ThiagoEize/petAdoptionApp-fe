import React from "react";
import { Modal } from "react-bootstrap";
import PermissionForm from "./PermissionForm";
// import { useState } from "react";

function PermissionModal({ visible, onClose }) {
    // const handleSubmit = (Permission) => {
    //     // onSubmit(Permission);
    //     onClose();
    // }

    return (
        <Modal show={visible} onHide={onClose}>
            <Modal.Body>
                {/* <PermissionForm Permission={Permission} onSubmit={(Permission) => handleSubmit(Permission)} /> */}
                <PermissionForm onClose={onClose} />
            </Modal.Body>
        </Modal>
    )
}

export default PermissionModal;