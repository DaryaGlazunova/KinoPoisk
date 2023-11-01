import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCcp-qIqZKsrrsOJ9E92gMOQ6tab0If5d4",
  authDomain: "films-d550f.firebaseapp.com",
  projectId: "films-d550f",
  storageBucket: "films-d550f.appspot.com",
  messagingSenderId: "355726331085",
  appId: "1:355726331085:web:7cee28950bd2039a956d84",
  measurementId: "G-JRB4MG513H",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
