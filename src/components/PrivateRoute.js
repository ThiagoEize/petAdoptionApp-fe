import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    //creatte a alert to login to see the page
    if (!localStorage.getItem('token')) {
        alert('Please login to access this page');
        return <Navigate to='/'></Navigate>;
    } else {
        return children;
    }
};


export default PrivateRoute