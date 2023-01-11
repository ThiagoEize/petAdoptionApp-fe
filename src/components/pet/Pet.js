import * as moment from 'moment';
import './Pet.css';

const Pet = ({ pet }) => {
  const handleEditPet = () => {
    // code to handle editing the pet would go here
  }

  const handleAdoptPet = () => {
    // code to handle adopting the pet would go here
  }

  const handleDeletePet = () => {
    // code to handle deleting the pet would go here
  }

  const adoptionStatusClass = pet.adoptionStatus === 'available' ? 'available' : 'adopted';
  return (
    <>
      <div id={pet.id} className={`pet-card ${adoptionStatusClass}`}>
        <img src={pet.picture} alt={pet.petName} className="pet-picture pet-picture-half" />
        <div className="pet-info">
          <h2 className="pet-name">{pet.petName}</h2>
          <div className="pet-details">
            <div className="pet-age">Age: {pet.petAge}</div>
            <div className="pet-height">Height: {pet.height}</div>
            <div className="pet-weight">Weight: {pet.weight}</div>
            <div className="pet-color">Color: {pet.color}</div>
          </div>
          {/* <p className="pet-bio">{pet.petBio}</p> */}
        </div>
        <div className="pet-footer">
          {pet.userName ? (
            <div className="pet-user">
              Adopted By: {pet.userName}
            </div>
          ) : (
            <div className={`pet-status ${adoptionStatusClass}`}>Status: {pet.adoptionStatus}</div>
          )}
          <div className="pet-date">
            Created at {moment(pet.dateCreated).format('MMMM Do YYYY, h:mm a')}
          </div>
          <div>
            <button className="pet-button edit-button" onClick={handleEditPet}>Edit</button>
            <button className="pet-button adopt-button" onClick={handleAdoptPet}>Adopt</button>
            <button className="pet-button delete-button" onClick={handleDeletePet}>Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pet;