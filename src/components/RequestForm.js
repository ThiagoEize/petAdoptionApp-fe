import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useUserContext } from "../context/UserContext";

const RequestForm = ({ onClose }) => {
    const { token, userId, petId, requestType } = useUserContext();

    const [formData, setFormData] = useState({
        userId: userId,
        petId: petId,
        requestType: requestType,
        requestStatus: 'Pending',
        adoptionRequestMessage: ''
    });

    const title = () => {
        if (requestType === 'adopt') {
            return 'Adopt Pet';
        } else if (requestType === 'foster') {
            return 'Foster Pet';
        } else if (requestType === 'return') {
            return 'Return Pet';
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let res;
            res = await axios.post('http://localhost:8080/adoptionRequests', formData, { headers: { Authorization: `Bearer ${token}` } });
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
                    <h3>{title()}</h3>
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