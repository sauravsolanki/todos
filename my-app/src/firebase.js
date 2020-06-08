import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { functions } from "firebase";

 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyDXLj-mj0MtT8lLxsvgnuctQoFO260vsHQ",
  authDomain: "learnauth-ff05d.firebaseapp.com",
  databaseURL: "https://learnauth-ff05d.firebaseio.com",
  projectId: "learnauth-ff05d",
  storageBucket: "learnauth-ff05d.appspot.com",
  messagingSenderId: "201488510488",
  appId: "1:201488510488:web:288740ce479188abe95d6d",
  measurementId: "G-6ZDDE9VD7T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = (props) => {
  auth.signInWithPopup(provider).then(
    localStorage.setItem('userloggedin', true)
  )
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      }).then(
        localStorage.setItem("user",user)
      );
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
