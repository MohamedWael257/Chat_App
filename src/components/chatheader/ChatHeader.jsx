import { useState } from 'react';
import { useSelector } from 'react-redux';
import { authuser } from '../../redux/slice/authslice';
import { collectionGroup, deleteDoc, getDocs, query, where, } from "firebase/firestore";
import { db } from "../../firebase/config";
import { BsTelephone, BsCameraVideo } from 'react-icons/bs'
import { FiMoreHorizontal } from 'react-icons/fi'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
function Chatheader({ user }) {
    const { currentUser } = useContext(AuthContext)
    const [toggleMore, setToggleMore] = useState(false);

    const handleClearMessages = async () => {
        try {
            const messagesQuery = query(
                collectionGroup(db, "chats"),
                where("senderId", "in", [user?.uid, currentUser?.uid]),
                where("receiverId", "in", [user?.uid, currentUser?.uid])
            );
            const messagesSnapshot = await getDocs(messagesQuery);
            const deletePromises = messagesSnapshot.docs.map((doc) =>
                deleteDoc(doc.ref)
            );
            await Promise.all(deletePromises);
            setToggleMore(false);
        } catch (error) {
            console.error("Error clearing messages:", error);
        }
    };
    return (
        <div className="h-16 flex py-2 px-6 justify-between items-center bg-slate-100  dark:bg-stone-800  dark:text-white border-b dark:border-stone-700">
            <div className="flex items-center gap-3">
                {user.photoURL ? (
                    <img className='w-12 h-12 rounded-full' src={user.photoURL} />
                ) : (
                    <p>{user.displayName?.[0]}</p>
                )}
                <h4 className="font-semibold">{user.displayName}</h4>
            </div>
            <div className="flex items-center gap-8">
                <BsTelephone size={25} />
                <BsCameraVideo size={25} />
                <div>
                    <div
                        className={`cursor-pointer p-2 ${toggleMore ? "bg-slate-200  dark:bg-stone-800  " : ""
                            } rounded-full`}
                        onClick={() => setToggleMore(!toggleMore)}
                    >
                        <FiMoreHorizontal size={25} />
                    </div>
                    {toggleMore && (
                        <div className="absolute top-14 right-4 w-48 bg-white  dark:bg-stone-800   py-2 rounded shadow border z-10">
                            <div
                                className="cursor-pointer hover:bg-slate-100 dark:hover:bg-stone-800 py-2 px-5 text-slate-700    dark:text-white flex gap-2 items-center"
                                onClick={handleClearMessages}
                            >
                                Clear messages
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Chatheader;