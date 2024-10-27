// Inicialize o mapa
const map = L.map('map').setView([-3.119, -60.021731], 10); // Coordenadas de Manaus

// Adicione o layer do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Adicione um marcador no mapa para Manaus
L.marker([-3.119, -60.021731]).addTo(map)
    .bindPopup('Manaus')
    .openPopup();

// Array com as coordenadas das estações de bombeiros
const fireStations = [
    { coords: [-3.107279, -60.023132], name: 'Corpo de Bombeiros Militar do Amazonas (CBMAM) - Centro', link: 'estacao1.html' },
    { coords: [-3.092268, -60.021134], name: '3º Grupamento de Bombeiros Militar', link: 'estacao2.html' },
    { coords: [-3.074382, -60.015583], name: '2º Grupamento de Bombeiros Militar', link: 'estacao3.html' },
    { coords: [-3.131678, -60.026216], name: '4º Grupamento de Bombeiros Militar', link: 'estacao4.html' },
    { coords: [-3.149301, -60.029792], name: '5º Grupamento de Bombeiros Militar', link: 'estacao5.html' }
];

// Cria um array para armazenar os limites do mapa
const bounds = [];

// Cria um ícone personalizado para o caminhão de bombeiro
const firetruckIcon = L.icon({
    iconUrl: 'img/bonb.png', // Substitua pelo caminho do seu ícone
    iconSize: [30, 30], // Tamanho do ícone
    iconAnchor: [15, 30], // Ponto de ancoragem do ícone
    popupAnchor: [0, -30] // Ponto de ancoragem do pop-up
});

// Adicionando os postos de bombeiros ao mapa
fireStations.forEach((station) => {
    const { coords, name, link } = station;
    const marker = L.marker(coords, { icon: firetruckIcon }).addTo(map);
    
    // Cria um pop-up ao passar o mouse
    const popupContent = `<strong>${name}</strong><br><a href="${link}" target="_blank">Mais informações</a>`;
    
    // Adiciona eventos de mouseover e mouseout
    marker.on('mouseover', () => {
        marker.bindPopup(popupContent).openPopup(); // Abre o pop-up
    });

    marker.on('mouseout', () => {
        marker.closePopup(); // Fecha o pop-up
    });
    
    // Adiciona o marcador aos limites
    bounds.push(coords);
});

// Ajusta o mapa para incluir todos os postos
map.fitBounds(bounds);

// Função para obter dados climáticos da OpenWeatherMap API
async function getWeatherData() {
    const apiKey = 'c3f12f8ac06151bed960f019b2e21244'; // Substitua pela sua chave da OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Manaus,BR&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        
        const weatherIcon = document.getElementById('weather-icon');
        
        // Mapeia as condições climáticas para ícones
        const iconMapping = {
            "Clear": "img/clear.svg",
            "Clouds": "img/clouds.svg",
            "Rain": "img/rain.svg",
            "Thunderstorm": "img/icons/storm.svg",
            "Snow": "img/icons/snow.svg",
            "Mist": "img/icons/cloudy.svg" // ou outro ícone que represente névoa
        };

        // Define o ícone com base na condição climática
        const condition = data.weather[0].main;
        weatherIcon.src = iconMapping[condition] || "img/icons/default.svg"; // Use um ícone padrão se a condição não for encontrada
        weatherIcon.style.display = 'block'; // Exibe o ícone

        const weatherInfo = `
            <strong>Cidade:</strong> ${data.name} <br>
            <strong>Temperatura:</strong> ${data.main.temp} °C <br>
            <strong>Clima:</strong> ${data.weather[0].description} <br>
            <strong>Umidade:</strong> ${data.main.humidity}%
        `;
        document.getElementById('weather-info').innerHTML = weatherInfo;
    } catch (error) {
        document.getElementById('weather-info').innerHTML = `<span class="error">Erro ao carregar dados climáticos: ${error.message}</span>`;
    }
}

// Chamar a função de clima ao carregar a página
getWeatherData();

// Função para obter dados de focos de incêndio em tempo real (usando NASA FIRMS API)
async function getFireData() {
    const token = 'eyJ0eXAiOiJKV1QiLCJvcmlnaW4iOiJFYXJ0aGRhdGEgTG9naW4iLCJzaWciOiJlZGxqd3RwdWJrZXlfb3BzIiwiYWxnIjoiUlMyNTYifQ.eyJ0eXBlIjoiVXNlciIsInVpZCI6Im1hcmlhYXA0cmVjaWRhIiwiZXhwIjoxNzM0ODk4MzExLCJpYXQiOjE3Mjk3MTQzMTEsImlzcyI6Imh0dHBzOi8vdXJzLmVhcnRoZGF0YS5uYXNhLmdvdiJ9.Nj_RgLziY704K-Q-svSbw8yqZhciabDAWyMRPWXs9si0Pjd6kM6y33tYzuj58XXiT2aK6J026xQNco-o2-wSkOuTGtcv33YbYeuzHXzg0AJtPO9FJ1G2e4NRzmhYnHsw5CctZ06fjQ3DMhIXvSkOxUc_resoDIkYTck15gdlomHxq-q6OYLdhhW-V7K3qyncb0mWgtXjKd50cDPcaUGAlOWACn8vmlawzgecZfc_4lERC2UtVxLuDV2WMUDzyoEQnAAPVRCpqgl_QOpt5PoHFV2FZLwo4JosDhA0c-RSVvoTq4p2EPVbImIHU4X_PiNJzzi_r1QbcwYpGmxdoWOiPQ'; // Substitua pelo seu token da NASA FIRMS
    const fireApiUrl = `https://firms.modaps.eosdis.nasa.gov/api/country/csv/${token}/BRA/2024-10-01`; // Use 'BRA' e uma data válida

    try {
        const response = await fetch(fireApiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao obter dados de incêndio: ${response.statusText}`);
        }

        const fireData = await response.text(); // A API FIRMS pode retornar CSV
        
        // Se for CSV, você precisará processar os dados antes
        const fires = processCsvData(fireData);

        fires.forEach(fire => {
            const { latitude, longitude } = fire;

            // Adiciona marcadores dos focos de incêndio no mapa
            L.circle([latitude, longitude], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 500
            }).addTo(map)
            .bindPopup(`Foco de Incêndio detectado`);
        });

    } catch (error) {
        console.error(`Erro ao carregar dados de incêndio: ${error}`);
    }
}