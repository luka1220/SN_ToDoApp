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

    insertTemplate(location.hash.trim().substr(1));

});

window.addEventListener("hashchange", function () {
    insertTemplate(location.hash.trim().substr(1));
});

function insertTemplate(strPage) {
    var templateContent;

    // Wenn strPage leer, weil kein Hash, dann Willkommen setzen
    strPage = strPage || "index";

    clearContentArea();

    switch (strPage) {
    case "index":
        templateContent = document.getElementById("TableModal").content;
        headerOfPage.textContent = "Welcome to TODOs";
        loadAllTodos(templateContent); 
        break;
    case "demo":
    	templateContent = document.getElementById("EditModal").content;
        headerOfPage.textContent = "Please Update you Task";
        break;
    case "add-todo":
        templateContent = document.getElementById("AddModal").content;
        headerOfPage.textContent = "Add ToDo";
        break;
    case "impressum":
        templateContent = document.getElementById("ImpressumModal").content;
        headerOfPage.textContent = "Impressum";
        break;
    default: //anderer Hash
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
