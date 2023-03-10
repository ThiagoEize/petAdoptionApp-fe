import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import Axios from "axios";

export const PetContext = createContext();

export function usePetContext() {
    return useContext(PetContext);
}

export default function PetContextProvider({ children }) {
    const { token, permissions } = useUserContext();

    const [petsList, setPetsList] = useState([]);

    const [savedPetsList, setSavedPetsList] = useState([]);

    const [reloud, setReloud] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [pet, setPet] = useState({});

    const [errorsFromServer, setErrorsFromServer] = useState({})
    // const serverUrl = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/pet';
    const serverUrl = 'http://localhost:8080/pets';

    return (
        <PetContext.Provider value={{
            isLoading,
            // handleSubmit,
            errorsFromServer,
            pet,
            setPet,
            petsList,
            setPetsList,
            reloud,
            setReloud,
            savedPetsList,
            setSavedPetsList
        }}>
            {children}
        </PetContext.Provider>
    );
}