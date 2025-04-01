import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBpvzfC26w9XbtJi5IDZxlniqAlNqTcVQ8",
  authDomain: "mypeepsapp-d408c.firebaseapp.com",
  projectId: "mypeepsapp-d408c",
  storageBucket: "mypeepsapp-d408c.firebasestorage.app",
  messagingSenderId: "455383640629",
  appId: "1:455383640629:web:c9eecd533e01ac496e9f7c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 