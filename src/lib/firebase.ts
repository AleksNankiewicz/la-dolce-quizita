// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB8MyK65-9br257FGzUaZsI7YhChGMmtAE',
  authDomain: 'la-dolce-quizita.firebaseapp.com',
  projectId: 'la-dolce-quizita',
  storageBucket: 'la-dolce-quizita.appspot.com',
  messagingSenderId: '333069258006',
  appId: '1:333069258006:web:b6ac5a36547105b8669437',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export default app
