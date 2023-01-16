import PetSearch from "./petSearch/PetSearch";
import PetList from "./PetList";
// import SignupModal from "./SignupModal";
import { useEffect, useState } from 'react';

// import Axios from "axios";
import { usePetContext } from "../context/PetContext";

// import { NavLink } from "react-router-dom";
const Home = () => {
    const { getDataFromServer } = usePetContext();

    // const [showModal, setShowModal] = useState(true);

    return (
        <>
            {/* <PetForm /> */}
            <PetSearch />
            <PetList />
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