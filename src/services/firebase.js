import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3wdtueNcV-fWQ8O3RwPcovwnjDq5Rpsw",
  authDomain: "taugor-aa560.firebaseapp.com",
  projectId: "taugor-aa560",
  storageBucket: "taugor-aa560.appspot.com",
  messagingSenderId: "1089510338504",
  appId: "1:1089510338504:web:80743c5a9713da9e9a9afd"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
export default app;
