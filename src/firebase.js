import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Configuração otimizada para o projeto em São Paulo
const firebaseConfig = {
  apiKey: "AIzaSyBBhJYkeLUl6ZgRP9yP2sBAmzFbFO6x2Qc",
  authDomain: "auditoria-jogo.firebaseapp.com",
  projectId: "auditoria-jogo",
  storageBucket: "auditoria-jogo.firebasestorage.app",
  messagingSenderId: "134573059212",
  appId: "1:134573059212:web:afb57f5b13005b2e1a9fa9",
  // URL específica para instâncias em southamerica-east1
  databaseURL: "https://auditoria-jogo-default-rtdb.southamerica-east1.firebasedatabase.app"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta as instâncias necessárias
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getDatabase(app);