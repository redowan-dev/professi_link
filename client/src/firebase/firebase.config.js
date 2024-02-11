// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {Database} from 'firebase/database';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAkeVKGbbsn_CTNI7AdnwHpX5LarKnd1xM",
  authDomain: "professilink1.firebaseapp.com",
  projectId: "professilink1",
  storageBucket: "professilink1.appspot.com",
  messagingSenderId: "31084051992",
  appId: "1:31084051992:web:88d2aded4069f2bbdfcd6d",
  measurementId: "G-7JTXKH7SH1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app)

