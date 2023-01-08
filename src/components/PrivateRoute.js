import { Navigate } from 'react-router-dom'

// const PrivateRoute = ({ currentUser, children }) => {
const PrivateRoute = ({ children }) => {
    // return JSON.parse(localStorage.getItem('currentUserId')) ? children : <Navigate to='/login'></Navigate>;
    return children;
};


export default PrivateRoute