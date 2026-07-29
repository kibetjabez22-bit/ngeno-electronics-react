// Import the functions you need from the SDKs you need
import{getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANhP31qnCRIOB6TpKJGh6kfTXqCaJ73xg",
  authDomain: "ngenos-electronics.firebaseapp.com",
  projectId: "ngenos-electronics",
  storageBucket: "ngenos-electronics.appspot.com",
  messagingSenderId: "226948315680",
  appId: "1:226948315680:web:ee4ecf25e786b7287f1a45",
  measurementId: "G-N6T4YHRKYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);  

export default app; 