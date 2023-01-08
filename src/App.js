import NavBar from "./components/NavBar";
// import TweetForm from "./components/TweetForm";
// import TweetList from "./components/TweetList";
import Profile from "./components/Profile";
import Home from "./components/Home";
import { useEffect, useState } from 'react';
// import Axios from "axios";
import {
  Route,
  Routes
} from "react-router-dom";
import TweetContextProvider from "./context/TweetContext";
import UserContextProvider from "./context/UserContext";
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <TweetContextProvider>
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
    </TweetContextProvider>

  );
}

export default App;