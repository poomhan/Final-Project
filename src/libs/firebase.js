import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyChdWrG9wkavKafr0GzNyrOqfyRPlJRxX8",
  authDomain: "exercise-diary-64bf2.firebaseapp.com",
  projectId: "exercise-diary-64bf2",
  storageBucket: "exercise-diary-64bf2.appspot.com",
  messagingSenderId: "665243892450",
  appId: "1:665243892450:web:36ac054f5ae3de84aafcbb"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
