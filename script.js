var apiKey = "562517dc15ed5983189073c3d202dae6";
var currentCity = "#currentCity";
var tempEl = "#temp";
var humidityEl = "#humidity";
var windEl = "#wind";
var uvIndexEl = "#ultraVI";

// City Submit Button
document
.querySelector(".search-form")
.addEventListener("submit", function (event) {
  event.preventDefault();
  var cityInput = document.querySelector("#inputValue").value;

  if (document.getElementById("inputValue").value === "") {
    alert("Please enter a city name!");
  } else if (cityInput === false) {
    alert("Please choose a different city!");
    // return;
  } else {
    getWeather(cityInput);
    saveToStorage(cityInput);
    renderSaveBtns();
  }
});

