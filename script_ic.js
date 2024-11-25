const apiKey = '9e82c4e7eed8d47feb3f1e10d55426ce'; // Substitua com sua chave da API do OpenWeatherMap
const cidade = 'Manaus'; // Altere para a cidade desejada

// Elementos do DOM
const weatherContainer = document.getElementById('weather-info');
const weatherIcon = document.getElementById('weather-icon');

// Função para buscar dados climáticos
async function fetchWeatherData() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`);
        if (!response.ok) throw new Error('Erro ao buscar dados climáticos');

        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        weatherContainer.innerHTML = `<p>Erro ao carregar informações climáticas: ${error.message}</p>`;
    }
}

// Função para exibir dados climáticos no DOM
function displayWeatherData(data) {
    const { weather, main, name } = data;
    const condition = weather[0].description;
    const temperature = main.temp.toFixed(1);
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    weatherIcon.src = iconUrl;
    weatherIcon.alt = condition;
    weatherIcon.style.display = 'block';

    weatherContainer.innerHTML = `
        <p><strong>Cidade:</strong> ${name}</p>
        <p><strong>Condição:</strong> ${condition}</p>
        <p><strong>Temperatura:</strong> ${temperature}°C</p>
    `;
}

// Inicializar a busca dos dados climáticos
fetchWeatherData();
