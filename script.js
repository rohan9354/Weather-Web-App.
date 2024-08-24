document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value.trim();
    if (!city) {
        document.getElementById('weather-info').innerHTML = `<p>Please enter a city name.</p>`;
        return;
    }

    const apiUrl = `https://wttr.in/${city}?format=j1`; 

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.current_condition && data.current_condition.length > 0) {
                const weather = data.current_condition[0];
                const cityName = city.charAt(0).toUpperCase() + city.slice(1);
                const temperature = `${weather.temp_C} °C`;
                const description = weather.weatherDesc[0].value;
                const humidity = `${weather.humidity}%`;
                const windSpeed = `${weather.windspeedKmph} km/h`;
                const weatherEmoji = getWeatherEmoji(description);

                const weatherInfo = `
                    <h2>${weatherEmoji} ${cityName}</h2>
                    <p><span class="weather-icon">☀️</span>Temperature: ${temperature}</p>
                    <p><span class="weather-icon">☔</span>Condition: ${description}</p>
                    <p><span class="weather-icon">💧</span>Humidity: ${humidity}</p>
                    <p><span class="weather-icon">💨</span>Wind Speed: ${windSpeed}</p>
                `;
                document.getElementById('weather-info').innerHTML = weatherInfo;
            } else {
                throw new Error('City not found or data unavailable');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('weather-info').innerHTML = `<p>Error: ${error.message}. Please try again.</p>`;
        });
});

function getWeatherEmoji(description) {
    const descLower = description.toLowerCase();
    if (descLower.includes('sunny') || descLower.includes('clear')) {
        return '☀️';
    } else if (descLower.includes('cloud')) {
        return '☁️';
    } else if (descLower.includes('rain') || descLower.includes('drizzle')) {
        return '☔';
    } else if (descLower.includes('snow')) {
        return '❄️';
    } else if (descLower.includes('thunder') || descLower.includes('storm')) {
        return '⛈️';
    } else if (descLower.includes('fog') || descLower.includes('mist')) {
        return '🌀';
    } else {
        return '🌈';
    }
}


