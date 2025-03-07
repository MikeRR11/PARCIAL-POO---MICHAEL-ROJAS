document.addEventListener('DOMContentLoaded', function () {
    var map1 = L.map('map1').setView([4.5786, -74.15265], 17);
    var map2 = L.map('map2').setView([4.5786, -74.15265], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map1);

    L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
        attribution: '&copy; Google'
    }).addTo(map2);

    // Function to load and add GeoJSON data to map2
    let loadPolygon = async function() {
        let myData = await fetch("CORUÑA.geojson");
        let myPolygon = await myData.json();

        let geoJsonLayer = L.geoJSON(myPolygon, {
            style: { color: 'blue' }
        });

        geoJsonLayer.addTo(map2); // Add to map2
    };
    loadPolygon();

    // Function to load and add GeoJSON data to map1
    let loadPolygon2 = async function() {
        let myData = await fetch("CORUÑA.geojson");
        let myPolygon = await myData.json();

        let geoJsonLayer = L.geoJSON(myPolygon, {
            style: { color: 'blue' }
        });

        geoJsonLayer.addTo(map1); // Add to map1
    };
    loadPolygon2();

    var map3 = L.map('map3').setView([4.5786, -74.15265], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map3);

    // Function to load and add GeoJSON data for the locality
    let loadLocalidadPolygon = async function() {
        let myData = await fetch("localidad.geojson");
        let myPolygon = await myData.json();

        let geoJsonLayer = L.geoJSON(myPolygon, {
            style: { color: 'red' }
        });

        geoJsonLayer.addTo(map3); // Add to new map
    };
    loadLocalidadPolygon();

    // Function to display NDVI using Google Earth Engine API
    let showNDVI = async function() {
        // Implement the logic to fetch and display NDVI using Google Earth Engine API
        console.log("NDVI button clicked");
    };

    // Function to display SAVI using Google Earth Engine API
    let showSAVI = async function() {
        // Implement the logic to fetch and display SAVI using Google Earth Engine API
        console.log("SAVI button clicked");
    };

    // Add buttons to the map container
    let buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    let ndviButton = document.createElement('button');
    ndviButton.innerText = 'Show NDVI';
    ndviButton.onclick = showNDVI;

    let saviButton = document.createElement('button');
    saviButton.innerText = 'Show SAVI';
    saviButton.onclick = showSAVI;

    buttonContainer.appendChild(ndviButton);
    buttonContainer.appendChild(saviButton);

    document.querySelector('.map-container').appendChild(buttonContainer);
});
