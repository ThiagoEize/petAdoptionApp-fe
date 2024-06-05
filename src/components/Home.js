import PetSearch from "./petSearch/PetSearch";
import PetList from "./petList/PetList";
import { useParams } from 'react-router-dom';
const Home = () => {
    const { page } = useParams();
    const currentPage = page ? parseInt(page, 10) : 1;

    return (
        <>
            <PetSearch initialPage={currentPage} />
            <PetList />
        </>
    );
};

export default Home;