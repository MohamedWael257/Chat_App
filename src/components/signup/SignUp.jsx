import { useId, useState } from "react";
import { auth, db, storage } from "../../firebase/config";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BsGoogle } from 'react-icons/bs'
import { v4 as uuid } from "uuid"
const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [photoimage, setPhotoimage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!firstName || !lastName || !email || !password) {
            setLoading(false)
            toast.error("Please fill out all the fields!");
            return;
        }
        try {
            if (photoimage) {
                const userId = uuid()
                const storageref = ref(storage, `photoimage/${userId}`)
                await uploadBytesResumable(storageref, photoimage)
                const downloadURL = await getDownloadURL(storageref)
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await updateProfile(user, {
                    // uid: `${userId}`,
                    displayName: `${firstName} ${lastName}`,
                    photoURL: downloadURL,
                });
                await setDoc(doc(db, 'users', user.uid), {
                    uid: user.uid,
                    email: user.email,
                    displayName: `${firstName} ${lastName}`,
                    photoURL: downloadURL,
                });
                toast.success("Signin successfully");
                setLoading(false)
                navigate('/')
            }
            // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // const user = userCredential.user;
            // if (photoimage) {
            //     const storageref = ref(storage, `photoimage/${user.uid}`)
            //     await uploadBytesResumable(storageref, photoimage)
            //     const downloadURL = await getDownloadURL(storageref)
            //     await updateProfile(user, {
            //         displayName: `${firstName} ${lastName}`,
            //         photoURL: downloadURL,
            //     });
            //     await setDoc(doc(db, 'users', user.uid), {
            //         uid: user.uid,
            //         email: user.email,
            //         displayName: `${firstName} ${lastName}`,
            //         photoURL: downloadURL,
            //     });
            //     // setLoading(false)
            //     // toast.success("add user successfully")
            // }
            else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await updateProfile(user, {
                    // uid:`${userId}`,
                    displayName: `${firstName} ${lastName}`,
                    photoURL: "",
                });
                await setDoc(doc(db, 'users', user.uid), {
                    uid: user.uid,
                    email: user.email,
                    displayName: `${firstName} ${lastName}`,
                    photoURL: "",
                });
                toast.success("Signin successfully");
                setLoading(false)
                navigate('/')
            }
            // setLoading(false)
            // toast.success("add user successfully")
            // navigate('/')
            // window.location.reload()
        }
        catch (err) {
            // setFirstName("")
            // setLastName("")
            // setEmail("")
            // setPassword("")
            // setPhotoimage(null)
            setLoading(false);
            toast.error(err.message)
        }
    };

    const handleGoogleSignup = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            });
            toast.success("add user successfully")
            // navigate("/");
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bg-slate-100 min-h-screen flex justify-center items-center flex-col  dark:bg-stone-800">
                <div className="mb-8">
                    <Logo />
                </div>
                <div className='bg-white w-[400px] text-slate-700 shadow rounded-lg p-8  dark:bg-stone-900  dark:text-white'>
                    <h4 className="text-2xl font-semibold text-center mb-5">SignUp</h4>
                    <form onSubmit={handleSignup}>
                        <div className="flex mb-3 gap-3">
                            <input
                                type="text"
                                className="w-full border border-slate-300 shadow rounded py-2 px-4"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                type="text"
                                className="w-full border border-slate-300 shadow rounded py-2 px-4"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <input
                            type="email"
                            className="w-full border border-slate-300 shadow rounded py-2 px-4 mb-3"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className="w-full border border-slate-300 shadow rounded py-2 px-4 mb-3"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label
                            htmlFor="profile"
                            className="cursor-pointer flex items-center gap-3 justify-center mb-3"
                        >
                            <p>Profile Image</p>
                            {photoimage && (
                                <img style={{ border: "3px solid white" }}
                                    className="w-14 h-14 rounded-full"
                                    src={URL.createObjectURL(photoimage)}
                                />
                            )}
                        </label>
                        <input
                            type="file"
                            id="profile"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => setPhotoimage(e.target.files[0])}
                        />
                        <button
                            type="submit"
                            className="w-full bg-emerald-500 text-white px-4 py-2 rounded shadow font-semibold"
                        >
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </form>
                    <p className="mt-3 text-center">
                        Already have an account?{" "}
                        <Link to="/signin" className="text-emerald-500">
                            Signin
                        </Link>
                    </p>
                    <div className="flex items-center gap-3 my-5">
                        <hr className="w-full border-slate-300" />
                        <p>OR</p>
                        <hr className="w-full border-slate-300" />
                    </div>
                    <button
                        className="flex bg-sky-500 text-white w-full justify-between py-2 px-4 rounded shadow font-semibold"
                        onClick={handleGoogleSignup}
                    >
                        {/* <GoogleIcon /> */}
                        <BsGoogle size={20} />
                        <span>Continue with Google</span>
                        <span></span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Signup;
