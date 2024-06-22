import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBoJIlfOsi2ta5oF7yQnfhdnR1mXv8FiDY",

    authDomain: "edutech-8c560.firebaseapp.com",
  
    projectId: "edutech-8c560",
  
    storageBucket: "edutech-8c560.appspot.com",
  
    messagingSenderId: "608307782347",
  
    appId: "1:608307782347:web:256571d162b6abbdf5714e"
  
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };