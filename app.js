// npm start

import firebase from "firebase/app";
import "firebase/database";
import { firebaseConfig } from "./keys";

firebase.initializeApp(firebaseConfig);

const db = firebase.database(); 
const dbRef = firebase.database().ref();

// display existing films on page
dbRef.on('value', (data) => {
	const filmsData = data.val();
	const filmsArray = [];

	for (let film in filmsData) {
		const filmItem = document.createElement("li");
		const filmItemName = filmsData[film].name;
		const filmKey = film; // used for delete function
		const filmItemDate = filmsData[film].date;
		filmItem.className = "filmItem";
		filmItem.id = `${filmKey}`;
		filmItem.innerHTML = `
			 <p id="filmName">${filmItemName}</p>
			 <p id="loggedDate">${filmItemDate}</p>
			 <button class="removeButton" id="">
				 <i class="fa fa-trash-alt"></i>
			</button>
		`;
		document.getElementById("filmItemContainer").appendChild(filmItem);
		filmsArray.push(filmItem.outerHTML);
	};
	const filmItemContainer = document.getElementById("filmItemContainer");
	filmItemContainer.innerHTML = filmsArray.join("");
});

// get data from input and add to list when button is clicked
const filmForm = document.getElementById("filmForm");
filmForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const filmInput = document.getElementById("newFilmInput");
	const inputValue = filmInput.value;
	
	if (inputValue != "") {
		// write to an object that can be stored in firebase
		const displayDate = new Date().toDateString();
		const filmObject = {
			name: inputValue,
			date: `${displayDate}`
		}
		dbRef.push(filmObject);

		filmInput.value = "";
	}
});

// delete film item when button is clicked
filmItemContainer.addEventListener("click", (e) => {
	if ((e.target.tagName === "I") || (e.target.tagName === "BUTTON")) {
		let targetKey = e.target.closest(".filmItem").getAttribute("id");
		db.ref(`${targetKey}`).remove();
	}
});