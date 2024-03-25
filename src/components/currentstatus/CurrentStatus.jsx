import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegUserCircle } from 'react-icons/fa'
import { v4 as uuid } from "uuid";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authuser } from '../../redux/slice/authslice';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import { FiShare } from "react-icons/fi"
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
function CurrentStatus({ status }) {
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)
    const [toggle, setToggle] = useState(false);
    const [showtoggle, setShowtoggle] = useState(false)
    const [image, setImage] = useState(null);
    const [imagePrev, setImagePrev] = useState(null);
    const [stories, setStories] = useState([])
    const [array, setArray] = useState([])
    const arr = [];
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        status.map(ele => {
            if (ele?.authorId === currentUser?.uid) {
                arr.push(ele.image)
            }
        })
        setArray(arr)
        setStories(array)
    }, [status])
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage.type !== "video/mp4") {
            setImage(selectedImage);
        }
        else {
            setImage(null)
        }
        if (selectedImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePrev(reader.result);
            };
            reader.readAsDataURL(selectedImage);
        } else {
            setImagePrev(null);
        }
    };

    const handlePostSubmit = async () => {
        if (!image) {
            return;
        }
        setLoading(true);
        let imageUrl = "";
        // let stories = []
        try {
            if (image) {
                const storageRef = ref(storage, image.name);
                await uploadBytesResumable(storageRef, image);
                imageUrl = await getDownloadURL(storageRef);
                // arr.push(imageUrl)
                // setArray([...array, imageUrl])
                // stories.push(imageUrl)
            }
            setStories(arr)
            const statusId = uuid();
            const docRef = doc(db, "status", statusId);
            await setDoc(docRef, {
                statusId: statusId,
                authorId: currentUser.uid,
                authorName: currentUser.displayName,
                image: imageUrl,
                type: image.type,
                timestamp: serverTimestamp(),
            });
            setImagePrev(null)
            setImage(null);
            setToggle(false)
            setShowtoggle(false);
            setLoading(false);
        } catch (error) {
            toast.error(error);
            setLoading(false);
        }
    };
    return (
        <>
            {/* {loading && <Loader />} */}
            <ToastContainer />
            <div className='relative h-16 bg-slate-100  dark:bg-stone-800 border-b border-slate-200 dark:border-stone-700 flex justify-between items-center px-2 py-4'>
                <div className="flex items-center gap-3">
                    {currentUser?.photoURL ? (
                        <img className='w-12 h-12 rounded-full' src={currentUser?.photoURL} />
                    ) : (
                        <FaRegUserCircle size={30} />
                        // <p>{currentUser?.displayName?.[0]}</p>
                    )}
                    <div>
                        <h4 className="font-semibold text-sm dark:text-white ">My Status</h4>
                        {/* <h4 className="font-light text-sm">No Updates</h4> */}
                    </div>

                </div>
                <div>
                    {
                        array.length !== 1 && array.length < 2 &&
                        (
                            < div
                                className={`cursor-pointer p-2 dark:text-white ${toggle ? "bg-slate-200 dark:bg-stone-700" : ""
                                    } rounded-full`}
                                onClick={() => setToggle(!toggle)}
                            >
                                ...
                            </div>
                        )
                    }

                    {/* <div
                        className={`cursor-pointer p-2 ${toggle ? "bg-slate-200" : ""
                            } rounded-full`}
                        onClick={() => setToggle(!toggle)}
                    >
                        ...
                    </div> */}
                    {toggle && (
                        <div className="absolute z-50 top-140 right-4 w-44 bg-white text-black  dark:bg-stone-700  dark:text-white py-2 rounded shadow border">
                            <div
                                className="cursor-pointer  hover:bg-slate-100 dark:hover:bg-stone-700  py-2 px-5 text-slate-700 dark:text-white  flex gap-2 items-center"
                                onClick={() => {
                                    setShowtoggle(true)
                                    setToggle(false)
                                }}
                            >
                                Add Story
                            </div>
                        </div>
                    )}
                    {
                        showtoggle &&
                        <div className="fixed z-50 top-0 right-0 w-screen h-screen bg-black opacity-80">
                            <div className="cursor-pointer  py-2 px-5 text-white flex justify-center gap-2 items-center">
                                <div className="my-5">
                                    {imagePrev && (
                                        <div className="flex justify-center mb-5 md:mb-[-50px]">
                                            {
                                                image ?
                                                    <img
                                                        src={imagePrev}
                                                        className="max-h-[40vh] md:max-h-40 max-w-[100%]"
                                                    />
                                                    : <video
                                                        autoPlay
                                                        src={imagePrev}
                                                        className="max-h-[40vh] md:max-h-40 max-w-[100%]"
                                                    />
                                            }
                                        </div>
                                    )}
                                    <label
                                        htmlFor="file"
                                        className="inline-block text-black bg-gray-50 p-4 rounded-full cursor-pointer hover:shadow"
                                    >
                                        <FiShare size={25} />
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        accept="image/*,video/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </div>
                                <button onClick={handlePostSubmit} disabled={loading}>
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <span>sharing</span>
                                            {/* <img src={Loader} className="w-4" /> */}
                                        </div>
                                    ) : (
                                        "share"
                                    )}
                                </button>
                                <button onClick={() => {
                                    setShowtoggle(false)
                                    setImagePrev(null)
                                    setImage(null);
                                }}>X</button>
                            </div>
                        </div>
                    }
                </div>
            </div >
        </>
    );
}

export default CurrentStatus;