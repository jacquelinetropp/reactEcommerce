import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDKliRqYq880-tTsHuGvWfTFFEB0y9ifYQ",
  authDomain: "ecommerce-d5bd1.firebaseapp.com",
  databaseURL: "https://ecommerce-d5bd1.firebaseio.com",
  projectId: "ecommerce-d5bd1",
  storageBucket: "ecommerce-d5bd1.appspot.com",
  messagingSenderId: "726196633756",
  appId: "1:726196633756:web:9d5979d93e5458850aed59",
  measurementId: "G-NNYLX1EVH5",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
