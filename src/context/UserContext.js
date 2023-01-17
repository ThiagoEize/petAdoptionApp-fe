import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export default function UserContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || '')

    const [userId, setUserId] = useState(localStorage.getItem('userId') || '')

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
        // console.log('permissions:', permissions);
    }, [token])

    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLogInModal, setShowLogInModal] = useState(false);
    const [showSpecieModal, setShowSpecieModal] = useState(false);
    const [showBreedModal, setShowBreedModal] = useState(false);
    const [showPetModal, setShowPetModal] = useState(false);
    const [showPermissionModal, setShowPermissionModal] = useState(false);

    // const [initialData, setInitialData] = useState({});

    // const [speciesList, setSpeciesList] = useState([]);

    // const [breedsList, setBreedsList] = useState([]);

    // const getSpeciesList = async () => {
    //     try {
    //         const res = await axios.get('http://localhost:8080/species', { headers: { Authorization: `Bearer ${token}` } });
    //         const species = [{ id: '', specieName: 'Select a specie...' }, ...res.data.data]
    //         setSpeciesList(species);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // const getBreedsList = async () => {
    //     try {
    //         const res = await axios.get('http://localhost:8080/breeds', { headers: { Authorization: `Bearer ${token}` } });
    //         const breeds = [{ id: '', breedName: 'Select a breed...' }, ...res.data.data]
    //         setBreedsList(breeds);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // useEffect(() => {
    //     if (showBreedModal || showPetModal) {
    //         getSpeciesList()
    //     }
    // }, [showBreedModal, showPetModal])

    // useEffect(() => {
    //     if (showBreedModal) {
    //         getBreedsList()
    //     }
    // }, [showPetModal])

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
            // initialData,
            // setInitialData,
            // speciesList,
            // breedsList,
            token,
            userId,
            setUserId,
            permissions,
            setToken
        }}>
            {/* <SpecieModal
                visible={showSpecieModal}
                onClose={() => setShowSpecieModal(false)}
            // initialData={initialData}
            />
            <BreedModal
                visible={showBreedModal}
                onClose={() => setShowBreedModal(false)}
            // setSpeciesList={setSpeciesList}
            />
            <PetModal
                visible={showPetModal}
                onClose={() => setShowPetModal(false)}
            // initialData={initialData}
            />
            <PermissionModal
                visible={showPermissionModal}
                onClose={() => setShowPermissionModal(false)}
            // initialData={initialData}
            />
            <SignUpModal
                visible={showSignUpModal}
                onClose={() => setShowSignUpModal(false)}
            />
            <LogInModal
                visible={showLogInModal}
                onClose={() => setShowLogInModal(false)}
                token={token}
                setToken={setToken}
                setUserId={setUserId}
            /> */}
            {children}
        </UserContext.Provider>
    );
}