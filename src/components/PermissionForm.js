import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useUserContext } from "../context/UserContext";

const PermissionsForm = ({ onClose, initialData = {} }) => {
    const { token } = useUserContext();

    const [formData, setFormData] = useState({
        permissionName: initialData.permissionName || '',
        canEditCreateAdmins: initialData.canEditCreateAdmins || false,
        canEditUsersPermissions: initialData.canEditUsersPermissions || false,
        canAcceptAdoptionRequests: initialData.canAcceptAdoptionRequests || false,
        canAdoptFosterPets: initialData.canAdoptFosterPets || false,
        canAdoptPets: initialData.canAdoptPets || false
    });

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let res;
            if (initialData.id) {
                // Make a put request to your server to update the permission in the database
                res = await axios.put(`http://localhost:8080/permissions/${initialData.id}`, formData, { headers: { Authorization: `Bearer ${token}` } });
            } else {
                // Make a post request to your server to add the permission to the database
                console.log(formData)
                res = await axios.post('http://localhost:8080/permissions', formData, { headers: { Authorization: `Bearer ${token}` } });
            }

            if (res.data.ok) {
                // The permission was successfully added or updated
                onClose();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        let newValue = value;
        if (type === "checkbox") {
            newValue = event.target.checked
        }
        setFormData({ ...formData, [name]: newValue });
    };

    return (
        <div className="permissions-form-container">
            <form>
                <Modal.Header>
                    <h3>{initialData.id ? 'Edit Permission' : 'Add Permission'}</h3>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Permission Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Permission Name"
                        name="permissionName"
                        value={formData.permissionName}
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Can Edit/Create Admins"
                        name="canEditCreateAdmins"
                        checked={formData.canEditCreateAdmins}
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Can Edit Users Permissions"
                        name="canEditUsersPermissions"
                        checked={formData.canEditUsersPermissions}
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Can Accept Adoption Requests"
                        name="canAcceptAdoptionRequests"
                        checked={formData.canAcceptAdoptionRequests}
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Can Adopt/Foster Pets"
                        name="canAdoptFosterPets"
                        checked={formData.canAdoptFosterPets}
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Can Adopt Pets"
                        name="canAdoptPets"
                        checked={formData.canAdoptPets}
                        onChange={handleChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </form>
        </div>
    );
}

export default PermissionsForm;