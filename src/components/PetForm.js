import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useUserContext } from "../context/UserContext";

const PetForm = ({ onClose, initialData = {} }) => {
  const { token } = useUserContext();

  const [speciesList, setSpeciesList] = useState([]);

  const [breedsList, setBreedsList] = useState([]);

  const getSpeciesList = async () => {
    try {
      const res = await axios.get('http://localhost:8080/species', { headers: { Authorization: `Bearer ${token}` } });
      const species = [{ id: '', specieName: 'Select a specie...' }, ...res.data.data]
      setSpeciesList(species);
    } catch (err) {
      console.log(err);
    }
  };

  const getBreedsList = async () => {
    try {
      const res = await axios.get('http://localhost:8080/breeds', { headers: { Authorization: `Bearer ${token}` } });
      const breeds = [{ id: '', breedName: 'Select a breed...' }, ...res.data.data]
      setBreedsList(breeds);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSpeciesList()
    getBreedsList()
  }, [])

  const [formData, setFormData] = useState({
    breedId: initialData.breedId || '',
    petName: initialData.petName || '',
    adoptionStatus: initialData.adoptionStatus || '',
    // picture: initialData.picture || '',
    petAge: initialData.petAge || '',
    height: initialData.height || '',
    weight: initialData.weight || '',
    color: initialData.color || '',
    foodRestrictions: initialData.foodRestrictions || '',
    petBio: initialData.petBio || ''
  });
  const [picture, setPicture] = useState(null);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let res;
      if (initialData.id) {
        // Make a put request to your server to update the pet in the database
        res = await axios.put(`http://localhost:8080/pets/${initialData.id}`, {
          ...formData,
          picture
        });
      } else {
        // Make a post request to your server to add the pet to the database
        const form = new FormData();
        form.append('picture', picture);
        form.append('breedId', parseInt(formData.breedId));
        form.append('petName', formData.petName);
        form.append('adoptionStatus', formData.adoptionStatus);
        form.append('petAge', Number(formData.petAge));
        form.append('height', Number(formData.height));
        form.append('weight', Number(formData.weight));
        form.append('color', formData.color);
        form.append('foodRestrictions', formData.foodRestrictions);
        form.append('petBio', formData.petBio);

        res = await axios({
          method: 'POST',
          url: 'http://localhost:8080/pets',
          data: form,
          headers: {
            'Content-Type': `multipart/form-data`,
            'Authorization': `Bearer ${token}`
          },
        });
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
    let newValue = value;
    // if (name === "breedId") {
    //   newValue = event.target.value
    // }
    if (name === "petAge" || name === "petHeight" || name === "petWeight") {
      newValue = parseInt(value)
    }
    setFormData({ ...formData, [name]: newValue });
  };

  const handleFileChange = (event) => {
    setPicture(event.target.files[0]);
  }

  return (
    <div className="pet-form-container">
      <form>
        <Modal.Header>
          <h3>{initialData.id ? 'Edit Pet' : 'Add Pet'}</h3>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Button variant="secondary" onClick={() => document.getElementById("picture-input").click()}>Select a image</Button>
            <input type="file" id="picture-input" style={{ display: "none" }} onChange={handleFileChange} />
            <div>
              {picture && <img src={URL.createObjectURL(picture)} alt="Selected" width="200" height="200" style={{ marginTop: '10px' }} />}
            </div>
          </Form.Group>
          <Form.Label>Specie Name</Form.Label>
          <Form.Control as="select" name="specieId" value={formData.specieId} onChange={handleChange}>
            {speciesList.map((specie) => (
              <option key={specie.id} value={specie.id}>
                {specie.specieName}
              </option>
            ))}
          </Form.Control>
          <Form.Label>Breed Name</Form.Label>
          <Form.Control as="select" name="breedId" value={formData.breedId} onChange={handleChange}>
            {breedsList.map((breed) => (
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
          <Form.Label>Food Restrictions</Form.Label>
          <Form.Control
            type="text"
            placeholder="foodRestrictions"
            name="foodRestrictions"
            value={formData.foodRestrictions}
            onChange={handleChange}
          />
          <Form.Label>Bio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Bio"
            name="petBio"
            value={formData.petBio}
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