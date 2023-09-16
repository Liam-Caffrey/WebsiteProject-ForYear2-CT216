import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCiunfcRK7x-KF3rFgWESohCyKeDISzsw4",
    authDomain: "cliffordle.firebaseapp.com",
    databaseURL: "https://cliffordle-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cliffordle",
    storageBucket: "cliffordle.appspot.com",
    messagingSenderId: "607168236195",
    appId: "1:607168236195:web:9815b1803c0ec6266ccd16",
    measurementId: "G-EJBYSLQ7TG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;