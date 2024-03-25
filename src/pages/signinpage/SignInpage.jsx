import React, { useContext } from 'react';
import SignIn from '../../components/signin/SignIn'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'
function SignInpage() {

    const { currentUser } = useContext(AuthContext);
    const ProtectedRoute = ({ children }) => {
        if (currentUser) {
            return < Navigate to='/' />
        }
        return children;
    };
    return (
        <>
            <ProtectedRoute>

                <SignIn />
            </ProtectedRoute>
        </>
    );
}

export default SignInpage;