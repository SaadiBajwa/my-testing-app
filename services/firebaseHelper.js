import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCzH1FtzzNVVrIW1Vkp-vC_CXqqC7E3egg",
  authDomain: "test-68c6a.firebaseapp.com",
  projectId: "test-68c6a",
  storageBucket: "test-68c6a.appspot.com",
  messagingSenderId: "102022799293",
  appId: "1:102022799293:web:1e233fd29c0fbc8ce5bcd4",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
