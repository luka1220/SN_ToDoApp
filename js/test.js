$(document).ready(() => {

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
