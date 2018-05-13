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
        loadAllTodos(); 
        return;
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
		console.log(typeof res); 
		todosList = res; 
		createAllTodos(); 
		//console.log(todosList); 
	});
}


function createAllTodos(){

	var templateContent = document.getElementById("TableModal").content;
	
	var i = 0; 
	todosList.forEach(function(entry) {
		i++; 
		templateContent.querySelector("table").appendChild(buildToDo(entry, i)); 
	}); 
	mainArea.appendChild(document.importNode(templateContent, true));
}
function buildToDo(todoObject, i){
	//console.log("buildToDo", todoObject); 

	var todoModal = document.getElementById("ToDoModal").content;
	
	todoModal.querySelector("#todoID").setAttribute("name", todoObject.id); 
	todoModal.querySelector("#todoID").textContent = i;
	todoModal.querySelector("#description").textContent = todoObject.description;
	todoModal.querySelector("time").textContent = todoObject.date;
	todoModal.querySelector("div").textContent = todoObject.progress; 
	todoModal.querySelector("div").style.width = todoObject.progress; 

	return document.importNode(todoModal, true);
}

function makeEdit(e){
	var todo = e.parentNode.parentNode.parentNode; 
	
	todoA.id = todo.querySelector("#todoID").getAttribute("name");
	todoA.description = todo.querySelector("#description").textContent;
	todoA.date = todo.querySelector("time").textContent; 
	todoA.progress = todo.querySelector("div").textContent;  
	console.log(todoA.id, todoA.description, todoA.date, todoA.progress); 
}
function deleteToDo(e) {
	// body...
	var todo = e.parentNode.parentNode.parentNode; 
	var id = todo.querySelector("#todoID").getAttribute("name");
	console.log(id);
	var table = document.querySelector("#ToDoBody"); 
	table.removeChild(todo); 
	deleteTask(id, function(res){
		console.log(res); 
	});
}

function updateToDoForm() {
	
	var todoObject = {}; 

	todoObject.id = todoA.id; 
	todoObject.description = document.getElementById("inputText").value;
	todoObject.date = document.getElementById("deadline").value; 
	todoObject.progeress = document.getElementById("progress").value; 
	todoObject.finished = false; 

	updateTask(todoA.id, todoObject, function(res){
		console.log(res); 
	}); 
}

function addToDoForm(){
	
	var todoObject = {}; 

	todoObject.content = document.getElementById("inputText").value;
	todoObject.date = document.getElementById("deadline").value; 
	todoObject.progeress = 0; 
	todoObject.finished = false; 

	insertTask(todoObject, function(res){
		console.log(res); 
	}); 
}