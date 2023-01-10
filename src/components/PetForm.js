import { useState } from "react";
import { nanoid } from 'nanoid';
import { usePetContext } from "../context/PetContext";
import { useUserContext } from "../context/UserContext";

const PetForm = ({ pet = {} }) => {
  const { currentUserName } = useUserContext();

  const { isLoading } = usePetContext();
  const { handleSubmit } = usePetContext();
  const { errorsFromServer } = usePetContext();

  const maxCharacters = 140;

  const [isAboveLimit, setIsAboveLimit] = useState(false);

  const [petContent, setPetContent] = useState(pet.content ? pet.content : '');
  // const [isSubmitted, setIsSubmitted] = useState(false);

  const changePetContent = (e) => {
    if (maxCharacters - e.target.value.length >= 0) {
      setPetContent(e.target.value)
      setIsAboveLimit(false);
    } else {
      setIsAboveLimit(true);
    }
  }

  const resetForm = () => {
    setPetContent('');
    // setIsSubmitted(false);
  }

  const handleClick = () => {
    const date = new Date();
    const formatedDate = date.toISOString();
    // setIsSubmitted(true);
    const petObj = {
      content: petContent,
      userName: currentUserName,
      date: pet.date ? pet.date : formatedDate,
      id: pet.id || nanoid(),
    };
    if (petContent) {
      console.log(petObj);
      handleSubmit(petObj);
      resetForm();
    }
  }

  return (
    <>
      <div className="create-pet">
        <div className="create-pet-border">
          <textarea
            className="pet-textarea"
            placeholder="What do you have in mind..."
            value={petContent}
            onChange={changePetContent}
          ></textarea>
          <div className="create-pet-footer">

            <div className="create-pet-message-box">
              <small>{maxCharacters - petContent.length}</small>
              {isLoading && <span className="loader"></span>}
              {isAboveLimit
                &&
                <span
                  className="warning-span"
                >
                  This pet cannot contain more than {maxCharacters} characters
                </span>
              }
              {errorsFromServer
                &&
                <span
                  className="warning-span"
                >
                  {errorsFromServer.statusCode && 'Error Status ' + errorsFromServer.statusCode + ': ' + errorsFromServer.message}
                </span>
              }
            </div>

            <div className="pet-button-area">
              <button
                className="pet-button"
                disabled={isAboveLimit}
                onClick={handleClick}
              >
                {
                  pet.id ?
                    'Update pet'
                    :
                    'Create pet'
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetForm;
