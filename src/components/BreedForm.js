import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useUserContext } from "../context/UserContext";

const BreedForm = ({ onClose, initialData = {} }) => {
    const { token } = useUserContext();

    const [speciesList, setSpeciesList] = useState([]);

    const getSpeciesList = async () => {
        try {
            const res = await axios.get('http://localhost:8080/species', { headers: { Authorization: `Bearer ${token}` } });
            const species = [{ id: '', specieName: 'Select a specie...' }, ...res.data.data]
            setSpeciesList(species);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getSpeciesList()
    }, [])

    const [formData, setFormData] = useState({
        specieId: initialData.specieId || '',
        breedName: initialData.breedName || '',
        isHypoallergenic: initialData.isHypoallergenic || false,
    });

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let res;
            formData.specieId = parseInt(formData.specieId);
            if (initialData.id) {
                // Make a put request to your server to update the breed in the database
                res = await axios.put(`http://localhost:8080/breeds/${initialData.id}`, formData, { headers: { Authorization: `Bearer ${token}` } });
            } else {
                // Make a post request to your server to add the breed to the database
                res = await axios.post('http://localhost:8080/breeds', formData, { headers: { Authorization: `Bearer ${token}` } });
            }

            if (res.data.success) {
                // The breed was successfully added or updated
                onClose();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        let newValue = value;
        // let specieId = value
        if (type === "checkbox") {
            newValue = event.target.checked
        }
        setFormData({ ...formData, [name]: newValue });
    };

    return (
        <div className="breed-form-container">
            <form>
                <Modal.Header>
                    <h3>{initialData.id ? 'Edit Breed' : 'Add Breed'}</h3>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Specie Name</Form.Label>
                    <Form.Control as="select" name="specieId" value={formData.specieId} onChange={handleChange}>
                        {speciesList.map((specie) => (
                            <option key={specie.id} value={specie.id}>
                                {specie.specieName}
                            </option>
                        ))}
                    </Form.Control>
                    <Form.Label>Breed Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Breed Name"
                        name="breedName"
                        value={formData.breedName}
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Is Hypoallergenic?"
                        name="isHypoallergenic"
                        checked={formData.isHypoallergenic}
                        onChange={handleChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        {initialData.id ? 'Save Changes' : 'Add Breed'}
                    </Button>
                </Modal.Footer>
            </form>
        </div>
    );
};

export default BreedForm;