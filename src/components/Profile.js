import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

// const Profile = ({ currentUserName, handleCurrentUserName }) => {
const Profile = () => {

  const { userId, token } = useUserContext();

  const [user, setUser] = useState({});

  const getUser = async () => {
    const user = await axios.get(`http://localhost:8080/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
    setUser(user.data.data)
  }

  useEffect(() => {
    getUser()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prev => { return { ...prev, [name]: value } });
  }

  const handleClick = async (event) => {
    console.log('user', user);
    const newUser = {
      email: user.email, userName: user.userName, userLastName: user.userLastName,
      phoneNumber: user.phoneNumber, userBio: user.userBio, password: user.password
    }
    console.log(newUser);
    try {
      await axios.put(`http://localhost:8080/users/${userId}`, newUser, { headers: { Authorization: `Bearer ${token}` } })
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="profile-container">
        <div className="profile-title-section">
          <h1>Profile</h1>
        </div>
        <p>Email</p>
        <input
          className="username-text-box"
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
        >
        </input>
        <p>Name</p>
        <input
          className="username-text-box"
          type="text"
          name="userName"
          value={user.userName}
          onChange={handleChange}
        >
        </input>
        <p>Last Name</p>
        <input
          className="username-text-box"
          type="text"
          name="userLastName"
          value={user.userLastName}
          onChange={handleChange}
        >
        </input>
        <p>Phone Number</p>
        <input
          className="username-text-box"
          type="text"
          name="phoneNumber"
          value={user.phoneNumber}
          onChange={handleChange}
        >
        </input>
        <p>Bio</p>
        <input
          className="username-text-box"
          type="text"
          name="userBio"
          value={user.userBio}
          onChange={handleChange}
        >
        </input>
        <div className="profile-button-section">
          <button
            className="save-profile-button"
            onClick={handleClick}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
