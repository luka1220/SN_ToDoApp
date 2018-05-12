/*import React, { Component } from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <TodoList todos={['red','blue']} />,    
  document.getElementById('container')
);

{
	"id": "id",
	"description": "Task Description",
	"date": "0001-01-01T00:00:00Z",
	"progress": 100,
	"finished": false
}
*/

var todoA = {}; 
todoA.id = 0;
todoA.description = "Please put your Task her";
todoA.date = "2018-06-27"
todoA.progress = 0; 
todoA.finished = false;

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
        headerOfPage.textContent = "Welcome to TODOs"
        templateContent = createAllTodos(); 
        break;
    case "demo":
    	$("nav li:nth-child(2)").className = "active";
    	templateContent = document.getElementById("EditModal").content;
        headerOfPage.textContent = "Please Update you Task";
        mainArea.appendChild(document.importNode(templateContent, true));
        setmakeEdit(); 
        return;
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

function setmakeEdit(){

	console.log(todoA.description, todoA.progress); 


	document.getElementById("inputText").textContent = todoA.description; 
	document.getElementById("deadline").value = todoA.date; 
	document.getElementById("progress").value = todoA.progress; 
}

function loadAllTodos(){
	getAllTasks(function(res){
		todosList = res; 
		console.log(todosList); 
	}); 
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
	var todoModal = document.getElementById("ToDoModal").content; 
	var row1 = todoModal.firstElementChild.querySelectorAll("td"); 
	var row2 = todoModal.lastElementChild.querySelectorAll("td"); 
	
	row1[0].textContent = "1.";
	row1[1].textContent = todoObject.discription;
	row2[0].firstElementChild.textContent = todoObject.date; 
	row2[1].firstElementChild.firstElementChild.textContent = todoObject.progress; 
	row2[1].querySelector("div").style.width=todoObject.progress; 

	return document.importNode(todoModal, true);; 
}

function makeEdit(e){
	var todo = e.parentNode.parentNode.parentNode; 

	var row1 = todo.firstElementChild.querySelectorAll("td"); 
	var row2 = todo.lastElementChild.querySelectorAll("td"); 
	
	todoA.id = row1[0].textContent;
	todoA.description = row1[1].textContent;
	todoA.date = row2[0].querySelector("time").textContent; 
	todoA.progress = row2[1].firstElementChild.textContent; 
	console.log(todoA.id, todoA.description, todoA.date, todoA.progress); 
}
function deleteToDo(e) {
	// body...
	var todo = e.parentNode.parentNode.parentNode; 
	var id = todo.querySelector("todoID").value; 
	document.removeChild(todo); 
	deleteTask(id, function(res){
		console.log(res); 
	});
}

function updateToDoForm() {
	
	var formular = document.forms["editToDoF"];
	var todoObject = {}; 

	todoObject.id = formular.name; 
	todoObject.description = formular.getElementById("inputText").value;
	todoObject.date = formular.getElementById("deadline").value; 
	todoObject.progeress = formular.getElementById("progress").value; 
	todoObject.finished = false; 

	updateTask(todoObject, function(res){
		console.log(res); 
	}); 
}

function addToDoForm(){
	
	var formular = document.forms["addToDoF"];
	var todoObject = {}; 

	todoObject.content = formular.getElementById("inputText").value;
	todoObject.date = formular.getElementById("deadline").value; 
	todoObject.progeress = 0; 
	todoObject.finished = false; 

	insertTask(todoObject, function(res){
		console.log(res); 
	}); 
}