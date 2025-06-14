// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjHk5CXOUzOLhiWtDccPBWxJ7fJfqBZ8c",
  authDomain: "food-expiry-tracker-2b052.firebaseapp.com",
  projectId: "food-expiry-tracker-2b052",
  storageBucket: "food-expiry-tracker-2b052.firebasestorage.app",
  messagingSenderId: "695062081059",
  appId: "1:695062081059:web:23d2d4c6a6ef1f53618b96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);