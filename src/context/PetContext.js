import { createContext, useContext, useState, useEffect } from "react";
import { useUserContext } from "./UserContext";

import Axios from "axios";

export const PetContext = createContext();

export function usePetContext() {
    return useContext(PetContext);
}

export default function PetContextProvider({ children }) {
    const { token, permissions, userId } = useUserContext();


    const [petsList, setPetsList] = useState([]);
    const [savedPetsList, setSavedPetsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pet, setPet] = useState({});
    const [pagination, setPagination] = useState({
        totalPages: 0,
        currentPage: 1,
        totalPets: 0,
    });
    const [searchFormData, setSearchFormData] = useState({});
    const [filters, setFilters] = useState({ filterAgeBy: '<', filterHeightBy: '<', filterWeightBy: '<' });
    const [errorsFromServer, setErrorsFromServer] = useState({});

    const serverUrl = 'http://localhost:8080/pets';

    const fetchSavedPets = async () => {
        try {
            const res = await Axios.get(`${serverUrl}/myPets`, { headers: { Authorization: `Bearer ${token}` } });
            setSavedPetsList(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearch = async (page = 1, limit = 9, searchForm = searchFormData) => {
        setIsLoading(true);
        let query = `?page=${page}&limit=${limit}`;
        console.log('searchForm', searchForm);
        for (const [key, value] of Object.entries(searchForm)) {
            if (value !== '') {
                if (key === 'petName' || key === 'color') {
                    query += `&${key}=${value}`;
                } else if (key === 'doFilter' && value === true) {
                    query += `&pets.userId=${userId}`;
                } else if (key === 'doFilter' && value !== true) {

                } else if (key === 'age_greaterThan') {
                    query += `&petAge>=${value}`;
                } else if (key === 'age_lessThan') {
                    query += `&petAge<=${value}`;
                } else if (key === 'height_greaterThan') {
                    query += `&height>=${value}`;
                } else if (key === 'height_lessThan') {
                    query += `&height<=${value}`;
                } else if (key === 'weight_greaterThan') {
                    query += `&weight>=${value}`;
                } else if (key === 'weight_lessThan') {
                    query += `&weight<=${value}`;
                } else {
                    query += `&${key}=${value}`;
                }
            }
        }

        try {
            const res = await Axios.get(`${serverUrl}${query}`, { headers: { Authorization: `Bearer ${token}` } });
            setPetsList(res.data.data);
            setPagination({
                totalPages: Math.ceil(res.data.totalPets / limit),
                currentPage: page,
                totalPets: res.data.totalPets,
            });

        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };




    useEffect(() => {
        fetchSavedPets();
    }, [token]);

    return (
        <PetContext.Provider value={{
            isLoading,
            errorsFromServer,
            pet,
            setPet,
            petsList,
            setPetsList,
            savedPetsList,
            setSavedPetsList,
            pagination,
            setPagination,
            handleSearch,
            searchFormData,
            setSearchFormData,
            filters,
            setFilters,
            fetchSavedPets
        }}>
            {children}
        </PetContext.Provider>
    );
}
