const apiKey = 'be247cb7771b6bc23b7408c81f16de27'; // Replace with your OpenWeatherMap API key

document.getElementById('search-btn').addEventListener('click', function() {
    const location = document.querySelector('.input-box').value;
    if (location) {
        fetchWeatherData(location);
    }
});

function fetchWeatherData(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => displayWeatherData(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Could not find weather data for the specified city.');
        });
}

function displayWeatherData(data) {
    const temperature = document.querySelector('.temperature');
    const description = document.querySelector('.description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const pressure = document.getElementById('pressure');
    const sunrise = document.getElementById('sunrise');
    const sunset = document.getElementById('sunset');
    const weatherImage = document.querySelector('.weather-image');

    // Update the content dynamically
    temperature.innerHTML = `${Math.round(data.main.temp)} <sup>°C</sup>`;
    description.innerText = data.weather[0].description;
    humidity.innerText = `${data.main.humidity}%`;
    windSpeed.innerText = `${data.wind.speed} Km/H`;
    pressure.innerText = `${data.main.pressure} hPa`;

    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    sunrise.innerText = sunriseTime;
    sunset.innerText = sunsetTime;

    // Update the weather image dynamically
    weatherImage.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}


document.querySelector('.input-box').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const location = document.querySelector('.input-box').value;
        if (location) {
            fetchWeatherData(location);
        }
    }
});