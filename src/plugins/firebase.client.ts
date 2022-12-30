import { initializeApp } from "firebase/app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: config.public.FIREBASE_API_KEY,
    authDomain: "mehmetuysal-site.firebaseapp.com",
    projectId: "mehmetuysal-site",
    storageBucket: "mehmetuysal-site.appspot.com",
    messagingSenderId: "495759514182",
    appId: "1:495759514182:web:ccebdf47b1a9a377110847",
    measurementId: "G-1MGV3VPNC7"
  };

  // Initialize Firebase
  const clientApp = initializeApp(firebaseConfig);
});