import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCXHAifnuZ4goMTo2JPWbrA6MBxiZnYSzs",
  authDomain: "ibgs-3960d.firebaseapp.com",
  projectId: "ibgs-3960d",
  storageBucket: "ibgs-3960d.appspot.com",
  messagingSenderId: "160145266253",
  appId: "1:160145266253:web:fadfd20f24e9f46af42e04",
  measurementId: "G-TQWCZQ88TS",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };