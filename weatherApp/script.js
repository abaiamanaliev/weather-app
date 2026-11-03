/* defining the variables */
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const cityName = document.getElementById("city-name");

const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

function getWeatherDescription(code){
    const weatherCodes = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        71: "Slight snow",
        73: "Moderate snow",
        75: "Heavy snow",
        80: "Rain showers",
        81: "Moderate rain showers",
        82: "Heavy rain showers",
        95: "Thunderstorm",
        96: "Thunderstorm with hail",
        99: "Heavy thunderstorm with hail"
    };

    return weatherCodes[code] || "Unknown weather";
}

async function getWeather() { //retreives the location of given city and inputs into the weather website
    const city = cityInput.value;

    if(city == ""){ //case of no city being entered
        alert("Please enter a valid city!");
        return;
    }
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const response = await fetch(geoURL); //wait for the api to return data regarding city
    const data = await response.json();

    if(!data.results || data.results.length === 0){
        alert("City not found!");
        return;
    }

    const location = data.results[0];
    console.log(data);

    const latitude = location.latitude;
    const longitude = location.longitude;

    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;

    const weatherResponse = await fetch(weatherURL);
    const weatherData = await weatherResponse.json();
    console.log(weatherData);

    const current = weatherData.current;

    cityName.textContent = location.name;
    temperature.textContent = `${current.temperature_2m}°C`;
    humidity.textContent = current.relative_humidity_2m;
    wind.textContent = current.wind_speed_10m;
    description.textContent = getWeatherDescription(current.weather_code);

}

searchButton.addEventListener("click", getWeather);

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getWeather();
    }
})
