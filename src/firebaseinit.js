// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBvqoOtpw1kg3O-EvFaV7EbQEjALEfwCBk',
  authDomain: 'vuetodo-f233b.firebaseapp.com',
  projectId: 'vuetodo-f233b',
  storageBucket: 'vuetodo-f233b.firebasestorage.app',
  messagingSenderId: '538292172133',
  appId: '1:538292172133:web:7124b503c2fdd603095d8c',
  measurementId: 'G-MDJJLWBWXM',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export default db
