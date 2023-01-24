import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useUserContext } from "../context/UserContext";
import { usePetContext } from "../context/PetContext";

const SavePetForm = ({ onClose }) => {
    const { token, userId, petId, requestType } = useUserContext();
    const { setSavedPetsList } = usePetContext();

    const [formData, setFormData] = useState({
        userId: userId,
        petId: petId,
        personalComentary: ''
    });

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let res;
            res = await axios.post('http://localhost:8080/savedPets', formData, { headers: { Authorization: `Bearer ${token}` } });
            if (res.data.success) {
                console.log('arrived here');
                setSavedPetsList((prev) => [...prev, petId])
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
                    <h3>Save Pet</h3>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Why do you want to  the pet"
                        name="personalComentary"
                        value={formData.personalComentary}
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

export default SavePetForm;