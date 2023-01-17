import React from 'react';
import { useUserContext } from "../context/UserContext";
// import SignUpModal from "./SignUpModal";
// import LogInModal from "./LogInModal";

const HomeLogoutPage = () => {
    const {
        setShowSignUpModal,
        setShowLogInModal,
        setToken,
        setUserId,
        userId,
        token
    } = useUserContext();

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Welcome to the Pet Adoption App!</h1>
            <p>Our app connects loving pet owners with animals in need of a forever home. Create an account to start browsing and adopting your new best friend.</p>
            <button
                className='buttonsLogout'
                onClick={setShowSignUpModal}
            >Create an account</button>
            <button
                className='buttonsLogout'
                onClick={setShowLogInModal}
            >Log In</button>
        </div>
    );
};

export default HomeLogoutPage;