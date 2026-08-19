import React from "react";
import "./errorcustom.css";

function customealert(message, options = {}) {
  const {
    timeout = false,
    button = true,
    time = 3000
  } = options;

  const box = document.createElement("div");

  box.className = "custom-alert-box";

  const text = document.createElement("p");

  text.innerText = message;

  box.appendChild(text);

  if (button) {
    const btn = document.createElement("button");

    btn.innerText = "OK";

    btn.onclick = () => {
      box.remove();
    };

    box.appendChild(btn);
  }

  document.body.appendChild(box);

  if (timeout) {
    setTimeout(() => {
      box.remove();
    }, time);
  }
}

export default customealert;