import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../logo/Logo';
import { auth, db } from "../../firebase/config";
import {
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { BsGoogle } from 'react-icons/bs'
import { doc, getDoc, setDoc } from 'firebase/firestore';
function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handelsignin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill out all the fields!");
            return;
        }
        setLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setLoading(false);
            toast.success("Signin successfully");
            navigate("/");
        } catch (error) {
            setLoading(false);
            toast.error(error);
        }
    }
    const handelsigningoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
                await setDoc(userDocRef, {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                });
            }
            toast.success("Signin successfully");
            // navigate("/");
        } catch (error) {
            // setLoading(false);
            toast.error(error);
        }
    };
    return (
        <>
            <ToastContainer />
            <div className='bg-stone-100 flex flex-col items-center justify-center min-h-screen  dark:bg-stone-800'>
                <div className='mb-8'>
                    <Logo />

                </div>
                <div className='bg-white w-[400px] text-slate-700 shadow rounded-lg p-8  dark:bg-stone-900  dark:text-white'>
                    <h4 className="text-2xl font-semibold text-center mb-5">Sign In</h4>
                    <form>
                        <input
                            type="email"
                            className="w-full border border-slate-300 shadow rounded py-2 px-4 mb-3"
                            value={email}
                            placeholder='Email Address'
                            onChange={(e) => { setEmail(e.target.value) }} />
                        <input
                            type="password"
                            className="w-full border border-slate-300 shadow rounded py-2 px-4 mb-3"
                            value={password}
                            placeholder='Password'
                            onChange={(e) => { setPassword(e.target.value) }} />
                        <button
                            type='submit'
                            className="w-full bg-emerald-500 text-white px-4 py-2 rounded shadow font-semibold"
                            onClick={handelsignin}
                        >
                            {`${loading ? `SignIn ....` : `Sign In`}`}
                        </button>
                    </form>
                    <p className="mt-3 text-center">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-emerald-500">
                            Signup
                        </Link>
                    </p>
                    <div className='flex items-center gap-3 my-5'>
                        <hr className='w-full border-slate-300' />
                        <p >OR</p>
                        <hr className='w-full border-slate-300' />
                    </div>
                    <button onClick={handelsigningoogle} className='flex bg-sky-500 text-white w-full justify-between py-2 px-4 rounded shadow font-semibold'>
                        <BsGoogle size={20} />
                        <span>Continue with Google</span>
                        <span></span>
                    </button>
                </div>
            </div>
        </>

    );
}

export default SignIn;