import { useContext, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Homepage from './pages/homepage/Homepage'
import SignInpage from './pages/signinpage/SignInpage'
import SignUnpage from './pages/signuppage/SignUppage'
import { useDispatch, useSelector } from 'react-redux'
import { authuser, removeActiveUserHandler, setActiveUserHandler } from './redux/slice/authslice'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/config'
import Loader from './components/loader/Loader'
import ProfilePage from './pages/profilepage/ProfilePage'
import StatusPage from './pages/statuspage/StatusPage'
import { AuthContext } from './context/AuthContext'
function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [isloading, setIsloading] = useState(true)
  // useEffect(() => {
  //   // setIsloading(true)
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const userData = {
  //         uid: user.uid,
  //         displayName: user.displayName,
  //         email: user.email,
  //         photoURL: user.photoURL,
  //       };
  //       dispatch(setActiveUserHandler(userData))
  //       // if(user.displayName || user.photoURL )
  //       // navigate('/')
  //     }
  //     else {
  //       dispatch(removeActiveUserHandler());
  //       navigate('/signin')
  //     }
  //     setIsloading(false)
  //   });
  //   return () => unsubscribe();
  // }, [dispatch])
  const { currentUser, isloading } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/signin" />;
    }
    return children;
  };
  return (
    <>
      {isloading ? <Loader />
        :
        <Routes>
          <Route exact path='/' element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
          <Route path='/status' element={<ProtectedRoute><StatusPage /></ProtectedRoute>} />
          {/* <Route path='/profile' element={<ProfilePage />} /> */}
          {/* <Route path='/profile/:uid' element={<ProfilePage />} /> */}
          <Route path='/signin' element={<SignInpage />} />
          <Route path='signup' element={<SignUnpage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      }
    </>
  )
}

export default App
