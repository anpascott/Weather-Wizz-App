// DATE 
function showDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  let months = [
    "Jan.",
    "Feb.",
    "March",
    "Apr.",
    "May",
    "June",
    "July",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec."
  ];
  let currentDay = days[now.getDay()];
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let currentTime = `${currentHour}:${currentMinutes}`;
  return `${currentDay}, ${currentMonth} ${currentDate}, ${currentTime}`;
}

let weatherDate = document.querySelector("#date");
let now = new Date();
weatherDate.innerHTML = showDate(now);

//LOCATION / WEATHER

function displayCityWeather(response) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-now");
  let cityTemp = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${cityTemp}`;
  let temperatureMaxElement = document.querySelector("#max-temp");
  let cityMaxTemp = Math.round(response.data.main.temp_max);
  temperatureMaxElement.innerHTML = `Max. ${cityMaxTemp}°`;
  let temperatureMinElement = document.querySelector("#min-temp");
  let cityMinTemp = Math.round(response.data.main.temp_min);
  temperatureMinElement.innerHTML = `Min. ${cityMinTemp}°`;
}
function displayPositionWeather(response) {
  let temperatureElement = document.querySelector("#temp-now");
  let locationTemp = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${locationTemp}`;
  let temperatureMaxElement = document.querySelector("#max-temp");
  let locationMaxTemp = Math.round(response.data.main.temp_max);
  temperatureMaxElement.innerHTML = `Max. ${locationMaxTemp}°`;
  let temperatureMinElement = document.querySelector("#min-temp");
  let locationMinTemp = Math.round(response.data.main.temp_min);
  temperatureMinElement.innerHTML = `Min. ${locationMinTemp}°`;
}

function displayLocationName(response) {
   let cityElement = document.querySelector("h1");
   cityElement.innerHTML = (response.data.names); 
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "54b3e201447a1afa52495e15558f28df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  let apiLocationUrl =`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=100&appid=${apiKey}`;
  axios.get(apiUrl).then(displayPositionWeather); 
  axios.get(apiLocationUrl).then(displayLocationName); 
}

function useLocation(event) {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let cityElement = document.querySelector("h1");
  let citySearch = input.value;
  city.innerHTML = `${citySearch}`;
  let apiKey = "54b3e201447a1afa52495e15558f28df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityWeather);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", useLocation);

// navigator.geolocation.getCurrentPosition(handlePosition);

// function convertToFahrenheit(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temp-now");
//   let temperature = temperatureElement.innerHTML;
//   let temperatureValue = Number(temperature);
//   temperatureElement.innerHTML = Math.round((temperatureValue * 9) / 5 + 32);
// }

// function convertToCelsius(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temp-now");
//   let temperature = temperatureElement.innerHTML;
//   temperatureElement.innerHTML = 22;
// }

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", convertToFahrenheit);

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", convertToCelsius);