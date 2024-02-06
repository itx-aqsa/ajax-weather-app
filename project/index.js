document.getElementById('get-weather-btn').addEventListener('click', function() {
    const coordinates = document.getElementById('coordinates-input').value.split(',');
    
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates[0]}&longitude=${coordinates[1]}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

    // Highlighting AJAX usage
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currentWeather = data.current;
            const hourlyWeather = data.hourly;

            // Filter hourly data for one day
            const oneDayHourlyData = hourlyWeather.time.slice(0, 24);
            
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = `
                <h2>Current Weather</h2>
                <p>Time: ${currentWeather.time}</p>
                <p>Temperature: ${currentWeather.temperature_2m}°C</p>
                <p>Wind Speed: ${currentWeather.wind_speed_10m} m/s</p>

                <h2>Hourly Forecast (Next 24 hours)</h2>
                <ul>
                    ${oneDayHourlyData.map((time, index) => `
                        <li>
                            Time: ${time}<br>
                            Temperature: ${hourlyWeather.temperature_2m[index]}°C<br>
                            Relative Humidity: ${hourlyWeather.relative_humidity_2m[index]}%<br>
                            Wind Speed: ${hourlyWeather.wind_speed_10m[index]} m/s
                        </li>
                    `).join('')}
                </ul>
            `;
        })
        .catch(error => console.error('Error fetching data:', error));
});

// Clear button functionality
document.getElementById('clear-btn').addEventListener('click', function() {
    document.getElementById('weather-info').innerHTML = '';
});