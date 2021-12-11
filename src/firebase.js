// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore/lite';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBhkpwMJr7XjqmRsXgVgqQ9mePQg6IYlV4',
  authDomain: 'react-project-e29fb.firebaseapp.com',
  projectId: 'react-project-e29fb',
  storageBucket: 'react-project-e29fb.appspot.com',
  messagingSenderId: '363201276885',
  appId: '1:363201276885:web:85db9050b545c6e6526b5c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
