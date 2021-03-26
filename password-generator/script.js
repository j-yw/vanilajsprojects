var pwElement = document.querySelector(".pw");
var copyBtnElement = document.querySelector(".copy-btn");
var pwLengthElement = document.querySelector("#pw-length");
var upperElement = document.querySelector("#upper");
var lowerElement = document.querySelector("#lower");
var numberElement = document.querySelector("#number");
var symbolElement = document.querySelector("#symbol");
var generateBtnElement = document.querySelector(".generate-btn");
var upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lowerLetters = "abcdefghijklmnopqrstuvwxyz";
var numbers = "0123456789";
var symbols = "!@#$%^&*()_+";

numberElement.disabled = true;

function getUpperLetters() {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}
function getLowerLetters() {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}
function getNumbers() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}
function getSymbols() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
  var length = pwLengthElement.value;
  var password = "";

  if (upperElement.checked) {
    password += getUpperLetters();
  }
  if (lowerElement.checked) {
    password += getLowerLetters();
  }
  if (numberElement.checked) {
    password += getNumbers();
  }
  if (symbolElement.checked) {
    password += getSymbols();
  }

  for (let i = password.length - 1; i < length; i++) {
    var x = generateX();
    password += x;
  }
  pwElement.innerText = password;
  return password;
}

function generateX() {
  var xs = [];
  if (upperElement.checked) {
    xs.push(getUpperLetters());
  }
  if (lowerElement.checked) {
    xs.push(getLowerLetters());
  }
  if (numberElement.checked) {
    xs.push(getNumbers());
  }
  if (symbolElement.checked) {
    xs.push(getSymbols());
  }

  return xs[Math.floor(Math.random() * xs.length)];
}

generateBtnElement.addEventListener("click", function handleClick() {
  generatePassword();
});

copyBtnElement.addEventListener("click", function handleClick() {
  var textarea = document.createElement("textarea");
  var password = pwElement.innerText;
  if (!password) {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password Copied");
});
