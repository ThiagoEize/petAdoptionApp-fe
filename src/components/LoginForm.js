import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LogInForm = ({ onClose, setToken, setUserId }) => {
    const navigate = useNavigate()

    const handleLogIn = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post('http://localhost:8080/users/login', formData)
            // const res = await axios.post('http://localhost:8080/users/login', formData, { withCredentials: true });
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                setToken(res.data.token);
                localStorage.setItem('userId', res.data.id);
                setUserId(res.data.id);
                navigate("/");
                onClose();
            }
            if (res.data.success) {
                // setCurrentUser(res.data.userId)
                navigate("/")
            }
        } catch (err) {
            console.log(err);
        }
    };

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="note-form-container">
            <form>
                <Modal.Header>
                    <h3>Log In</h3>
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleLogIn}>
                        Log In
                    </Button>
                </Modal.Footer>
            </form>
        </div>
    );
};

export default LogInForm;