// import express from "express";
const express = require("express");
const WebSocket = require("ws");
const http = require("http");

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "public"));
app.get("/", (req, res) => res.render("home"));
app.get("*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3001`);
// app.listen(3001, handleListen);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// function handleConnection(socket) {
//   console.log(socket);
// }

function onSocketClose() {
  console.log("Disconnected from the Browser");
}

// 메세지를 담아두는 storage 가 없다면, 다른 브라우저에서는 해당 내용을 볼 수 없음
// 각 브라우저에서 보내는 정보들이 담기게 되는 배열 !!
const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anon";
  console.log("connected to Browser!");
  socket.on("close", onSocketClose);
  socket.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        );
        break;
      case "nickname":
        socket["nickname"] = message.payload;
        break;
    }
    // 전달 받아 담아뒀던 메세지를 꺼내서 보여줌 => 다른 브라우저에서 볼 수 가 있음!!
  });
});

server.listen(3001, handleListen);
