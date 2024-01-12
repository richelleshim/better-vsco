import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBBsgOXQ6qrkanFItm1MpCj-rbg1VdWCgw",
    authDomain: "better-vsco.firebaseapp.com",
    projectId: "better-vsco",
    storageBucket: "better-vsco.appspot.com",
    messagingSenderId: "586320064371",
    appId: "1:586320064371:web:cca4ce5c7041a91db25f06",
    measurementId: "G-GJ6SLJDXH4"
  };

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
