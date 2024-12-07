// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUFzi4309JoI3d68cuhs7D_IqZVnyKz6Y",
  authDomain: "hotel-managment-99.firebaseapp.com",
  projectId: "hotel-managment-99",
  storageBucket: "hotel-managment-99.firebasestorage.app",
  messagingSenderId: "469047331682",
  appId: "1:469047331682:web:e05508582c70be98d23a3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;