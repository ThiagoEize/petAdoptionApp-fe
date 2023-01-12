import React from "react";
import { Modal } from "react-bootstrap";
import LogInForm from "./LogInForm";
// import { useState } from "react";

function LogInModal({ visible, onClose, setToken }) {
    // const handleSubmit = (LogIn) => {
    //     // onSubmit(LogIn);
    //     onClose();
    // }

    return (
        <Modal show={visible} onHide={onClose}>
            <Modal.Body>
                {/* <SignupForm LogIn={LogIn} onSubmit={(LogIn) => handleSubmit(LogIn)} /> */}
                <LogInForm onClose={onClose} setToken={setToken} />
            </Modal.Body>
        </Modal>
    )
}

export default LogInModal;