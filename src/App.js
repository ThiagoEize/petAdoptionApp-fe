import NavBar from "./components/navBar/NavBar";
// import PetForm from "./components/PetForm";
// import PetList from "./components/PetList";
import Profile from "./components/Profile";
import Home from "./components/Home";
import PetShow from "./components/petShow/PetShow";
import UsersList from "./components/usersList/UsersList";
import AdoptionRequestsList from "./components/requestsList/RequestsList";
import HomeLogedOut from "./components/HomeLogedOut";
// import Axios from "axios";
import {
  Route,
  Routes
} from "react-router-dom";
import PetContextProvider from "./context/PetContext";
import UserContextProvider from "./context/UserContext";
import PrivateRoute from './components/PrivateRoute';

import './index.css';

function App() {
  return (
    <UserContextProvider>
      <PetContextProvider>
        <div className="container-css">
          <NavBar />
          <Routes>
            <Route
              path="/:page?"
              element={
                // <PrivateRoute>
                <Home />
                // </PrivateRoute>
              }
            ></Route>
            <Route
              path="/savedPets/:saved"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/adoptionRequests"
              element={
                <PrivateRoute>
                  <AdoptionRequestsList />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <UsersList />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/petShow/:petId"
              element={

                <PetShow />
              }
            ></Route>
            <Route
              path="/logedOut"
              element={
                <HomeLogedOut />
              }
            ></Route>
          </Routes>
        </div>
      </PetContextProvider>
    </UserContextProvider>

  );
}

export default App;