import Vue from "vue"
import firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBd41tkeLLH5DzEV_crBBSFfGRXzW-HQ0I",
  authDomain: "galagal-egg.firebaseapp.com",
  projectId: "galagal-egg",
  storageBucket: "galagal-egg.appspot.com",
  messagingSenderId: "961769833824",
  appId: "1:961769833824:web:60820848b2ddd966c68a05",
  measurementId: "G-CF36DNY3GW",
}

firebase.initializeApp(firebaseConfig)

const initialUserState = {
  uid: "",
  displayName: "",
  photoURL: "",
}
const $auth = Vue.observable({
  currentUser: { ...initialUserState },
})
firebase.auth().onAuthStateChanged((user) => {
  let state
  if (user) {
    const { uid, displayName, photoURL } = user
    state = {
      uid,
      displayName,
      photoURL,
    }
  } else {
    state = initialUserState
  }
  Object.assign($auth.currentUser, state)
})
Vue.prototype.$auth = $auth

