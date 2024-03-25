import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyCcTdBqj8uo0kGRCTpIaARGeH8Zbc2hWQg",
    authDomain: "chatapp-6581b.firebaseapp.com",
    projectId: "chatapp-6581b",
    storageBucket: "chatapp-6581b.appspot.com",
    messagingSenderId: "404971613319",
    appId: "1:404971613319:web:a3b836263d7f7e110edc22",
    measurementId: "G-EL6ZT7DSQ3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;