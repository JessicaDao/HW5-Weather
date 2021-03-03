var apiKey = "562517dc15ed5983189073c3d202dae6";
var currentCity = "#currentCity";
var tempEl = "#temp";
var humidityEl = "#humidity";
var windEl = "#wind";
var uvIndexEl = "#ultraVI";
let weatherDesc = "#weatherDesc";
let lat = "";
let lon = "";

// City Submit Button
document
  .querySelector(".search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var cityInput = document.querySelector("#inputValue").value;
    if (document.getElementById("inputValue").value === "") {
      alert("Please enter a city.");
    } else if (cityInput === false) {
      alert("Please choose a different city.");
    } else {
      getWeather(cityInput);
      saveToStorage(cityInput);
      renderSaveBtns();
    }
  });

function saveToStorage(cityInput) {
  var inputDataSaved = JSON.parse(localStorage.getItem("searchCity")) || [];
  inputDataSaved.push(cityInput);
  localStorage.setItem("searchCity", JSON.stringify(inputDataSaved));
}

function renderSaveBtns() {
  let inputDataSaved = JSON.parse(localStorage.getItem("searchCity")) || [];
  if (inputDataSaved === null);

  document.querySelector("#searchHistory").innerHTML = "";
  inputDataSaved.forEach(function (citySearches) {
    let searchHistoryBtn = document.createElement("button");
    searchHistoryBtn.classList.add("saved-city-button");
    searchHistoryBtn.innerHTML = citySearches;
    document.querySelector("#searchHistory").prepend(searchHistoryBtn);
  });
}
renderSaveBtns();

var savedCityButtons = document.querySelectorAll(".saved-city-button");
savedCityButtons.forEach(function (eachButton) {
  eachButton.addEventListener("click", function (e) {
    var city = eachButton.innerHTML;
    getWeather(city);
  });
});

// api
function getWeather(cityName) {
  let queryURLForToday = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;

  fetch(queryURLForToday)
    .then(function (weatherResponse) {
      return weatherResponse.json();
    })
    .then(function (data) {
      console.log(data);
      todayWeather(cityName, data);
      let queryURLForFiveDay = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${apiKey}`;
      fetch(queryURLForFiveDay)
        .then(function (weatherResponse) {
          return weatherResponse.json();
        })
        .then(function (fiveDayData) {
          weekWeather(fiveDayData);
        });
    });
}

function todayWeather(cityName, data) {
  document.querySelector("#currentDate").innerHTML = moment().format(
    "MMMM Do, YYYY"
  );
  document.querySelector("#weatherDesc").innerHTML =
    data.weather[0].description;
  document.querySelector(
    "#currentIcon"
  ).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>`;
  document.querySelector("#currentCity").innerHTML = cityName;
  document.querySelector("#temp").innerHTML =
    Math.round(data.main.temp) + "°F";
  document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
  document.querySelector("#wind").innerHTML =
    Math.round(data.wind.speed) + "mph";

  $("#card-text").empty();
}

function weekWeather(data) {
  let currentUVI = (document.querySelector(
    "#currentUVI"
  ).innerHTML = Math.round(data.current.uvi));

  document.querySelector("#weekContain").innerHTML = "";
  for (var i = 0; i < 5; i++) {
    let forecastDates = moment()
      .add(i + 1, "days")
      .format("ddd MM/DD/YYYY");
    let day = document.createElement("div");
    day.innerHTML = [
      `<h5>${forecastDates}</h5>
    <img src="https://openweathermap.org/img/wn/${
      data.daily[i].weather[0].icon
    }@2x.png">
    <p>${data.daily[i].weather[0].description}</p>
    <p>Temperature: ${Math.round(data.daily[i].temp.day)}°F</p>
    <p>Humidity: ${data.daily[i].humidity}%</p>`,
    ];
    document.querySelector("#weekContain").appendChild(day);
  }
  uviBadge(data);
  $("#card-text").empty();
}

function uviBadge(data) {
  let currentUVI = $("#currentUVI");
  currentUVI.innerHTML = Math.round(data.current.uvi);

  if (data.current.uvi <= 2) {
    currentUVI.addClass("badge badge-success");
  } else if (data.current.uvi > 2 && data.current.uvi <= 5) {
    currentUVI.addClass("badge badge-warning");
  } else if (data.current.uvi > 5) {
    currentUVI.addClass("badge badge-danger");
  }
}