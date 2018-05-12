/*import React, { Component } from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <TodoList todos={['red','blue']} />,    
  document.getElementById('container')
);*/

var todosList = [];
var headerOfPage, mainArea;

document.addEventListener("DOMContentLoaded", function () {
	headerOfPage = document.getElementById("HeaderOfPage"); 
	mainArea = document.querySelector("main");
	document.querySelector("li.active").className = "";

    insertTemplate(location.hash.trim().substr(1));

});

window.addEventListener("hashchange", function () {
	console.log("hash changed"); 

    insertTemplate(location.hash.trim().substr(1));
});

function insertTemplate(strPage) {
    var templateContent;

    var nav = document.querySelector(".nav"); 
    // Wenn strPage leer, weil kein Hash, dann Willkommen setzen
    strPage = strPage || "index";

    clearContentArea();

    switch (strPage) {
    case "index":
    	$("nav li:nth-child(1)").className = "active";
        headerOfPage.textContent = "Welcome to TODOs";
        templateContent = createAllTodos(); 
        break;
    case "demo":
    	$("nav li:nth-child(2)").className = "active";
    	templateContent = document.getElementById("EditModal").content;
        headerOfPage.textContent = "Please Update you Task";
        break;
    case "add-todo":
    	$("nav li:nth-child(3)").className = "active";
        templateContent = document.getElementById("AddModal").content;
        headerOfPage.textContent = "Add ToDo";
        break;
    case "impressum":
    	$("nav li:nth-child(4)").className = "active";
        templateContent = document.getElementById("ImpressumModal").content;
        headerOfPage.textContent = "Impressum";
        break;
    default: //anderer Hash
    	$("nav li:nth-child(1)").className = "active";
        templateContent = document.getElementById("TableModal").content;
        headerOfPage.textContent = "Welcome to TODOs";
        break;
    }

    mainArea.appendChild(document.importNode(templateContent, true));
}


// Entferne alle Elemente aus der Main-Area und den JumboTron-Button
function clearContentArea() {
    while (mainArea.hasChildNodes()) {
        mainArea.removeChild(mainArea.lastChild);
    }

    //Wenn im Jumbotron ein Button enthalten ist, dann lösche ihn
    /*var jumboTronButton = jumboTron.getElementsByTagName("button");
    if (jumboTronButton.length > 0) {
        jumboTron.removeChild(jumboTronButton[0]);
    }*/
}
function loadAllTodos(){

}
function createAllTodos(){

	loadAllTodos(); 

	templateContent = document.getElementById("TableModal").content;
	todosList.forEach(function(entry) {
		templateContent.appendChild(buildToDo()); 
	}); 

	return templateContent; 

}
function buildToDo(todoObject){
	var todoModal = document.getElementById("ToDoModal"); 
	var row1 = todoModal.firstElementChild.querySelectorAll("td"); 
	var row2 = todoModal.lastElementChild.querySelectorAll("td"); 
	
	row1[0].textContent = "1.";
	row1[1].textContent = todoObject.content;
	row2[0].firstElementChild.textContent = todoObject.deadline; 
	row2[1].firstElementChild.firstElementChild.textContent = todoObject.prozentage; 
	row2[1].querySelector("div").style.width=todoObject.prozentage; 

	return document.importNode(todoModal, true);; 
}

function deleteToDo(argument) {
	// body...

}
function updateToDoForm(argument) {
	// body...
}
function addToDoForm(argument){
	var formular = document.forms["addToDoF"];
	var todoObject = {}; 

	todoObject.content = document.getElementById("InputText"); 
}