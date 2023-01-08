import { createContext, useContext, useState } from "react";
import SignUpModal from "../components/SignUpModal";

export const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export default function UserContextProvider({ children }) {
    const [currentUserName, setCurrentUserName] = useState(() => {
        const newLocalUser = localStorage.getItem('currentUserName');
        return newLocalUser ? newLocalUser : 'Thiago'
    });

    const handleUserName = (newUserName) => {
        console.log(newUserName)
        localStorage.setItem("currentUserName", newUserName);
        setCurrentUserName(newUserName)
    }

    const [showSignUpModal, setShowSignUpModal] = useState(true);

    return (
        <UserContext.Provider value={{
            currentUserName,
            handleUserName,
            showSignUpModal,
            setShowSignUpModal
        }}>
            <SignUpModal
                visible={showSignUpModal}
                // data={selectedNote}
                onClose={() => setShowSignUpModal(false)}
            // onSubmit={onUpdate}
            />
            {children}
        </UserContext.Provider>
    );
}