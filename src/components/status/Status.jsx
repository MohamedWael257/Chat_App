import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authuser } from '../../redux/slice/authslice';
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import SideNavBar from '../sidenavbar/SideNavBar';
import SideStatus from '../sidestatus/SideStatus';
import MainContentStatus from '../Maincontentstatus/MainContentStatus';
import Loader from '../loader/Loader';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
function Status() {
    const { currentUser } = useContext(AuthContext)
    const [status, setStatus] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [loading, setLoading] = useState(true)

    // console.log(status);
    useEffect(() => {
        const q = query(collection(db, "status"), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const statusData = querySnapshot.docs.map((doc) => doc.data());
            setStatus(statusData);
            setLoading(false)
        });
        return () => unsubscribe();
        // const getstatus = async () => {
        //     setLoading(true)
        //     const statusCollection = collection(db, "status");
        //     const statusnapshot = await getDocs(statusCollection);
        //     const statusData = statusnapshot.docs.map((doc) => doc.data());
        //     setStatus(statusData);
        // }
        // setLoading(false)
        // getstatus();
    }, [])
    const handelStatusClick = (status) => {
        setSelectedStatus(status)
    }

    return (
        <>
            {loading && <Loader />}
            <div className='flex min-h-screen text-center bg-slate-100 max-w-[1435px] min-w-[850px] mx-auto'>
                {/* <div className="flex min-h-screen bg-slate-100 max-w-[1435px] min-w-[850px] mx-auto"> */}
                <div className=' w-[40px]'>
                    <SideNavBar />
                </div>
                <div className='bg-white lg:w-[400px] w-[300px] '>
                    <SideStatus
                        status={status}
                        selectedStatus={selectedStatus}
                        onStatusClick={handelStatusClick}
                    />
                </div>
                <div className={`${selectedStatus ? 'bg-slate-100  dark:bg-stone-800 ' : 'bg-slate-300'}  flex-1`}>
                    <MainContentStatus selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />

                </div>

            </div>
            {/* <p>{currentUser?.uid}</p> */}
            {/* <p>{currentUser?.displayName}</p> */}
            {/* <p>{currentUser?.email}</p> */}
            {/* <img src={currentUser.photoURL} alt="" /> */}
        </>
    );
}

export default Status;