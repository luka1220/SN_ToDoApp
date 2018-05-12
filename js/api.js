$(document).ready(() => {
	const ENDPOINT = "http://localhost:8080";

	function getAllTasks(cb) {
		$.getJSON(`${ENDPOINT}/tasks`,res => cb && cb(res));
	}

	function getTask(id, cb){
		$.getJSON(`${ENDPOINT}/tasks/${id}`, res => cb && cb(res));
	}

	function saveTask(task, cb){
		if (task.id) {
			return updateTask(task.id, task, cb);
		}
		return insertTask(task, cb);
	}

	function insertTask(task, cb){
		$.ajax({
			type: "POST",
			url: `${ENDPOINT}/tasks`,
			data: JSON.stringify(task),
			success: res => cb && cb(res),
			dataType: "json"
		});
	}

	function updateTask(id, task, cb){
		$.ajax({
			type: "POST",
			url: `${ENDPOINT}/tasks/${id}`,
			data: JSON.stringify(task),
			success: res => cb && cb(res),
			dataType: "json"
		});
	}

	function deleteTask(id, cb){
		$.ajax({
			type: "DELETE",
			url: `${ENDPOINT}/${id}`,
			success: cb && cb(), // Endpoint does not return any data.
			dataType: "json"
		});
	}

	/*function runTests() {
		getAllTasks(res => console.log("ALL TASKS\n",JSON.stringify(res)));
		saveTask({description: "test Task"}, res => console.log("SAVED TASK\n",JSON.stringify(res)));

		getAllTasks(res => getTask(res[0].id), "SINGLE TASK"+ res[0].id ",JSON.stringify(res));

	}

	runTests();*/
});
