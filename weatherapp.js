// Time & Date //
 
    let current = new Date();
    let h1 = document.querySelector("h1");
    let year = current.getFullYear();
    let hour = current.getHours();
    let minutes = current.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let dayName = days[current.getDay()];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let month = months[current.getMonth()];
    let date = current.getDate();

    h1.innerHTML = `${month} ${date}, ${year} ${dayName} ${hour}:${minutes} EST`

function formatDay(timestamp) {
    let current = new Date(timestamp * 1000);
    let day = current.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}
//

//Icons//

function getEmojiFromIconCode(iconCode) {
  const codeMap = {
    "clear-sky-day": "🌞",
    "few-clouds-day": "🌤",
    "scattered-clouds-day": "⛅",
    "broken-clouds-day": "☁",
    "shower-rain-day": "🌦",
    "rain-day": "🌧",
    "thunderstorm-day": "⛈",
    "snow-day": "🥶",
    "mist-day": "🌫",
    "clear-sky-night": "🌞",
    "few-clouds-night": "🌤",
    "scattered-clouds-night": "⛅",
    "broken-clouds-night": "☁",
    "shower-rain-night": "🌦",
    "rain-night": "🌧",
    "thunderstorm-night": "⛈",
    "snow-night": "🥶",
    "mist-night": "🌫",
  };

  return codeMap[iconCode];
}
//

// Forecast //
function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecastweather");

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTML =
                forecastHTML + `<div class="col-2">
        <button class="forecastButton">
        <h5 class="weather-forecast-date">${formatDay(forecastDay.time)}</h5>
        <div class="icon" id="icon"> ${getEmojiFromIconCode(forecastDay.condition.icon)} </div>
        <div class="tempNumber" id="forecast">${Math.round(forecastDay.temperature.day)}&degF </div>
        <div class="weatherD" id="weatherD">${forecastDay.condition.description} </div>
        </button>
</div>`;
 }
});
forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
};

function getForecast(cityInput) {
    let apiKey = "3a4dft388a1bcaf4e40f706coecb9a01";
    let apiUrl = "https://api.shecodes.io/weather/v1/forecast?query="+cityInput+"&key="+apiKey+"&units=imperial";
    axios.get(apiUrl).then(displayForecast);
};
//

//Current Location
function showPosition(position) {
     let apiKey = "3a4dft388a1bcaf4e40f706coecb9a01";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(showTemp);
};

function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
};

let button = document.querySelector("#currentLocation");
button.addEventListener("click", getCurrentPosition);
//

//Search Bar //
function showTemp(response) {
    let temperatureElement = document.querySelector("#tempNumber");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    document.querySelector("#cityName").innerHTML = response.data.city;
    document.querySelector("#country").innerHTML = `, ${response.data.country}`;
    document.querySelector("#humid").innerHTML = Math.round(response.data.temperature.humidity);
    document.querySelector("#windSpeed").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("h4").innerHTML = response.data.condition.description;
    document.querySelector("h3").innerHTML = getEmojiFromIconCode(response.data.condition.icon);
   
    fahrenheitTemperature = response.data.temperature.current;
    getForecast(response.data.city);
};

function searchCity(cityInput) {
let apiKey = "3a4dft388a1bcaf4e40f706coecb9a01";
let apiUrl = "https://api.shecodes.io/weather/v1/current?query="+cityInput+"&key="+apiKey+"&units=imperial";
    axios.get(apiUrl).then(showTemp);
};

function search(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#search").value;
    searchCity(cityInput);
};

let form = document.querySelector("#cityButton");
form.addEventListener("click", search);
//

let fahrenheitTemperature = null;
 
// Temp Units change

function displayCelsius(event) {
    let temperatureElement = document.querySelector("#tempNumber");
    let celsiusValue = (((fahrenheitTemperature - 32) * 5) / 9);
    temperatureElement.innerHTML = Math.round(celsiusValue);
}

function displayFahrenheit(event) {
    let temperatureElement = document.querySelector("#tempNumber");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", displayCelsius);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheit);
//

searchCity("Miami");





