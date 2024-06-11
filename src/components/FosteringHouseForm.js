import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useUserContext } from "../context/UserContext";

const FosteringHouseForm = ({ onClose, initialData = {} }) => {
    const { token, userId } = useUserContext();

    const [formData, setFormData] = useState({
        fosteringHouseName: initialData.fosteringHouseName || '',
        phoneNumber: initialData.phoneNumber || '',
        email: initialData.email || '',
        avaluationNumbers: initialData.avaluationNumbers || 0,
        score: initialData.score || 0,
        street: initialData.street || '',
        number: initialData.number || '',
        neighborhood: initialData.neighborhood || '',
        postalCode: initialData.postalCode || '',
        city: initialData.city || '',
        country: initialData.country || ''
    });

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let res;
            if (initialData.id) {
                // Make a put request to your server to update the fostering house in the database
                res = await axios.put(`http://localhost:8080/fosteringHouses/${initialData.id}`, formData, { headers: { Authorization: `Bearer ${token}` } });
            } else {
                // Make a post request to your server to add the fostering house to the database
                res = await axios.post('http://localhost:8080/fosteringHouses', formData, { headers: { Authorization: `Bearer ${token}` } });
                const newPermission = {
                    canAcceptAdoptionRequests: true, canAdoptFosterPets: true, canAdoptPets: true, canEditCreateAdmins: true, canEditCreatePets: true, canEditUsersPermissions: true, fosteringHouseId: res.data.data.id, permissionName: "Supreme"
                }
                res = await axios.post('http://localhost:8080/permissions', newPermission, { headers: { Authorization: `Bearer ${token}` } });


                await axios.put(`http://localhost:8080/users/${userId}`, { permissionId: res.data.data.id }, { headers: { Authorization: `Bearer ${token}` } });
            }

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
        <div className="fostering-house-form-container">
            <form>
                <Modal.Header>
                    <h3>{initialData.id ? 'Edit Fostering House' : 'Add Fostering House'}</h3>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Fostering House Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Fostering House Name"
                            name="fosteringHouseName"
                            value={formData.fosteringHouseName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Avaluation Numbers</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Avaluation Numbers"
                            name="avaluationNumbers"
                            value={formData.avaluationNumbers}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Score</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Score"
                            name="score"
                            value={formData.score}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Street"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Number"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Neighborhood</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Neighborhood"
                            name="neighborhood"
                            value={formData.neighborhood}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Postal Code"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        {initialData.id ? 'Save Changes' : 'Add Fostering House'}
                    </Button>
                </Modal.Footer>
            </form>
        </div>
    );
};

export default FosteringHouseForm;
