import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDsvw-PHZbaVCZh9mfHtoqqd4kzlcbmixE",
	authDomain: "film-buff-js.firebaseapp.com",
	projectId: "film-buff-js",
	storageBucket: "film-buff-js.appspot.com",
	messagingSenderId: "764538421266",
	appId: "1:764538421266:web:ce0c40b327c626ffc298cb",
	measurementId: "G-7JRH3SW11T"
};
firebase.initializeApp(firebaseConfig);


const onLoadHandler = () => {
};

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', onLoadHandler);
} else {
	onLoadHandler();
}
