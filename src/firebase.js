import firebase from "firebase/app";
import "firebase/database";

let config = {
  apiKey: "AIzaSyBNuvBYotqCl-xnIL9iihprnpZx4Kid9Vo",
  authDomain: "crud-2-35f76.firebaseapp.com",
  databaseURL: "https://crud-2-35f76-default-rtdb.firebaseio.com",
  projectId: "crud-2-35f76",
  storageBucket: "crud-2-35f76.appspot.com",
  messagingSenderId: "618486126448",
  appId: "1:618486126448:web:7729d07857857534dda1b5"
};

firebase.initializeApp(config);

export default firebase.database();
