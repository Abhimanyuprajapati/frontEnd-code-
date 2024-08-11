import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCAh5NnLGx1Qy0_UO9QhE_0f-zgFEjRHbE",
  authDomain: "jalva-54b90.firebaseapp.com",
  projectId: "jalva-54b90",
  storageBucket: "jalva-54b90.appspot.com",
  messagingSenderId: "587682418760",
  appId: "1:587682418760:web:31930130ebb6ffe1e2087d",
  measurementId: "G-2E96Y86T68"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
export const auth= getAuth(app);
//export default app;