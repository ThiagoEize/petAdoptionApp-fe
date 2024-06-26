import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export default function UserContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || '')

    const [userId, setUserId] = useState(parseInt(localStorage.getItem('userId')) || '')

    const [permissions, setPermissions] = useState({})

    const [errorsFromServer, setErrorsFromServer] = useState('');

    const [currentUserName, setCurrentUserName] = useState(() => {
        const newLocalUser = localStorage.getItem('currentUserName');
        return newLocalUser ? newLocalUser : 'Thiago'
    });

    const handleUserName = (newUserName) => {
        localStorage.setItem("currentUserName", newUserName);
        setCurrentUserName(newUserName)
    }

    const getUserPermissions = async () => {
        try {
            console.log('this is my token in get permissions', token);
            const res = await axios.get(`http://localhost:8080/permissions/user/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
            setPermissions(res.data.data || '');
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (token !== '') {
            getUserPermissions()
        }
    }, [token])

    useEffect(() => {
        setTimeout(() => {
            setErrorsFromServer('')
        }, 2000)
    }, [errorsFromServer])

    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLogInModal, setShowLogInModal] = useState(false);
    const [showSpecieModal, setShowSpecieModal] = useState(false);
    const [showBreedModal, setShowBreedModal] = useState(false);
    const [showPetModal, setShowPetModal] = useState(false);
    const [showPermissionModal, setShowPermissionModal] = useState(false);

    const [showRequestModal, setShowRequestModal] = useState(false);
    const [requestType, setRequestType] = useState('');

    const [showSavePetModal, setShowSavePetModal] = useState(false);

    const [showFosteringHouseModal, setShowFosteringHouseModal] = useState(false); // Add state for Fostering House Modal

    const [petId, setPetId] = useState('');

    const [initialData, setInitialData] = useState({});

    const [requestsList, setRequestsList] = useState([]);

    const [usersList, setUsersList] = useState([]);

    return (
        <UserContext.Provider value={{
            currentUserName,
            handleUserName,
            showSignUpModal,
            setShowSignUpModal,
            showLogInModal,
            setShowLogInModal,
            showSpecieModal,
            setShowSpecieModal,
            showBreedModal,
            setShowBreedModal,
            showPetModal,
            setShowPetModal,
            showPermissionModal,
            setShowPermissionModal,
            errorsFromServer,
            setErrorsFromServer,
            initialData,
            setInitialData,
            // speciesList,
            // breedsList,
            token,
            userId,
            showRequestModal,
            setShowRequestModal,
            showSavePetModal,
            setShowSavePetModal,
            showFosteringHouseModal, // Add state for Fostering House Modal
            setShowFosteringHouseModal, // Add setter for Fostering House Modal
            requestType,
            setRequestType,
            setUserId,
            petId,
            setPetId,
            requestsList,
            setRequestsList,
            usersList,
            setUsersList,
            permissions,
            setPermissions,
            setToken
        }}>
            {children}
        </UserContext.Provider>
    );
}
