import TweetForm from "./TweetForm";
import TweetList from "./TweetList";
// import SignupModal from "./SignupModal";
import { useEffect, useState } from 'react';

// import Axios from "axios";
import { useTweetContext } from "../context/TweetContext";

// import { NavLink } from "react-router-dom";
const Home = () => {
    const { getDataFromServer } = useTweetContext();

    // const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        getDataFromServer();
        const interval = setInterval(() => {
            getDataFromServer();
        }, 180000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <TweetForm />
            <TweetList />
            {/* <SignupModal
                visible={showModal}
                // note={selectedNote}
                onClose={() => setShowModal(false)}
            // onSubmit={onUpdate}
            /> */}
        </>
    );
};

export default Home;