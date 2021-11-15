const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.render("/Users/kevingodoy/Desktop/9 ciclo/Sistemas Distribuidos/mensajeriaSocket/view/index.ejs");
});

io.sockets.on("connection", function(socket) {
  socket.on("username", function(username) {
    socket.username = username;
    io.emit("En_Linea", " <i>" + socket.username + " se ha unido al chat..</i>");
  });

  socket.on("disconnect", function(username) {
    io.emit(
      "En_Linea",
      "<i>" + socket.username + " ha dejado el chat ..</i>"
    );
  });

  socket.on("chat_message", function(message) {
    io.emit(
      "chat_message",
      "<strong>" + socket.username + "</strong>: " + message
    );
  });
});

const server = http.listen(8080, function() {
  console.log("oyendo en *:8080");
});