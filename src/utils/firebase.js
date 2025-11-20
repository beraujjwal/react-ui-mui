// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';

// const firebaseConfig = {
//   apiKey: '_firebase_api_key_',
//   authDomain: '_somewebsite_.firebaseapp.com',
//   databaseURL: 'https://_somewebsite_-default-rtdb.firebaseio.com',
//   projectId: '_somewebsite_',
//   storageBucket: '_somewebsite_.appspot.com',
//   messagingSenderId: '12345',
//   appId: '1:12345:web:abcde123',
//   measurementId: 'G-ABCD',
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// export default firebase;


// firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
console.log(process.env);

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const MESSAGING_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const APP_ID = process.env.REACT_APP_FIREBASE_APP_ID;
const MEASUREMENT_ID = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID;

// const firebaseConfig = {
//   apiKey: YOUR_API_KEY,
//   authDomain: `${YOUR_PROJECT_ID}.appspot.com`,
//   projectId: YOUR_PROJECT_ID,
//   storageBucket: `${YOUR_PROJECT_ID}.appspot.com`,
//   messagingSenderId: YOUR_MESSAGING_SENDER_ID,
//   appId: YOUR_APP_ID,
// };

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: `${PROJECT_ID}.appspot.com`,
  projectId: PROJECT_ID,
  storageBucket: `${PROJECT_ID}.appspot.com`,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};
console.log("firebaseConfig: ", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Messaging
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
