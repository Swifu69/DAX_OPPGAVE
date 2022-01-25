// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, onSnapshot, doc} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCiwjG7V0Cb7wCidH-EGnaCWFiY_m_1DY4",

  authDomain: "daxg-3fa2c.firebaseapp.com",

  projectId: "daxg-3fa2c",

  storageBucket: "daxg-3fa2c.appspot.com",

  messagingSenderId: "251709542267",

  appId: "1:251709542267:web:3ccc0718686e63a0c077de"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {
    db, collection, getDocs, app , addDoc , onSnapshot, doc
}
