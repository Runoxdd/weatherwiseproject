const apiKey = "7f0318d543e204c9b4b541a9dfc25e60";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const WeatherIcon = document.querySelector(".weather-icon");
const titleElement = document.querySelector(".pie");
const weatherElement = document.querySelector(".sauce"); 


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weather = data.weather[0].main; // Get the weather condition
        weatherElement.textContent = weather; // Display the weather in the <h1 class="sauce">

        if (weather === "Clouds") {
            WeatherIcon.src = "images/clouds.png";
            document.body.style.backgroundImage = "url('images/cloudy.jpg')";
        } else if (weather === "Clear") {
            WeatherIcon.src = "images/clear.png";
            document.body.style.backgroundImage = "url('images/background.jpg')";
        } else if (weather === "Rain") {
            WeatherIcon.src = "images/rain.png";
            document.body.style.backgroundImage = "url('images/heavyrain.jpg')";
        } else if (weather === "Drizzle") {
            WeatherIcon.src = "images/drizzle.png";
            document.body.style.backgroundImage = "url('images/rain.jpg')";
        } else if (weather === "Mist") {
            WeatherIcon.src = "images/mist.png";
            document.body.style.backgroundImage = "url('images/misty.jpg')";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    titleElement.textContent = "Texas";
    weatherElement.textContent = "Always Nice"; // Default text for the weather
    checkWeather("Texas");
});

searchBtn.addEventListener("click", () => {
    const cityName = searchBox.value; // Get the value from the textbox
    titleElement.textContent = cityName;
    checkWeather(cityName); // This will update weatherElement inside checkWeather
});

searchBox.addEventListener("keydown", (event) => {
    const cityName = searchBox.value; // Get the value from the textbox
    if (event.key === "Enter") {
        titleElement.textContent = cityName;
        checkWeather(cityName); // This will update weatherElement inside checkWeather
    }
});
