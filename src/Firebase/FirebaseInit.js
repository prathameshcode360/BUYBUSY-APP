import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCaSHDoDfA-75OsxHXiz6dEdPfXWjtfgk0",
  authDomain: "buybusy-bc109.firebaseapp.com",
  projectId: "buybusy-bc109",
  storageBucket: "buybusy-bc109.firebasestorage.app",
  messagingSenderId: "107474490450",
  appId: "1:107474490450:web:421517a524ae3271ca7b8b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
