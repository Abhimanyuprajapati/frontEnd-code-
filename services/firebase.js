import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCnzNYOZHURtBhiRqmdfA8grRJw6tOt5qk",
  authDomain: "filmcityi.firebaseapp.com",
  projectId: "filmcityi",
  storageBucket: "filmcityi.appspot.com",
  messagingSenderId: "769281147920",
  appId: "1:769281147920:web:5ddd0a42a34ccd897c7695",
  measurementId: "G-Y9Q8CV87XX"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
export const auth= getAuth(app);
//export default app;