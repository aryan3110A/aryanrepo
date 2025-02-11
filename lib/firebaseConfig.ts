import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBV3bPXnhIY68jSubd0vxTxAzonYuh9LEw",
    authDomain: "contact-us-e86aa.firebaseapp.com",
    projectId: "contact-us-e86aa",
    storageBucket: "contact-us-e86aa.firebasestorage.app",
    messagingSenderId: "841315237009",
    appId: "1:841315237009:web:d50c985beef4f645bed330",
    measurementId: "G-77MK84Y56D"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
