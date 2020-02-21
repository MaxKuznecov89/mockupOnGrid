import Button from "./Button.js";
// import {Driver} from "./Driver.js";
// import {Timer} from "./Timer.js";
// import {Observable} from "./Observable.js";



// let configButton = {
// 	type:"start",
// 	targetButton:document.querySelector(".start")
// };
// let configHandlerEvent = {
// 	nameEvent: "click",
// 	handler: function (event) {
//
// 	}
// };
let startButton = document.createElement("button");
startButton.classList.add("start");

let configButton = {
	type:"start" ,
	targetButton: startButton
};
let instanceButton = new Button(configButton);
console.dir(configButton.targetButton);







































