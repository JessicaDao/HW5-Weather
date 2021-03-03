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
    alert("Please enter a city.");
  } else if (cityInput === false) {
    alert("Please choose a different city.");
  } else {
    getWeather(cityInput);
    saveToStorage(cityInput);
    renderSaveBtns();
  }
});

  // Save to localStorage
  function saveToStorage(cityInput) {
    var inputDataSaved = JSON.parse(localStorage.getItem("searchCity")) || [];
    inputDataSaved.push(cityInput);
    localStorage.setItem("searchCity", JSON.stringify(inputDataSaved));
  }

  // Save localStorage to page
  function renderSaveBtns() {
    let inputDataSaved = JSON.parse(localStorage.getItem("searchCity")) || [];
    if (inputDataSaved === null);

    document.querySelector("#searchHistory").innerHTML = "";
    inputDataSaved.forEach(function (citySearches) {
      let searchHistoryBtn = document.createElement("button");
      searchHistoryBtn.classList.add("saved-city-button");
      searchHistoryBtn.innerHTML = citySearches;
      // console.log(searchHistoryBtn)
      document
        .querySelector("#searchHistory")
        .prepend(searchHistoryBtn);
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