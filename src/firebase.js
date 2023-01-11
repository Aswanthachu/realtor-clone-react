import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCEL_FuJpuph4NsI_vWNolzoV01oqZ2niY",
  authDomain: "realtor-clone-react-b6bad.firebaseapp.com",
  projectId: "realtor-clone-react-b6bad",
  storageBucket: "realtor-clone-react-b6bad.appspot.com",
  messagingSenderId: "242622669636",
  appId: "1:242622669636:web:6a12a7f666a15138e86d11"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore();
