console.error("Hello World")
const { Server } = require("net");
const server = new Server();
var username = "";
var socket_list = [];
server.on("connection", (socket) => {
	console.log("Someone connected! IP:", socket.remoteAddress);
	socket.setEncoding("utf-8");
	socket.on("data", (data) => {
		if (data.toLowerCase() === "end") {
			socket.end();
		}
		else if (socket_list.includes(socket)) {
			console.log(`${username} = ${data}`)
			socket_list.forEach((sock) => {
				if (socket != sock) {
					sock.write(data);
				}
			})
		}
		else {
			username = data;
			socket_list.push(socket)
			console.log("Username registered!");
			
		}
	})
});
server.listen({port: 5000, host: "0.0.0.0"}, () => {
	console.log("Listening on port 5000")
})
// 28:54