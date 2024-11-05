// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDHaI8vPDDu94zcd9x80IlpA9Y1rEkcXzM",
    authDomain: "leka-eea96.firebaseapp.com",
    projectId: "leka-eea96",
    storageBucket: "leka-eea96.firebasestorage.app",
    messagingSenderId: "1084809243437",
    appId: "1:1084809243437:web:0ab0d91ff4bf3f574e01a4"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
