import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCuqQL398kSJUp7QZlSE8bGMjFwL308l6w',
  authDomain: 'dedikoduyay.firebaseapp.com',
  projectId: 'dedikoduyay',
  storageBucket: 'dedikoduyay.appspot.com',
  messagingSenderId: '1041379395175',
  appId: '1:1041379395175:web:bfdfb3bf6f4a5e4ca6b6c2',
  measurementId: 'G-BGRZWZY6C6'
}

// Initialize Firebase
export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
