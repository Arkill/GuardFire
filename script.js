
const map = L.map('map', {
    center: [-3.119, -60.021731],  
    zoom: 14, 
    scrollWheelZoom: true, 
    dragging: true, 
    touchZoom: true, 
    doubleClickZoom: true, 
    zoomControl: true, 
    maxZoom: 19, 
    minZoom: 12, 
});

// Adicione o layer do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Array com as coordenadas das estações de bombeiros
const fireStations = [
    { coords: [-3.107279, -60.023132], name: 'Corpo de Bombeiros Militar do Amazonas (CBMAM) - Centro', link: 'estacao1.html' },
    { coords: [-3.092268, -60.021134], name: '3º Grupamento de Bombeiros Militar', link: 'estacao2.html' },
    { coords: [-3.074382, -60.015583], name: '2º Grupamento de Bombeiros Militar', link: 'estacao3.html' },
    { coords: [-3.131678, -60.026216], name: '4º Grupamento de Bombeiros Militar', link: 'estacao4.html' },
    { coords: [-3.149301, -60.029792], name: '5º Grupamento de Bombeiros Militar', link: 'estacao5.html' }
];

const firetruckIcon = L.icon({
    iconUrl: 'img/bonb.png', 
    iconSize: [30, 30], 
    iconAnchor: [15, 30], 
    popupAnchor: [0, -30] 
});

function openPopupWithDelay(marker, popupContent) {
    marker.popupTimeout = setTimeout(function() {
        marker.bindPopup(popupContent).openPopup();
    }, 1); // Delay de 1ms para abrir o pop-up
}

// Função para fechar o pop-up com delay
function closePopupWithDelay(marker) {
    if (marker.popupTimeout) {
        clearTimeout(marker.popupTimeout); // Limpa o timeout anterior se o mouse sair rapidamente
    }
    marker.popupTimeout = setTimeout(function() {
        marker.closePopup();
    }, 0); // Delay de 500ms para fechar o pop-up
}

// Adicionando os postos de bombeiros ao mapa
fireStations.forEach((station) => {
    const { coords, name, link } = station;
    const marker = L.marker(coords, { icon: firetruckIcon }).addTo(map);

    const popupContent = `<strong>${name}</strong><br><a href="${link}" target="_blank">Clique para mais informações</a>`;

    // Abre o pop-up com delay ao passar o mouse
    marker.on('mouseover', function() {
        openPopupWithDelay(marker, popupContent);
    });

    // Fecha o pop-up com delay ao tirar o mouse
    marker.on('mouseout', function() {
        closePopupWithDelay(marker);
    });

    // Ao clicar no marcador, abre a página de informações
    marker.on('click', function() {
        window.location.href = link;
    });
});

// Lista de coordenadas dos focos de incêndio em Manaus
const fireLocations = [
    { latitude: -3.119, longitude: -60.021731 },
    { latitude: -3.095, longitude: -60.028 },
    { latitude: -3.125, longitude: -60.015 },
    { latitude: -3.138, longitude: -60.010 },
    { latitude: -3.100, longitude: -60.035 },
    { latitude: -3.080, longitude: -60.020 },
    { latitude: -3.090, longitude: -60.025 },
    { latitude: -3.110, longitude: -60.040 }
];

// Função para adicionar os focos de incêndio ao mapa
function addFireCircles() {
    fireLocations.forEach(function(location) {
        const fireCircle = L.circle([location.latitude, location.longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 150, 
        }).addTo(map);

        animateFireCircle(fireCircle);

        fireCircle.bindPopup("Foco de Incêndio Detectado!").openPopup();
    });
}

function animateFireCircle(circle) {
    let opacity = 0.5;
    const maxOpacity = 0.8;
    const minOpacity = 0.3;
    const step = 0.02;
    const interval = 100;

    const animationInterval = setInterval(function() {
        if (opacity >= maxOpacity) {
            opacity = minOpacity;
        } else {
            opacity += step;
        }
        circle.setStyle({ fillOpacity: opacity });
    }, interval);
}

addFireCircles();

map.setMaxBounds([ 
    [-3.230, -60.280], 
    [-3.050, -59.900]  
]);

