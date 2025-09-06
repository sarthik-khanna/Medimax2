import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBGnFE5T5SJNhZy7lCFTJHmAxR2x-jkfpA",
  authDomain: "medimax2-dd55b.firebaseapp.com",
  projectId: "medimax2-dd55b",
  storageBucket: "medimax2-dd55b.firebasestorage.app",
  messagingSenderId: "680043848202",
  appId: "1:680043848202:web:09963b4209e78bc947f5f3",
  measurementId: "G-W12DVDVH7G"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;