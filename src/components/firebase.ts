import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyCmpMMb33KMiTUezEkSk3x52fG-dvJV6no",
    authDomain: "workshop-a908d.firebaseapp.com",
    databaseURL: "https://workshop-a908d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "workshop-a908d",
    storageBucket: "workshop-a908d.appspot.com",
    messagingSenderId: "1060000298381",
    appId: "1:1060000298381:web:6b058593a3b585716839c4",
    measurementId: "G-WN4XM5DSWY",
});
 
// Firebase storage reference
const storage = getStorage(app);
export default storage;