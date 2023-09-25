import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBxZzDsOieGJ7a58UAtD2Uuw4LdZZ1QqXA",
  authDomain: "gym-tracker-f84e6.firebaseapp.com",
  projectId: "gym-tracker-f84e6",
  storageBucket: "gym-tracker-f84e6.appspot.com",
  messagingSenderId: "764620714397",
  appId: "1:764620714397:web:a52ddac4a5af3cc577ff74"
};

let app;

// Inizializza Firebase solo se non è già stato fatto
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };

