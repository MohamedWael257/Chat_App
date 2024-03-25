import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authuser } from '../../redux/slice/authslice';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../loader/Loader'
import { FaRegUserCircle } from 'react-icons/fa'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
function CurrentUser() {
    const { currentUser } = useContext(AuthContext)
    const [isloading, setIsloading] = useState(false)
    const [toggle, setToggle] = useState(false);
    // console.log(currentUser);
    const navigate = useNavigate()
    const logouthandel = () => {
        setIsloading(true)
        signOut(auth)
            .then(() => {
                setIsloading(false)
                navigate("/signin");
                toast.success("logout succeessful...")
            }).catch((error) => {
                setIsloading(false)
                toast.error(error.message)
            });
    }
    return (
        <>
            {isloading && <Loader />}
            <ToastContainer />
            <div className='relative h-16 bg-slate-100  dark:bg-stone-800 border-b border-slate-200 dark:border-stone-700 flex justify-between items-center px-2 py-4'>
                <div className="flex items-center gap-3">
                    {/* {currentUser?.photoURL ? ( */}
                    <img className='w-12 h-12 rounded-full' src={currentUser?.photoURL} />
                    {/* ) : (
                        <FaRegUserCircle size={30} />
                        // <p>{currentUser?.displayName?.[0]}</p>
                    )} */}
                    <h4 className="font-semibold text-lg  dark:text-white">{currentUser?.displayName}</h4>
                </div>
                <div>
                    <div
                        className={`cursor-pointer p-2 dark:text-white ${toggle ? "bg-slate-200 dark:bg-stone-700" : ""
                            } rounded-full`}
                        onClick={() => setToggle(!toggle)}
                    >
                        ...
                        {/* <MoreVertIcon /> */}
                    </div>
                    {toggle && (
                        <div className="absolute top-14 right-4 w-44 bg-white text-black  dark:bg-stone-700  dark:text-white py-2 rounded shadow border">
                            {/* <Link to="/profile"> */}
                            {/* <Link to="/profile/${currentUser?.uid}"> */}
                            {/* <div className="cursor-pointer hover:bg-slate-100 py-2 px-5 text-slate-700 flex gap-2 items-center"> */}
                            {/* <PersonOutlineOutlinedIcon /> */}
                            {/* Profile */}
                            {/* </div> */}
                            {/* </Link> */}
                            <div
                                className="cursor-pointer hover:bg-slate-100 dark:hover:bg-stone-700  py-2 px-5 text-slate-700 dark:text-white flex gap-2 items-center"
                                onClick={logouthandel}
                            // onClick={() => signOut(auth)}
                            >
                                {/* <LogoutIcon /> */}
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default CurrentUser;