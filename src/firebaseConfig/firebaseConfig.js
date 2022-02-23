import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {

  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,

  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,

  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKED,

  messagingSenderId: process.env.REACT_APP_FIREBASE_MEDDAGING_SENDER_ID,

  appId: process.env.REACT_APP_FIREBASE_APP_ID

};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//initialize Firestore
export const db = getFirestore()
export const colRef = collection(db,'posts')

//initialize Firebase Authentication
export const auth = getAuth(app)

//initialize Firebase Storage
export const storage = getStorage(app)