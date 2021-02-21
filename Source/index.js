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
  return `${currentDay}, ${currentTime}`;
}

let weatherDate = document.querySelector("#date");
let now = new Date();
weatherDate.innerHTML = showDate(now);

//WEATHER

function displayCityWeather(response) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-now");
  let cityTemp = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${cityTemp}`;
  let temperatureMaxElement = document.querySelector("#max-temp");
  let cityMaxTemp = Math.round(response.data.main.temp_max);
  temperatureMaxElement.innerHTML = `${cityMaxTemp}`;
  let temperatureMinElement = document.querySelector("#min-temp");
  let cityMinTemp = Math.round(response.data.main.temp_min);
  temperatureMinElement.innerHTML = `${cityMinTemp}`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML=(response.data.weather[0].description);
  let feelsElement = document.querySelector("#feels-like-value");
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  let humidityElement = document.querySelector("#humidity-value");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let windElement = document.querySelector("#wind-value");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute ("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  iconElement.setAttribute ("alt",response.data.weather[0].description)
  }

function displayPositionWeather(response) {
  let cityElement = document.querySelector("h1");
  city.innerHTML = (response.data.name);
  let temperatureElement = document.querySelector("#temp-now");
  celsiusTemperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${celsiusTemperature}`;
  let temperatureMaxElement = document.querySelector("#max-temp");
  celsiusMaxTemperature = Math.round(response.data.main.temp_max);
  temperatureMaxElement.innerHTML = `${celsiusMaxTemperature}`;
  let temperatureMinElement = document.querySelector("#min-temp");
  celsiusMinTemperature = Math.round(response.data.main.temp_min);
  temperatureMinElement.innerHTML = `${celsiusMinTemperature}`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML=(response.data.weather[0].description);
  let feelsElement = document.querySelector("#feels-like-value");
feelsElement.innerHTML = Math.round(response.data.main.feels_like);
let humidityElement = document.querySelector("#humidity-value");
humidityElement.innerHTML = Math.round(response.data.main.humidity);
let windElement = document.querySelector("#wind-value");
windElement.innerHTML = Math.round(response.data.wind.speed);
}
function handlePosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "54b3e201447a1afa52495e15558f28df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayPositionWeather);
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
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCityWeather);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-now");
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-now");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
    celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;
let celsiusMaxTemperature = null;
let CelsiusMinTemperature = null;

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", useLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius); 

navigator.geolocation.getCurrentPosition(handlePosition);