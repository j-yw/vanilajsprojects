var canvas = document.querySelector("canvas");
var increaseBtn = document.querySelector(".increase");
var decreaseBtn = document.querySelector(".decrease");
var magicBtn = document.querySelector(".magicBtn");
var clearBtn = document.querySelector(".clear");
var sizeElement = document.querySelector(".size");
var colorElement = document.querySelector(".color");

var ctx = canvas.getContext("2d");
var size = 3;
var isPressed = false;
var color = "black";
var x = undefined;
var y = undefined;
var flip = true;

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function updateSizeOnScreen() {
  sizeElement.innerText = size;
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.lineWidth = size * 2;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.stroke();
}

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function magicSwitch() {
  flip = !flip;
  size = flip ? 3 : 1;
  color = flip ? "black" : "red";
}

canvas.addEventListener("mousedown", function handleMouseDown(e) {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", function handleMouseUp(e) {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", function handleMouseMove(e) {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    if (flip) {
      x = x2;
      y = y2;
    } else {
      ("");
    }
    updateSizeOnScreen();
  }
});

colorElement.addEventListener("change", function handleChange(e) {
  color = e.target.value;
});

increaseBtn.addEventListener("click", function handleClick() {
  size += 1;
  if (size > 99) {
    size = 99;
  }
  updateSizeOnScreen();
});

decreaseBtn.addEventListener("click", function handleClick() {
  size -= 1;
  if (size < 1) {
    size = 1;
  }
  updateSizeOnScreen();
});

magicBtn.addEventListener("click", function handleClick() {
  magicSwitch();
});

clearBtn.addEventListener("click", function handleClick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
