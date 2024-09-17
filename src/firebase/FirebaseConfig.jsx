
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyAmscsIF0MYel7Z6K1gEBFFJttLzcnXw8E",
  authDomain: "ecommerce-c6ae9.firebaseapp.com",
  projectId: "ecommerce-c6ae9",
  storageBucket: "ecommerce-c6ae9.appspot.com",
  messagingSenderId: "895989030531",
  appId: "1:895989030531:web:393844dd1e6c6f670885b6"
};


const app = initializeApp(firebaseConfig);
const fireDB=getFirestore(app);
const auth=getAuth(app);
export {fireDB,auth};