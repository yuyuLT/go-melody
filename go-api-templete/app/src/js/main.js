
const url = "ws://" + window.location.host + "/ws";
const ws = new WebSocket(url);
const playerName = prompt('プレイヤー名を入力してください');

const chat = document.getElementById("chat");
const text = document.getElementById("text");

const now = () => {
    const date = new Date();
    const hour = pad(date.getHours().toString());
    const min = pad(date.getMinutes().toString());
    const sec = pad(date.getSeconds().toString());
    return `${hour}:${min}:${sec}`;
}

const pad = (str) => ('0' + str).slice(-2);

ws.onmessage = (msg) => {
    const line = now() + " " + msg.data + "\n";
    chat.innerText += line;
};

text.onkeydown = (e) => {
    if (e.keyCode === 13 && text.value !== "") {
        ws.send("<" + playerName + "> " + text.value);
        text.value = "";
    }
};