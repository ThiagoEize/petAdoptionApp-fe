import PetSearch from "./petSearch/PetSearch";
import PetList from "./petList/PetList";
const Home = () => {
    // const [showModal, setShowModal] = useState(true);

    return (
        <>
            <PetSearch />
            <PetList />
        </>
    );
};

export default Home;