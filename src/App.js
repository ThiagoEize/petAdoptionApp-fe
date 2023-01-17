import NavBar from "./components/navBar/NavBar";
// import PetForm from "./components/PetForm";
// import PetList from "./components/PetList";
import Profile from "./components/Profile";
import Home from "./components/Home";
import PetShow from "./components/petShow/PetShow";
import HomeLogedOut from "./components/HomeLogedOut";
import { useEffect, useState } from 'react';
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
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/petShow/:petId"
              element={
                <PrivateRoute>
                  <PetShow />
                </PrivateRoute>
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