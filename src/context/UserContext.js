import { createContext, useContext, useEffect, useState } from "react";
import SignUpModal from "../components/SignUpModal";
import LogInModal from "../components/LogInModal";
import BreedModal from "../components/BreedModal";
import SpecieModal from "../components/SpecieModal";
import PetModal from "../components/PetModal";
import PermissionModal from "../components/PermissionModal";
import axios from "axios";

export const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export default function UserContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || '')

    const [currentUserName, setCurrentUserName] = useState(() => {
        const newLocalUser = localStorage.getItem('currentUserName');
        return newLocalUser ? newLocalUser : 'Thiago'
    });

    const handleUserName = (newUserName) => {
        console.log(newUserName)
        localStorage.setItem("currentUserName", newUserName);
        setCurrentUserName(newUserName)
    }

    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLogInModal, setShowLogInModal] = useState(false);
    const [showSpecieModal, setShowSpecieModal] = useState(false);
    const [showBreedModal, setShowBreedModal] = useState(false);
    const [showPetModal, setShowPetModal] = useState(false);
    const [showPermissionModal, setShowPermissionModal] = useState(false);


    const [initialData, setInitialData] = useState({});

    const [speciesList, setSpeciesList] = useState([]);

    const getSpeciesList = async () => {
        try {
            const res = await axios.get('http://localhost:8080/species', { headers: { Authorization: `Bearer ${token}` } });
            console.log(res.data);
            // setSpeciesList(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (showBreedModal === true) {
            getSpeciesList()
        }
    }, showBreedModal)

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
            initialData,
            setInitialData,
            token
        }}>
            <SpecieModal
                visible={showSpecieModal}
                onClose={() => setShowSpecieModal(false)}
                initialData={initialData}
            />
            <BreedModal
                visible={showBreedModal}
                onClose={() => setShowBreedModal(false)}
                setSpeciesList={setSpeciesList}
                initialData={initialData}
                speciesList={speciesList}
            />
            <PetModal
                visible={showPetModal}
                onClose={() => setShowPetModal(false)}
                initialData={initialData}
            />
            <PermissionModal
                visible={showPermissionModal}
                onClose={() => setShowPermissionModal(false)}
                initialData={initialData}
            />
            <SignUpModal
                visible={showSignUpModal}
                onClose={() => setShowSignUpModal(false)}
            />
            <LogInModal
                visible={showLogInModal}
                onClose={() => setShowLogInModal(false)}
                token={token}
                setToken={() => setToken(localStorage.getItem('token'))}
            />
            {children}
        </UserContext.Provider>
    );
}