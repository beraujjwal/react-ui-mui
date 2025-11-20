/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging-compat.js");

const YOUR_API_KEY = 'AIzaSyBxQ9Q3wOTMJ9hFQ0A3hGXmyOaCe6ajA0I';
const YOUR_PROJECT_ID = 'csi-pros';
const YOUR_MESSAGING_SENDER_ID = '123340032768';
const YOUR_APP_ID = '1:123340032768:web:b7744866adfeef421001e5';

firebase.initializeApp({
  apiKey: YOUR_API_KEY,
  authDomain: `${YOUR_PROJECT_ID}.appspot.com`,
  projectId: YOUR_PROJECT_ID,
  storageBucket: `${YOUR_PROJECT_ID}.appspot.com`,
  messagingSenderId: YOUR_MESSAGING_SENDER_ID,
  appId: YOUR_APP_ID,
});

const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message: ", payload);
  const { title, body, icon } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon,
  });
});
