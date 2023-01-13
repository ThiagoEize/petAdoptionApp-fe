import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useUserContext } from "../context/UserContext";

const PetForm = ({ onClose, breeds = [], users = [], initialData = {} }) => {
  const { token } = useUserContext();

  const [formData, setFormData] = useState({
    breedId: initialData.breedId || '',
    userId: initialData.userId || '',
    petName: initialData.petName || '',
    adoptionStatus: initialData.adoptionStatus || '',
    picture: initialData.picture || '',
    petAge: initialData.petAge || '',
    height: initialData.height || '',
    weight: initialData.weight || '',
    color: initialData.color || '',
  });
  const [pictureFile, setPictureFile] = useState(null);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let res;
      if (initialData.id) {
        // Make a put request to your server to update the pet in the database
        res = await axios.put(`http://localhost:8080/pets/${initialData.id}`, {
          ...formData,
          pictureFile
        });
      } else {
        // Make a post request to your server to add the pet to the database
        res = await axios.post('http://localhost:8080/pets', {
          ...formData,
          pictureFile
        });
      }

      if (res.data.ok) {
        // The pet was successfully added or updated
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

  const handleFileChange = (event) => {
    setPictureFile(event.target.files[0]);
  }

  return (
    <div className="pet-form-container">
      <form>
        <Modal.Header>
          <h3>{initialData.id ? 'Edit Pet' : 'Add Pet'}</h3>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            {/* <Form.Label>Picture</Form.Label> */}
            {/* <Form.Control
              type="text"
              placeholder="URL of pet picture"
              name="picture"
              value={formData.picture}
              onChange={handleChange}
            /> */}
            <Button variant="secondary" onClick={() => document.getElementById("picture-input").click()}>Select a image</Button>
            <input type="file" id="picture-input" style={{ display: "none" }} onChange={handleFileChange} />
            <div>
              {pictureFile && <img src={URL.createObjectURL(pictureFile)} alt="Selected" width="200" height="200" style={{ marginTop: '10px' }} />}
            </div>
          </Form.Group>
          <Form.Label>Breed Name</Form.Label>
          <Form.Control as="select" name="breedId" value={formData.breedId} onChange={handleChange}>
            {breeds.map((breed) => (
              <option key={breed.id} value={breed.id}>
                {breed.breedName}
              </option>
            ))}
          </Form.Control>
          <Form.Label>Pet Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Pet Name"
            name="petName"
            value={formData.petName}
            onChange={handleChange}
          />
          <Form.Label>Pet Owner</Form.Label>
          <Form.Control as="select" name="userId" value={formData.userId} onChange={handleChange}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Form.Control>
          <Form.Label>Adoption Status</Form.Label>
          <Form.Control as="select" name="adoptionStatus" value={formData.adoptionStatus} onChange={handleChange}>
            <option value="Adopted">Adopted</option>
            <option value="Fostered">Fostered</option>
            <option value="Available">Available</option>
          </Form.Control>
          <Form.Label>Pet Age</Form.Label>
          <Form.Control
            type="text"
            placeholder="Pet age"
            name="petAge"
            value={formData.petAge}
            onChange={handleChange}
          />
          <Form.Label>Height</Form.Label>
          <Form.Control
            type="text"
            placeholder="Height"
            name="height"
            value={formData.height}
            onChange={handleChange}
          />
          <Form.Label>Weight</Form.Label>
          <Form.Control
            type="text"
            placeholder="Weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            placeholder="Color"
            name="color"
            value={formData.color}
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
};

export default PetForm;