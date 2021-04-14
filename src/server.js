const path = require("path");
const express = require("express");

const app = express();

const port = process.env.PORT || 5000;

const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (request, response) => {
	let directory = path.join(__dirname, "..", "index.html");
	response.sendFile(directory);
});

// Opening a websocket communications
io.on("connection", (socket) => {
	socket.on("calculate", (message) => {
		io.emit("calculate", message); 
	});
});
http.listen(port, () => {
	console.log(`listening on http://localhost:${port}`);
});
