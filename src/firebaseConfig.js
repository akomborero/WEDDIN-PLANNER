// client/src/firebaseConfig.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <--- CHANGE THIS LINE: Import getFirestore

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXzRgY6kMNYCreFu-C53iHNL977hYxzsY",
  authDomain: "wedding-planner-b1065.firebaseapp.com",
  projectId: "wedding-planner-b1065",
  storageBucket: "wedding-planner-b1065.firebasestorage.app",
  messagingSenderId: "261192451004",
  appId: "1:261192451004:web:4336a0f96a43abf9c8e1b9",
  measurementId: "G-J5R0Y46JKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app); // <--- CHANGE THIS LINE: Initialize and EXPORT db