import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA5ddACYjOtaKcPqEeO5atMtyIgEeU0SDo",
    authDomain: "my-contacts-project-c6768.firebaseapp.com",
    projectId: "my-contacts-project-c6768",
    storageBucket: "my-contacts-project-c6768.appspot.com",
    messagingSenderId: "667365878420",
    appId: "1:667365878420:web:866aa891375b7ea7776281",
    measurementId: "G-FK0MWQD19F"
}

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db,
};