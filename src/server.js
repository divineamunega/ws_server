import http from "http";
import app from "./app.js";
import { WebSocketServer } from "ws";
import { log } from "console";

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// My events should be
// create:client
// update:client
// read:client
// delete:client

wss.on("connection", (ws) => {
	ws.on("message", (message) => {
		let data;

		try {
			data = JSON.parse(message);
		} catch (err) {
			ws.send("Send events in json format only");
			return;
		}

		if (data.type === "create:client") {
			ws.send("Creating a database client");

			return;
		}

		if (data.type === "update:client") {
			ws.send("Updating a database client");

			return;
		}

		if (data.type === "read:client") {
			ws.send("Reading a database client");

			return;
		}

		if (data.type === "delete:client") {
			ws.send("deleting a database client");

			return;
		}

		ws.send(
			"This is not a valid event. Create events json with the feilds {type} and {data}"
		);

		return;
	});
});

const commonPrefix = function (array) {
	if (!array.length) return "";

	return array.reduce((prev, current) => {
		while (current.indexOf(prev) !== 0) {
			prev = prev.slice(0, -1);
			if (!prev) return "";
		}
		return prev;
	}, array[0]);
};

console.log(commonPrefix(["run", "ruger", "realize"]));
server.listen(3000, () => {
	console.log("Server started on port 3000");
});
