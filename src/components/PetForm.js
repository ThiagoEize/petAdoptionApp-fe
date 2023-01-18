import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useUserContext } from "../context/UserContext";
import { usePetContext } from "../context/PetContext";

const PetForm = ({ onClose }) => {
  const { token, errorsFromServer, setErrorsFromServer, initialData, setInitialData } = useUserContext();
  const { pet, setPet, petsList, setPetsList } = usePetContext();

  const [speciesList, setSpeciesList] = useState([]);

  const [breedsList, setBreedsList] = useState([]);
  const [filteredBreedsList, setFilteredBreedsList] = useState([]);

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
      setFilteredBreedsList(breeds);
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
    adoptionStatus: initialData.adoptionStatus || 'Available',
    petAge: initialData.petAge || '',
    height: initialData.height || '',
    weight: initialData.weight || '',
    color: initialData.color || '',
    foodRestrictions: initialData.foodRestrictions || '',
    petBio: initialData.petBio || ''
  });

  const [picture, setPicture] = useState(null);

  // useEffect(() => {
  //   setPicture(initialData.picture)
  // }, [])

  const [pictureUrl, setPictureUrl] = useState(null);

  useEffect(() => {
    if (initialData.picture instanceof Blob) {
      setPictureUrl(URL.createObjectURL(initialData.picture));
    } else if (typeof initialData.picture === 'string') {
      setPictureUrl(initialData.picture);
    }
    console.log(pictureUrl);
  }, [initialData])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let res;
      if (initialData.id) {
        const form = new FormData();

        // form.append('picture', picture);
        console.log('picture', picture);
        console.log('pictureUrl', pictureUrl);

        if (picture) {
          form.append('picture', picture);
          form.append('breedId', formData.breedId);
          form.append('petName', formData.petName);
          form.append('adoptionStatus', formData.adoptionStatus);
          form.append('petAge', formData.petAge);
          form.append('height', formData.height);
          form.append('weight', formData.weight);
          form.append('color', formData.color);
          form.append('foodRestrictions', formData.foodRestrictions);
          form.append('petBio', formData.petBio);

          res = await axios({
            method: 'PUT',
            url: `http://localhost:8080/pets/${initialData.id}`,
            data: form,
            headers: {
              'Content-Type': `multipart/form-data`,
              'Authorization': `Bearer ${token}`
            },
          });
        } else {
          res = await axios.put(`http://localhost:8080/pets/${initialData.id}`, formData, { headers: { Authorization: `Bearer ${token}` } });
        }

        const updatedPetIndex = petsList.findIndex(pet => pet.id === initialData.id)

        const currentPets = petsList

        console.log(res.data.data);

        currentPets[updatedPetIndex] = res.data.data;

        setPet(res.data.data)

        setPetsList(currentPets)

      } else {
        // Make a post request to your server to add the pet to the database
        const form = new FormData();
        // console.log(picture);
        form.append('picture', picture);
        form.append('breedId', formData.breedId);
        form.append('petName', formData.petName);
        form.append('adoptionStatus', formData.adoptionStatus);
        form.append('petAge', formData.petAge);
        form.append('height', formData.height);
        form.append('weight', formData.weight);
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
        // setPetsList((prevPetList) => [...prevPetList, res.data.data])
        onClose();
      }
    } catch (err) {
      setErrorsFromServer(err.response.data)
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let newValue = value;
    if (name === 'specieId') {
      console.log(name, value, newValue);
      const newBreedList = breedsList.filter(breed => breed.specieId === parseInt(newValue) || !breed.specieId)
      setFilteredBreedsList(newBreedList);
    }

    setFormData({ ...formData, [name]: newValue });
  };

  const handleFileChange = (event) => {
    setPicture(event.target.files[0]);
  }

  const handleClose = () => {
    setInitialData({});
    onClose();
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
              {!picture && pictureUrl && <img src={pictureUrl} alt="Selected" width="200" height="200" style={{ marginTop: '10px' }} />}
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
            {filteredBreedsList.map((breed) => (
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
          {/* <Form.Label>Adoption Status</Form.Label>
          <Form.Control as="select" name="adoptionStatus" value={formData.adoptionStatus} onChange={handleChange}>
            <option value="Available">Available</option>
            <option value="Adopted">Adopted</option>
            <option value="Fostered">Fostered</option>
          </Form.Control> */}
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>

        </Modal.Footer>
        {errorsFromServer &&
          <Alert variant="danger">
            {errorsFromServer}
          </Alert>
        }
      </form>
    </div>
  );
};

export default PetForm;