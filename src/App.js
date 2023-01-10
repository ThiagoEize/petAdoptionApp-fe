import NavBar from "./components/NavBar";
// import PetForm from "./components/PetForm";
// import PetList from "./components/PetList";
import Profile from "./components/Profile";
import Home from "./components/Home";
import { useEffect, useState } from 'react';
// import Axios from "axios";
import {
  Route,
  Routes
} from "react-router-dom";
import PetContextProvider from "./context/PetContext";
import UserContextProvider from "./context/UserContext";
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <PetContextProvider>
      <UserContextProvider>
        <div className="container">
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
          </Routes>
        </div>
      </UserContextProvider>
    </PetContextProvider>

  );
}

export default App;