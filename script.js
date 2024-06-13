const apiKey = "e73732f4f8d358b44c7c66b0a2d3df93";

const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
const oneCallApiUrl = "https://api.openweathermap.org/data/3.0/onecall";

// Function to fetch weather data from the API
async function getWeatherData(city) {
  try {
    const response = await fetch(
      `${weatherApiUrl}?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Function to fetch 7-day forecast data from the API
async function getForecastData(lat, lon) {
  try {
    const response = await fetch(
      `${oneCallApiUrl}?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
}

// Function to update the UI with weather information
function updateUI(data, forecastData) {
  const currentWeatherElement = document.getElementById("currentWeather");
  currentWeatherElement.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;

  const forecastElement = document.getElementById("forecast");
  forecastElement.innerHTML = "<h3>7-Day Forecast:</h3>";
  forecastData.daily.forEach((day, index) => {
    if (index > 0 && index <= 7) {
      // Skip the current day and get the next 7 days
      const date = new Date(day.dt * 1000).toLocaleDateString();
      forecastElement.innerHTML += `
            <div class="forecast-day">
                <p>${date}</p>
                <p>Temp: ${day.temp.day}°C</p>
                <p>Weather: ${day.weather[0].description}</p>
                <p>Icon: <img src="icons/${day.weather[0].icon}.png" alt="icon"></p> <!-- Placeholder for icon -->
            </div>
        `;
    }
  });
}

async function searchWeather() {
  const city = document.getElementById("cityInput").value;
  if (city) {
    const weatherData = await getWeatherData(city);
    if (weatherData) {
      const { lat, lon } = weatherData.coord;
      const forecastData = await getForecastData(lat, lon);
      if (forecastData) {
        updateUI(weatherData, forecastData);
      }
    }
  }
}

// Initial call to searchWeather function
searchWeather();
