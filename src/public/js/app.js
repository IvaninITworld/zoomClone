const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
// 주소값만 가져와
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

function handleOpen() {
  console.log("Connected to Server!");
}

socket.addEventListener("open", handleOpen);

// html 쪽에 ul 이라는 리스트공간을 지정해두고,
socket.addEventListener("message", (message) => {
  // 소켓을 통해 메세지가 데이터가 생성될 때마다 리스트에 엘레멘트를 만들어서 올려준다
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
  console.log("New message: ", message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server");
});

// 서버가 잘 열였으면 보내!
// setTimeout(() => {
//   socket.send("Hello from the browser!");
// }, 10000);

function handleSubmit(event) {
  // 초기회 되는 걸 막아주는 작업
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  const li = document.createElement("li");
  li.innerText = `You : ${input.value}`;
  messageList.append(li);
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
