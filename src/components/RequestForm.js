import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useUserContext } from "../context/UserContext";

const RequestForm = ({ onClose, petId }) => {
    const { token, userId, requestType } = useUserContext();

    const [formData, setFormData] = useState({
        userId: userId,
        petId: petId,
        requestType: requestType,
        adoptionRequestMessage: ''
    });

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let res;

            res = await axios.post('http://localhost:8080/species', formData, { headers: { Authorization: `Bearer ${token}` } });


            if (res.data.success) {
                onClose();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="species-form-container">
            <form>
                <Modal.Header>
                    <h3>{true ? 'Adopt Pet' : 'Return Pet'}</h3>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Why do you want to  the pet"
                        name="adoptionRequestMessage"
                        value={formData.adoptionRequestMessage}
                        onChange={handleChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Send Request
                    </Button>
                </Modal.Footer>
            </form>
        </div>
    );
};

export default RequestForm;