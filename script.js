// Replace 'YOUR_API_KEY' with the actual API key you obtained from OpenWeatherMap
const apiKey = "e73732f4f8d358b44c7c66b0a2d3df93";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// Function to fetch weather data from the API
async function getWeatherData(city) {
  try {
    const response = await fetch(
      `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Function to update the UI with weather information
function updateUI(data) {
  const appElement = document.getElementById("app");
  appElement.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
}

async function searchWeather() {
  const city = document.getElementById("cityInput").value;
  if (city) {
    const weatherData = await getWeatherData(city);
    if (weatherData) {
      updateUI(weatherData);
    }
  }
}

// Initial call to searchWeather function
searchWeather();
