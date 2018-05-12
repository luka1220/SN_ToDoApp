$(document).ready(() => {
	const ENDPOINT = "http://localhost:8080/tasks";

	function getAllTasks(cb) {
		$.getJSON(`${ENDPOINT}`, res => cb && cb(res));
	}

	function getTask(id, cb) {
		$.getJSON(`${ENDPOINT}/${id}`, res => cb && cb(res));
	}

	function insertTask(task, cb) {
		$.ajax({
			type: "POST",
			url: `${ENDPOINT}`,
			data: JSON.stringify(task),
			success: res => cb && cb(res),
			dataType: "json"
		});
	}

	function updateTask(id, task, cb) {
		$.ajax({
			type: "PUT",
			url: `${ENDPOINT}/${id}`,
			data: JSON.stringify(task),
			success: res => cb && cb(res),
			dataType: "json"
		});
	}

	function deleteTask(id, cb) {
		$.ajax({
			type: "DELETE",
			url: `${ENDPOINT}/${id}`,
			success: cb && cb(), // Endpoint does not return any data.
			dataType: "json"
		});
	}

	function runTests() {
		getAllTasks(res => console.log("GET ALL TASKS\n", JSON.stringify(res)));

		insertTask({
			description: "test Task"
		}, res => console.log("INSERT TASK\n", JSON.stringify(res)));

		getAllTasks(res => getTask(res[0].id, r => console.log(`GET SINGLE TASK ${res[0].id}\n`, JSON.stringify(r))));

		insertTask({
			description: "to be edited Task"
		}, res => {
			res.description = "edited";
			updateTask(res.id, res, r => console.log(`UPDATE SINGLE TASK ${res.id}\n`, JSON.stringify(r)));
		});

		insertTask({
				description: "to be deleted Task"
			}, res =>
			deleteTask(res.id, console.log(`DELETE TASK ${res.id}\n`, JSON.stringify(res)))
		);
	}

	// Runs tests. Open ../test.html and check console output for results. If no errors occur, the tests pass.
	runTests();
});
