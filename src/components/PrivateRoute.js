import { Navigate } from 'react-router-dom'

// const PrivateRoute = ({ currentUser, children }) => {
const PrivateRoute = ({ children }) => {
    return localStorage.getItem('token') ? children : <Navigate to='/logedOut'></Navigate>;
    return children;
};


export default PrivateRoute