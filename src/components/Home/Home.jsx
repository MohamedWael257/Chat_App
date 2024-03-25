import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authuser } from '../../redux/slice/authslice';
import MainContent from '../maincontent/MainContent';
import Sidebar from '../sidebar/Sidebar';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import SideNavBar from '../sidenavbar/SideNavBar';
import Loader from '../loader/Loader';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
function Home() {
    const { currentUser } = useContext(AuthContext)
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // console.log('currentUser', currentUser);
    // console.log(users);
    useEffect(() => {
        const getusers = async () => {
            const usersCollection = collection(db, "users");
            const userSnapshot = await getDocs(usersCollection);
            const usersData = userSnapshot.docs.map((doc) => doc.data());
            setUsers(usersData);
            setLoading(false)
        }
        getusers();
    }, [])
    console.log("users", users);
    // useEffect(() => {
    //     if (currentUser?.uid && currentUser?.displayName && currentUser?.email && currentUser?.photoURL) {
    //         setLoading(false)
    //     }
    // }, [currentUser])
    const handelUserClick = (user) => {
        setSelectedUser(user)
    }
    return (
        <>
            <ToastContainer />
            {/* {loading && <Loader />} */}
            <div className='flex min-h-screen text-center bg-slate-100 max-w-[1435px] min-w-[850px] mx-auto'>
                {/* <div className="flex min-h-screen bg-slate-100 max-w-[1435px] min-w-[850px] mx-auto"> */}
                <div className=' w-[40px]'>
                    <SideNavBar />
                </div>
                <div className='bg-white lg:w-[400px] w-[300px] '>
                    <Sidebar
                        users={users}
                        onUserClick={handelUserClick}
                        selectedUser={selectedUser}
                    />
                </div>
                <div className='bg-slate-300 flex-1'>
                    <MainContent selectedUser={selectedUser} />
                </div>
            </div>

        </>
    );
}

export default Home;