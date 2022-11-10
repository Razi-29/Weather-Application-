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

h1.innerHTML = `${month} ${date}, ${year} ${day} ${hour}:${minutes}`
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

//Search Bar 
 function showTemp(response) {
    document.querySelector("#tempNumber").innerHTML = Math.round(response.data.main.temp);
     document.querySelector("h6").innerHTML = response.data.name;
 }
    
function searchCity(city) {
let apiKey = "e66ade2fd3c406fd036807f2f7ce043c";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=imperial";
axios.get(apiUrl).then(showTemp);
}
function search(event) {
    event.preventDefault();
    let city = document.querySelector("#search").value;
    searchCity(city);
};

let form = document.querySelector("#cityButton");
form.addEventListener("click", search);
//

//Current Location
function showPosition(position) {
    let apiKey = "e66ade2fd3c406fd036807f2f7ce043c";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
    let latitude = (position.coords.latitude);
    let longitude = (position.coords.longitude);

axios.get(apiUrl).then(showTemp);
};

function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
};

let button = document.querySelector("#currentLocation");
button.addEventListener("click", getCurrentPosition);
//



