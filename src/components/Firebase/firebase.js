import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAglyqBZw-q0q9msDClwH7p8yAtO1yK3nw",
  authDomain: "react-hooks-c5630.firebaseapp.com",
  databaseURL: "https://react-hooks-c5630.firebaseio.com",
  projectId: "react-hooks-c5630",
  storageBucket: "react-hooks-c5630.appspot.com",
  messagingSenderId: process.env.SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;
