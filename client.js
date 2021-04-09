const { Socket } = require("net");
const readline = require('readline').createInterface({
	input: process.stdin,
	output:process.stdout
});

const socket = new Socket();
socket.connect({ host: "localhost", port: 5000})
socket.setEncoding("utf-8")
readline.on("line", (line) => {
	process.stdout.write("Enter message: ")
	socket.write(line);
	if (line === "end") {
		socket.end();
		process.exit(0)
	}
})
socket.on("data", (data) => {
	console.log(data);
})
socket.on("connect", (socket) => {
	console.log("Connected to server!");
	process.stdout.write("Enter your username: ")
})
// 28:54