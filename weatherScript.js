document.addEventListener("DOMContentLoaded", function () {
    const weatherWidget = document.getElementById("weather-widget-container");
    const weatherWidgetLocation = document.getElementById("weather-widget-location");
    const locationSelector = document.getElementById("locationSelector");

    locationSelector.style.display = "block";

    function fetchWeatherData(latitude, longitude) {
        const apiEndpoint = `https://api.weather.gov/points/${latitude},${longitude}`;
        console.log("Fetching weather data from:", apiEndpoint);

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                console.log("Weather data received:", data);

                const relativeLocation = data.properties?.relativeLocation?.properties;
                const city = relativeLocation?.city || 'Unknown City';
                const state = relativeLocation?.state || 'Unknown State';

                const locationElement = document.createElement("p");
                locationElement.innerHTML = `${city}, ${state}`;
                weatherWidgetLocation.innerHTML = '';
                weatherWidgetLocation.appendChild(locationElement);

                const forecastLink = data.properties?.forecast;
                if (!forecastLink) {
                    throw new Error("Forecast link is missing");
                }
                console.log("Fetching forecast data from:", forecastLink);
                return fetch(forecastLink);
            })
            .then(response => response.json())
            .then(data => {
                console.log("Forecast data received:", data);

                const forecastPeriods = data.properties?.periods?.slice(0, 5) || [];
                weatherWidget.innerHTML = '';

                forecastPeriods.forEach((period) => {
                    const periodElement = document.createElement("div");
                    periodElement.classList.add("weather-widget");

                    // Safely accessing potential undefined properties
                    const temperature = period.temperature !== undefined ? period.temperature : 'N/A';
                    const temperatureUnit = period.temperatureUnit || 'N/A';
                    const shortForecast = period.shortForecast || 'N/A';
                    const windSpeed = period.windSpeed || 'N/A';
                    const windDirection = period.windDirection || 'N/A';
                    const humidity = period.relativeHumidity?.value !== undefined ? period.relativeHumidity.value + '%' : 'N/A';
                    const icon = period.icon || '';
                    const name = period.name || 'N/A';

                    periodElement.innerHTML = `
                        <p class="weather-date">${name}</p>
                        <img src="${icon}" alt="Weather Icon" class="weather-icon">
                        <p>Temperature: ${temperature} °${temperatureUnit}</p>
                        <p>Conditions: ${shortForecast}</p>
                        <p>Wind: ${windSpeed} ${windDirection}</p>
                        <p>Humidity: ${humidity}</p>
                    `;

                    weatherWidget.appendChild(periodElement);
                });
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                weatherWidget.innerHTML = "Current Weather Conditions Unavailable";
            });
    }

    locationSelector.addEventListener("change", function () {
        const selectedLocation = locationSelector.value;
        switch (selectedLocation) {
            case "LaJolla":
                fetchWeatherData(32.8708, -117.2508); 
                break;
            case "Irvine":
                fetchWeatherData(33.6798, -117.8674); 
                break;
            case "NewYorkCity":
                fetchWeatherData(40.78, -73.97); 
                break;
            case "Austin":
                fetchWeatherData(30.32, -97.77); 
                break;
            case "Miami":
                fetchWeatherData(25.79, -80.32); 
                break;
            default:
                console.error("Unknown location selected:", selectedLocation);
                weatherWidget.innerHTML = "Location not recognized.";
        }
    });

    // Fetch initial weather data
    fetchWeatherData(32.8708, -117.2508);
});
