import { initializeApp, getApp, getApps } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAQCRd174RPgEMmdBhdBVbWUkRCkUo7xWU",
  authDomain: "dashboard-test-42c50.firebaseapp.com",
  projectId: "dashboard-test-42c50",
  storageBucket: "dashboard-test-42c50.firebasestorage.app",
  messagingSenderId: "602908807104",
  appId: "1:602908807104:web:1db55a9fdda5d58a200225",
  measurementId: "G-VD50NZ6X0Y"
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export default app;
