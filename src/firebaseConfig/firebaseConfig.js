import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {

  apiKey: "AIzaSyB5sQAzTZ3x5IdCNyxgXMCQhaC7HTjVwh0",

  authDomain: "social33-446c3.firebaseapp.com",

  projectId: "social33-446c3",

  storageBucket: "social33-446c3.appspot.com",

  messagingSenderId: "891056462235",

  appId: "1:891056462235:web:473ac6b715a27c2659a93e"

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