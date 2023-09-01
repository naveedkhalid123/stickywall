import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {



    apiKey: "AIzaSyBlC2EklJlpK8IhuT2IvbgeVXvDuroJ4-M",
    authDomain: "sticky-wall-4784f.firebaseapp.com",
    projectId: "sticky-wall-4784f",
    storageBucket: "sticky-wall-4784f.appspot.com",
    messagingSenderId: "578448579067",
    appId: "1:578448579067:web:7a722112fe3a24a509135e",
    measurementId: "G-GJ6W58KZT4"

   
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {analytics, auth, firestore, storage}




