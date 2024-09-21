
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyDBo4nwWu7ILUv9168CvFAgbHiYgDtb2SA",
  authDomain: "myecommerce-1bf85.firebaseapp.com",
  projectId: "myecommerce-1bf85",
  storageBucket: "myecommerce-1bf85.appspot.com",
  messagingSenderId: "812589172162",
  appId: "1:812589172162:web:f202464e8d2c1ba3c3c25b"
};


const app = initializeApp(firebaseConfig);

const fireDB=getFirestore(app);
const auth=getAuth(app);
export {auth,fireDB};
