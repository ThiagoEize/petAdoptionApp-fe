import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

const Profile = () => {
  const { userId, token } = useUserContext();
  const [user, setUser] = useState({
    email: '',
    password: '',
    repassword: '',
    userName: '',
    userLastName: '',
    phoneNumber: '',
    userBio: '',
    street: '',
    number: '',
    neighborhood: '',
    postalCode: '',
    city: '',
    country: ''
  });

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userData = response.data.data;
      setUser({
        email: userData.email || '',
        password: userData.password || '',
        repassword: '', // Assuming password confirmation is not stored
        userName: userData.userName || '',
        userLastName: userData.userLastName || '',
        phoneNumber: userData.phoneNumber || '',
        userBio: userData.userBio || '',
        street: userData.street ? String(userData.street) : '',
        number: userData.number ? String(userData.number) : '',
        neighborhood: userData.neighborhood ? String(userData.neighborhood) : '',
        postalCode: userData.postalCode ? String(userData.postalCode) : '',
        city: userData.city ? String(userData.city) : '',
        country: userData.country ? String(userData.country) : ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleClick = async (event) => {
    const newUser = {
      email: user.email,
      userName: user.userName,
      userLastName: user.userLastName,
      phoneNumber: user.phoneNumber,
      userBio: user.userBio,
      password: user.password,
      street: user.street,
      number: user.number,
      neighborhood: user.neighborhood,
      postalCode: user.postalCode,
      city: user.city,
      country: user.country
    };
    try {
      await axios.put(`http://localhost:8080/users/${userId}`, newUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
      />
      <p>Name</p>
      <input
        className="username-text-box"
        type="text"
        name="userName"
        value={user.userName}
        onChange={handleChange}
      />
      <p>Last Name</p>
      <input
        className="username-text-box"
        type="text"
        name="userLastName"
        value={user.userLastName}
        onChange={handleChange}
      />
      <p>Phone Number</p>
      <input
        className="username-text-box"
        type="text"
        name="phoneNumber"
        value={user.phoneNumber}
        onChange={handleChange}
      />
      <p>Bio</p>
      <input
        className="username-text-box"
        type="text"
        name="userBio"
        value={user.userBio}
        onChange={handleChange}
      />
      <p>Street</p>
      <input
        className="username-text-box"
        type="text"
        name="street"
        value={user.street}
        onChange={handleChange}
      />
      <p>Number</p>
      <input
        className="username-text-box"
        type="text"
        name="number"
        value={user.number}
        onChange={handleChange}
      />
      <p>Neighborhood</p>
      <input
        className="username-text-box"
        type="text"
        name="neighborhood"
        value={user.neighborhood}
        onChange={handleChange}
      />
      <p>Postal Code</p>
      <input
        className="username-text-box"
        type="text"
        name="postalCode"
        value={user.postalCode}
        onChange={handleChange}
      />
      <p>City</p>
      <input
        className="username-text-box"
        type="text"
        name="city"
        value={user.city}
        onChange={handleChange}
      />
      <p>Country</p>
      <input
        className="username-text-box"
        type="text"
        name="country"
        value={user.country}
        onChange={handleChange}
      />
      <div className="profile-button-section">
        <button
          className="save-profile-button"
          onClick={handleClick}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Profile;
