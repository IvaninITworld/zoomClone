// 맥 환경에서 사용하는 방식인 import express from "express" 대신 윈도우 환경에서 사용하는 방식으로 대체
const express = require("express");
// const WebSocket = require("ws");
const http = require("http");
const SocketIO = require("socket.io");

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
// 왜 req 대신 언더바(_)를 사용했는지 알아봐야겠음
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));
// app.listen(3001, handleListen);

// const handleListen = () => console.log(`Listening on http://localhost:3001`);
// const server = http.createServer(app);
// const wsServer = new WebSocket.Server({ httpServer });

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

function onSocketClose() {
  console.log("Disconnected from the Browser");
}

// 메세지를 담아두는 storage 가 없다면, 다른 브라우저에서는 해당 내용을 볼 수 없음
// 각 브라우저에서 보내는 정보들이 담기게 되는 배열 !!
// const sockets = [];

wsServer.on("connection", (socket) => {
  console.log(socket);
});

// wsServer.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "Anon";
//   console.log("connected to Browser!");
//   socket.on("close", onSocketClose);
//   socket.on("message", (msg) => {
//     const message = JSON.parse(msg);
//     switch (message.type) {
//       case "new_message":
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket.nickname}: ${message.payload}`)
//         );
//         break;
//       case "nickname":
//         socket["nickname"] = message.payload;
//         break;
//     }
//     // 전달 받아 담아뒀던 메세지를 꺼내서 보여줌 => 다른 브라우저에서 볼 수 가 있음!!
//   });
// });

// server.listen(3001, handleListen);

const handleListen = () => console.log(`Listening on http://localhost:3001`);
httpServer.listen(3001, handleListen);
