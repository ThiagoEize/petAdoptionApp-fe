import { useState } from "react";
// import { Button } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

// const SignupForm = ({ show, onHide, onClose, headerText, isSubmitted, handleSubmit }) => {
const SignUpForm = ({ onClose }) => {
    const handleSignUp = async (e) => {
        // e.preventDefault();
        try {
            setFormData({ ...formData, permissionId: Number(formData?.permissionId) });
            console.log(formData);

            const res = await axios.post('http://localhost:8080/users/signup', formData)
            if (res.data.ok) {
                // navigate('/')
                console.log('ok')
            }
        } catch (err) {
            console.log(err);
        }
    };

    const [formData, setFormData] = useState({
        permissionId: null,
        email: '',
        password: '',
        repassword: '',
        userName: '',
        userLastName: '',
        phoneNumber: '',
        userBio: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="note-form-container">
            <form>
                {/* <Modal show={show} onHide={onHide}> */}
                <Modal.Header>
                    {/* <h3>{headerText}</h3> */}
                    <h3>Test</h3>
                </Modal.Header>
                <Modal.Body>
                    {/* <Form.Label>Permission ID</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Permission ID"
                        name="permissionId"
                        value={formData.permissionId}
                        onChange={handleChange}
                    /> */}
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="repassword"
                        value={formData.repassword}
                        onChange={handleChange}
                    />
                    {/* {(formData.password !== formData.repassword) && <span>Passwords do not match</span>} */}
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="First Name"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                    />
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Last Name"
                        name="userLastName"
                        value={formData.userLastName}
                        onChange={handleChange}
                    />
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Phone Number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Bio"
                        name="userBio"
                        value={formData.userBio}
                        onChange={handleChange}
                    />
                    {/* {(!formData.userBio && isSubmitted) && <span>You must write a bio</span>} */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => handleSignUp(formData)}>
                        Sign In
                    </Button>
                </Modal.Footer>
            </form >
        </div>

    );
};

export default SignUpForm;