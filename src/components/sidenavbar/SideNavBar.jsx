import { useEffect, useState } from 'react';
import { BsChatDots } from 'react-icons/bs'
import { BiSolidPhoneCall } from 'react-icons/bi'
import { LuCircleDot } from 'react-icons/lu'
import { AiOutlineStar } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'
import { useSelector } from 'react-redux';
import { authuser } from '../../redux/slice/authslice';
import { FaRegUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { BsSun, BsFillMoonFill } from "react-icons/bs"
import statusicon from "../../assets/status.png";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
function SideNavBar() {
    const { currentUser } = useContext(AuthContext)
    const [theme, setTheme] = useState("light")
    const [toggelsettings, setToggelsettings] = useState(false)
    let currentTheme = localStorage.getItem("theme")
    const isActive = (path) => {
        if (path === location.pathname) {
            return true;
        }
        else {
            return false;
        }
    }
    useEffect(() => {
        if (currentTheme === "dark") {
            document.documentElement.classList.add('dark')
        }
        // if (theme === "dark") {
        //     document.documentElement.classList.add('dark')
        // }
        else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])
    const handelClick = () => {
        setTheme(theme === "light" ? "dark" : "light")
        localStorage.setItem("theme", theme)

    }
    return (
        <div className='flex flex-col gap-[385px] min-h-screen dark:bg-stone-900'>
            <div className='items-center h-34 flex flex-col gap-[15px] py-4'>
                <Link to='/'>
                    <BsChatDots className={`dark:text-white text-black ${isActive('/') && " border-l-4 w-8 border-green-600"}`} size={25} />
                </Link>
                <Link>
                    <BiSolidPhoneCall size={25} className='dark:text-white text-black' />
                </Link>
                <Link to='/status'>
                    <LuCircleDot className={` dark:text-white text-black ${isActive('/status') && " border-l-4 w-8 border-green-600"}`} size={25} />
                </Link>
            </div>
            <div className='relative items-center h-34 flex flex-col gap-[15px] py-4'>
                <AiOutlineStar size={25} className='dark:text-white text-black' />
                <BsFillTrashFill size={25} className='dark:text-white text-black' />
                <FiSettings size={25} onClick={() => setToggelsettings(!toggelsettings)} className='dark:text-white text-black' />
                {/* {
                    toggelsettings &&
                    <>
                        <div className='absolute z-50 bottom-4 left-10 h-64 w-64 cursor-pointer bg-slate-300 dark:text-white  dark:bg-stone-900'>
                            <button onClick={handelClick}>Change theme</button>
                        </div>
                    </>

                } */}
                {
                    theme === "dark" ?
                        <BsFillMoonFill onClick={handelClick} size={25} />
                        : <BsSun onClick={handelClick} color='white' size={25} />
                }

                {currentUser?.photoURL ? (
                    <img className='w-7 h-7 rounded-full' src={currentUser?.photoURL} />
                ) : (
                    <FaRegUserCircle size={30} />
                    // <p>{currentUser?.displayName?.[0]}</p>
                )}
            </div>

        </div>
    );
}

export default SideNavBar;