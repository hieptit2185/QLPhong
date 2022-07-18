import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCBg3Ua0ctANTv50_I9kLisI0Gkct9kHHI",
    authDomain: "uploading-d8a4e.firebaseapp.com",
    projectId: "uploading-d8a4e",
    storageBucket: "uploading-d8a4e.appspot.com",
    messagingSenderId: "857615683105",
    appId: "1:857615683105:web:4a43a2fe1557a7d42c9d60"
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)