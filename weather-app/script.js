var apikey = "3265874a2c77ae4a04bb96236a642d2f";

var main = document.querySelector("#main");
var form = document.querySelector("#form");
var search = document.querySelector("#search");

function url(city) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
}

async function getWeatherByLocation(city) {
  const response = await fetch(url(city), { origin: "cors" });
  const responseData = await response.json();
  addWeatherToPage(responseData);
}

function addWeatherToPage(data) {
  var temp = data.main.temp;
  var weather = document.createElement("div");
  weather.classList.add("weather");
  weather.innerHTML = `
  <h2>
  ${temp}°C 
  </h2>
  <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> 
  <h3>${data.weather[0].main}</h3>
  `;
  main.innerHTML = "";
  main.appendChild(weather);
}

form.addEventListener("submit", function handleSubmit(e) {
  e.preventDefault();

  var city = search.value;

  if (city) {
    getWeatherByLocation(city);
  }
});
