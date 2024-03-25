import React, { useContext } from 'react';
import SignUp from '../../components/signup/SignUp'
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'
function SignUppage() {
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

                <SignUp />
            </ProtectedRoute>
        </>
    );
}

export default SignUppage;