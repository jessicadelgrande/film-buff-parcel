// npm start

import firebase from "firebase/app";
import "firebase/database";
import { firebaseConfig } from "./keys";

firebase.initializeApp(firebaseConfig);

const db = firebase.database(); 
const dbRef = firebase.database().ref();
// const filmsDb = dbRef.collection("films");
// console.log("ref", dbRef);

dbRef.on('value', (data) => {
	const filmsData = data.val();
	const filmsArray = [];

	for (let film in filmsData) {
		const filmItem = document.createElement("li");
		const filmItemName = filmsData[film].name;
		console.log("name", filmItemName);
		// const loggedDate = dbRef.setValue(ServerValue.TIMESTAMP);
		// console.log("logged date", loggedDate);
		const filmItemDate = filmsData[film];
		console.log("date", filmItemDate);
		filmItem.className = "filmItem";
		// filmItem.id = filmsData[film].id; // to be able to target item for delete
		filmItem.innerHTML = `
			 <p id="filmName">${filmItemName}</p>
			 <p id="loggedDate">${filmItemDate}</p>
			 <button id="removeButton">
				 <i class="fa fa-trash-alt"></i>
			</button>
		`;
		document.getElementById("filmItemContainer").appendChild(filmItem);
		filmsArray.push(filmItem.outerHTML);
	};
	const filmItemContainer = document.getElementById("filmItemContainer");
	filmItemContainer.innerHTML = filmsArray.join("");
});

// get data from input
const filmForm = document.getElementById("filmForm");
// click handler
filmForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const filmInput = document.getElementById("newFilmInput");
	const inputValue = filmInput.value;
	console.log("clicked");
	
	if (inputValue != "") {
		console.log("value", inputValue);
		// write to an object that can be stored in firebase
		// const datestamp = new Date();
		const filmObject = {
			name: inputValue
			// date: datestamp
		}
		console.log("obj", filmObject);
		dbRef.push(filmObject);

		filmInput.value = "";
	}
});