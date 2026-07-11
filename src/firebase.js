import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC-8z0gtNKXua_Nm6WBRyA4GYph9_ppi9o",
  authDomain: "tita-rsvp-submissions.firebaseapp.com",
  projectId: "tita-rsvp-submissions",
  storageBucket: "tita-rsvp-submissions.firebasestorage.app",
  messagingSenderId: "114539331533",
  appId: "1:114539331533:web:b89b2fbdb883d3e0bc8e84",
  measurementId: "G-LEXSX5Y6S3"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
