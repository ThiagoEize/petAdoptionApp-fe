import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const SpeciesForm = ({ onClose, initialData = {} }) => {
    const [formData, setFormData] = useState({
        specieName: initialData.specieName || '',
        dateCreated: initialData.dateCreated || '',
    });

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let res;
            if (initialData.id) {
                // Make a put request to your server to update the species in the database
                res = await axios.put(`http://localhost:8080/species/${initialData.id}`, formData);
            } else {
                // Make a post request to your server to add the species to the database
                res = await axios.post('http://localhost:8080/species', formData);
            }

            if (res.data.ok) {
                // The species was successfully added or updated
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
                    <h3>{initialData.id ? 'Edit Species' : 'Add Species'}</h3>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Specie Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Specie Name"
                        name="specieName"
                        value={formData.specieName}
                        onChange={handleChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        {initialData.id ? 'Save Changes' : 'Add Species'}
                    </Button>
                </Modal.Footer>
            </form>
        </div>
    );
};

export default SpeciesForm;