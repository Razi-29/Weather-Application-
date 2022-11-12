// Time & Date
let current = new Date();
let h1 = document.querySelector("h1");
let year = current.getFullYear();
let hour = current.getHours();
let minutes = current.getMinutes();
if (minutes < 10) { 
    minutes = `0${minutes}`;
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let day = days[current.getDay()];
let months = ["Jan", "Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
let month = months[current.getMonth()];
let date = current.getDate();

h1.innerHTML = `${month} ${date}, ${year} ${day} ${hour}:${minutes} EST`
//

// Temp Units change
function fahrenheit(event) {
    preventDefault();
    let temperatureElement = document.querySelector("#tempNumber");
    let temperatureNumber = temperatureElement.innerHTML;
    temperatureNumber = Number(temperatureNumber);
    temperatureElement.innerHTML = Math.round((temperatureNumber * 9) / 5 + 32);
}

function celsius(event) {
    preventDefault();
let temperatureElement = document.querySelector("#tempNumber");
let temperatureNumber = temperatureElement.innerHTML;
    temperatureNumber = Number(temperatureNumber);
    temperatureElement.innerHTML = Math.round(((temperatureNumber - 32) * 5) / 9);
}

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", celsius);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", fahrenheit);
//

//Current Location
function showPosition(position) {
     let apiKey = "3a4dft388a1bcaf4e40f706coecb9a01";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.latitude}&lon=${position.coords.longitude}&key=${apiKey}&units=imperial`;
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
    document.querySelector("#tempNumber").innerHTML = Math.round(response.data.temperature.current);
    document.querySelector("#cityName").innerHTML = response.data.city;
    document.querySelector("#country").innerHTML = `, ${response.data.country}`;
    document.querySelector("#humid").innerHTML = Math.round(response.data.temperature.humidity);
    document.querySelector("#windSpeed").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("h4").innerHTML = response.data.condition.description;
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





