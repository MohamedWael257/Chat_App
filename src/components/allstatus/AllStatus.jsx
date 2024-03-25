import { useState } from 'react';
import { useSelector } from 'react-redux';
import { authuser } from '../../redux/slice/authslice';
import { FaRegUserCircle } from 'react-icons/fa'
import { db } from "../../firebase/config";
import { deleteDoc, doc, } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
function AllStatus({ status, onStatusClick, selectedStatus }) {
    const [togglestory, setTogglestory] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const sortedStatus = [...status].sort((a, b) => {
        return a.authorName.localeCompare(b.authorName);
    });
    const deletestatus = async (statusId) => {
        try {
            onStatusClick(null)
            // console.log(statusId);
            const postRef = doc(db, "status", statusId);
            await deleteDoc(postRef);
            navigate('/status')
            setTogglestory(false)
            // window.location.reload()
        } catch (error) {
            console.log("Error deleting post:", error);
        }
    };
    const formatRelativeTime = (timestamp) => {
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        if (timestamp < minute) {
            return "now";
        } else if (timestamp < hour) {
            const minutes = Math.floor(timestamp / minute);
            return `${minutes}m`;
        } else if (timestamp < day) {
            const hours = Math.floor(timestamp / hour);
            return `${hours}h`;
        }
        else if (timestamp >= day) {
            sortedStatus.map((status) => {
                if ((Date.now() - status.timestamp.toDate()) >= day) {
                    deletestatus(status.statusId)
                }
            })
        }

    };

    return (
        <div className="overflow-y-auto h-[calc(100vh-64px)]  dark:bg-stone-800  dark:text-white p-2 relative">
            {sortedStatus.map((status) => {
                // if (status?.authorId === currentUser?.uid) {
                return (
                    <div
                        className={`relative ${status.authorId !== selectedStatus?.uid ? "bg-slate-200  dark:bg-stone-600  dark:text-white" : ""
                            } flex items-center gap-2 p-3 cursor-pointer rounded-lg my-4`}
                        key={status.authorId}
                    // onClick={() => onStatusClick(status)}
                    >
                        {status.image && (
                            <>
                                <img className='w-10 h-10 rounded-full' src={status.image}
                                    onClick={() => onStatusClick(status)}
                                />
                                <span className='block'
                                    onClick={() => onStatusClick(status)}
                                >
                                    {status.timestamp &&
                                        formatRelativeTime(Date.now() - status.timestamp.toDate())
                                    }
                                </span>

                            </>
                        )}
                        {/* {
                            status?.authorId === currentUser?.uid ?
                                <div>
                                    <h4>Your Story</h4>
                                </div>
                                :
                                <div>
                                    <h4>{status.authorName}</h4>
                                </div>
                        } */}
                        <div onClick={() => onStatusClick(status)}>
                            <h4>{status.authorName}</h4>
                        </div>
                        {
                            status?.authorId === currentUser?.uid &&
                            <>
                                <button onClick={() => { setTogglestory(!togglestory) }} className='-translate-y-1 translate-x-20' style={{ fontSize: '1.4rem' }}> ...</button>
                            </>
                        }
                        {togglestory && currentUser?.uid === status.authorId &&
                            (
                                <div className="absolute z-40 top-14 right-2 w-44 bg-white   dark:bg-stone-700 py-2 rounded shadow border">
                                    <div
                                        className="cursor-pointer hover:bg-slate-100  dark:hover:bg-stone-700 py-2 px-5 text-slate-700 dark:text-white flex gap-2 items-center"
                                        onClick={() => deletestatus(status.statusId)}
                                    >
                                        Remove
                                    </div>
                                </div>
                            )}
                    </div>
                );
                // }

            })}
        </div>
    );
}

export default AllStatus;