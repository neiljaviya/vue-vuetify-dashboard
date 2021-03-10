import firebase from 'firebase/app';
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDo1MJURnDA4bAwuOO5gmGX5iSNwt4hBng",
    authDomain: "vue-calendar-d6a05.firebaseapp.com",
    projectId: "vue-calendar-d6a05",
    storageBucket: "vue-calendar-d6a05.appspot.com",
    messagingSenderId: "193268396518",
    appId: "1:193268396518:web:4e55f6c87c140f82962627"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

db.settings({ timestampInSnapshots: true });

export default db;