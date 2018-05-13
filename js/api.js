let getAllTasks,
	getTask,
	insertTask,
	updateTask,
	deleteTask;

$(document).ready(() => {
	const ENDPOINT = "http://localhost:8080/tasks";

	getAllTasks = function(cb) {
		$.getJSON(`${ENDPOINT}`, res => cb && cb(res));
	}

	getTask = function(id, cb) {
		$.getJSON(`${ENDPOINT}/${id}`, res => cb && cb(res));
	}

	insertTask = function(task, cb) {
		task.description = task.description || "Placeholder"
		task.date = (task.date && new Date(task.date).toISOString()) || new Date().toISOString();
		$.ajax({
			type: "POST",
			url: `${ENDPOINT}`,
			data: JSON.stringify(task),
			success: res => cb && cb(res),
			dataType: "json"
		});
	}

	updateTask = function(id, task, cb) {
		task.date = (task.date && new Date(task.date).toISOString()) || new Date().toISOString();
		$.ajax({
			type: "PUT",
			url: `${ENDPOINT}/${id}`,
			data: JSON.stringify(task),
			success: res => cb && cb(res),
			dataType: "json"
		});
	}

	deleteTask = function(id, cb) {
		$.ajax({
			type: "DELETE",
			url: `${ENDPOINT}/${id}`,
			success: cb && cb(), // Endpoint does not return any data.
			dataType: "json"
		});
	}
});
