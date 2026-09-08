function createToaster(config) {
  return function (notification) {
    let div = document.createElement("div");
    div.className = `${config.theme === "dark" ? "dark" : "light"} box`;
    div.textContent = notification;

    const container = document.querySelector(".container");
    container.classList.add(
      config.positionX === "right" ? "right" : "left",
      config.positionY === "bottom" ? "bottom" : "top"
    );

    container.appendChild(div);
    setTimeout(() => div.remove(), config.duration * 1000);
  };
}