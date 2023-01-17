import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import Axios from "axios";

export const PetContext = createContext();

export function usePetContext() {
    return useContext(PetContext);
}

export default function PetContextProvider({ children }) {
    const { token, permissions } = useUserContext();

    // const getDataFromServer = async () => {
    //     try {
    //         const res = await Axios.get(serverUrl, { headers: { Authorization: `Bearer ${token}` } });
    //         console.log('context', res.data.data);
    //         setPetsList(res.data.data ? res.data.data : [])
    //         // console.log(res);
    //     } catch (err) {
    //         console.log(err.response.data)
    //     }
    // }

    // useEffect(() => {
    //     getDataFromServer();
    // }, [token])

    const [petsList, setPetsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorsFromServer, setErrorsFromServer] = useState({})
    // const serverUrl = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/pet';
    const serverUrl = 'http://localhost:8080/pets';

    // const handleSubmit = async (pet) => {
    //     setIsLoading(true);
    //     try {
    //         await Axios.post(serverUrl, pet)
    //         setPetsList((prevPetList) => [pet, ...prevPetList])
    //     } catch (err) {
    //         setErrorsFromServer(err.response.data);
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    return (
        <PetContext.Provider value={{
            isLoading,
            // handleSubmit,
            errorsFromServer,
            petsList,
            setPetsList
        }}>
            {children}
        </PetContext.Provider>
    );
}