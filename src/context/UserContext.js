import { createContext, useContext, useState } from "react";
import SignUpModal from "../components/SignUpModal";
import LogInModal from "../components/LogInModal";

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

    return (
        <UserContext.Provider value={{
            currentUserName,
            handleUserName,
            showSignUpModal,
            setShowSignUpModal,
            showLogInModal,
            setShowLogInModal
        }}>
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