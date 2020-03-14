import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

const getConfig = () => {
  if (process.env.REACT_APP_ENVIRONMENT === 'production') {
    // return production app object
  }

  return {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: 'properti-f7424.firebaseapp.com',
    databaseURL: 'https://properti-f7424.firebaseio.com',
    projectId: 'properti-f7424',
    storageBucket: 'properti-f7424.appspot.com',
    messagingSenderId: '632773930886',
    appId: '1:632773930886:web:ff095754866a1527360607',
    measurementId: 'G-CMDQEP1CLK'
  };
};

firebase.initializeApp(getConfig());
firebase.auth();
firebase.storage();

export default firebase;
