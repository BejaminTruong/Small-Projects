const clipboard = new ClipboardJS(".box");

clipboard.on("success", function (e) {
  console.info("Action:", e.action);
  console.info("Text:", e.text);
  console.info("Trigger:", e.trigger);
  alert(`Color: ${e.text} copied!`);
  e.clearSelection();
});

clipboard.on("error", function (e) {
  console.error("Action:", e.action);
  console.error("Trigger:", e.trigger);
});

for (let i = 0; i < 100; i++) {
  const box = document.createElement("div");
  box.classList.add("box");
  document.querySelector(".container").appendChild(box);
}

const CreateRandomHexColor = () => {
  const chars = "0123456789abcdef";
  const colorLength = 6;
  let color = "";

  for (let i = 0; i < colorLength; i++) {
    let randomColor = Math.floor(Math.random() * chars.length);
    color += chars.substring(randomColor, randomColor + 1);
  }
  return `#${color}`;
};

const btn = document.querySelector(".btn");
const boxes = document.querySelectorAll(".box");

const RefreshNewColors = () => {
  boxes.forEach((box) => {
    let newColor = CreateRandomHexColor();
    box.style.backgroundColor = newColor;
    box.innerHTML = newColor;
    box.setAttribute("data-clipboard-text", newColor);
  });
};
RefreshNewColors();

document.body.onkeydown = (e) => {
  preventDefault();
  if (e.code == "Space") RefreshNewColors();
};
