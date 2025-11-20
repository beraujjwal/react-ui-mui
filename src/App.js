import React, { useEffect } from 'react';
import { themeObject } from './theme/themeVariables';
import { AppRouter } from './routers/AppRouter';
import { useAppSelector } from './hooks/reduxHooks';

import { messaging, getToken, onMessage } from "./utils/firebase";

function App() {
  const theme = useAppSelector((state) => state?.theme?.theme);
  const VAPPID_KEY = process.env.REACT_APP_FIREBASE_VAPPID_KEY;

  useEffect(() => {
    // Request permission to send notifications
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        console.log("Permission: ", permission);
        if (permission === "granted") {
          console.log("Notification permission granted.");
          const fcmToken = await getToken(messaging, {
            vapidKey: VAPPID_KEY, // From Firebase Cloud Messaging > Web Push certificates
          });
          if (fcmToken) {
            console.log("FCM Token:", fcmToken);
            // You can send this token to your server
          } else {
            console.log("No registration token available.");
          }
        } else {
          console.log("Notification permission denied.");
        }
      } catch (error) {
        console.error("An error occurred while retrieving token. ", error);
      }
    };

    requestPermission();

    // Foreground messages
    onMessage(messaging, (payload) => {
      console.log("Message received in foreground: ", payload);
      // show notification or update UI
    });
  }, []);


  return (
    <>
      <meta name="theme-color" content={themeObject[theme].primary} />
      <AppRouter />
    </>
  );
}

export default App;
