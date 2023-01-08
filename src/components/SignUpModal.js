import React from "react";
import { Modal } from "react-bootstrap";
import SignUpForm from "./SignUpForm";
// import { useState } from "react";

function SignUpModal({ visible, onClose }) {
    // const handleSubmit = (SignUp) => {
    //     // onSubmit(SignUp);
    //     onClose();
    // }

    return (
        <Modal show={visible} onHide={onClose}>
            <Modal.Body>
                {/* <SignupForm SignUp={SignUp} onSubmit={(SignUp) => handleSubmit(SignUp)} /> */}
                <SignUpForm onClose={onClose} />
            </Modal.Body>
        </Modal>
    )
}

export default SignUpModal;