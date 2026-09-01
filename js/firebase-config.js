const firebaseConfig = {
  apiKey: "AIzaSyCGPhF4jlVcJkwCn602gEVqI2V-FZXr_z0",
  authDomain: "expedicion-salvaje.firebaseapp.com",
  projectId: "expedicion-salvaje",
  storageBucket: "expedicion-salvaje.firebasestorage.app",
  messagingSenderId: "16886703024",
  appId: "1:16886703024:web:1b957e3703f9c90c5e6c75"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
