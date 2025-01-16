// Importações necessárias
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Adiciona o Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Adiciona o Firestore
import { getAnalytics } from "firebase/analytics"; // Opcional: Firebase Analytics

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCXHAifnuZ4goMTo2JPWbrA6MBxiZnYSzs",
  authDomain: "ibgs-3960d.firebaseapp.com",
  projectId: "ibgs-3960d",
  storageBucket: "ibgs-3960d.appspot.com", // Corrigi o storageBucket
  messagingSenderId: "160145266253",
  appId: "1:160145266253:web:fadfd20f24e9f46af42e04",
  measurementId: "G-TQWCZQ88TS" // Opcional: Firebase Analytics
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa os serviços do Firebase
const auth = getAuth(app); // Firebase Authentication
const db = getFirestore(app); // Firestore (banco de dados)
const analytics = getAnalytics(app); // Opcional: Firebase Analytics

// Exporta os serviços para uso no projeto
export { auth, db, analytics };