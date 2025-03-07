// Function to load and add GeoJSON data for the locality
let loadLocalidadPolygon = async function() {
    let myData = await fetch("localidad.geojson");
    let myPolygon = await myData.json();

    let geoJsonLayer = L.geoJSON(myPolygon, {
        style: { color: 'red' }
    });

    geoJsonLayer.addTo(map1).addTo(map2); // Add to both maps
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

// Synchronize both maps
map1.sync(map2);
map2.sync(map1);

/////LOGICA DE LOS INDICES

// PASO 1: Definir el área de localidad
var bogota = ee.FeatureCollection('FAO/GAUL/2015/level2')
               .filter(ee.Filter.eq('ADM2_NAME', 'Bogotá'));

// PASO 2: Cargar la colección de imágenes (Landsat 8 es una buena opción)
var collection = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')
                  .filterBounds(bogota)   // Filtrar por Bogotá
                  .filterDate('2023-01-01', '2023-12-31')  // Rango temporal

// PASO 3: Seleccionar la imagen más reciente con menos nubes
var image = collection.sort('CLOUD_COVER').first();

// PASO 4: Recortar la imagen al área de Bogotá
var imageBogota = image.clip(bogota);

// PASO 5: Calcular NDVI usando .expression()
// Fórmula: (NIR - Red) / (NIR + Red)
var ndvi = imageBogota.expression(
    '(NIR - RED) / (NIR + RED)',
    {
        'NIR': imageBogota.select('B5'),   // Banda NIR
        'RED': imageBogota.select('B4')    // Banda RED
    }
).rename('NDVI');

// PASO 6: Calcular SAVI usando .expression()
// Fórmula: ((NIR - Red) / (NIR + Red + L)) * (1 + L)
// Usamos L = 0.5 (valor típico para vegetación intermedia)
var savi = imageBogota.expression(
    '((NIR - RED) / (NIR + RED + L)) * (1 + L)',
    {
        'NIR': imageBogota.select('B5'),
        'RED': imageBogota.select('B4'),
        'L': 0.5
    }
).rename('SAVI');

// PASO 7: Calcular NDWI usando .expression()
// Fórmula: (Green - NIR) / (Green + NIR)
var ndwi = imageBogota.expression(
    '(GREEN - NIR) / (GREEN + NIR)',
    {
        'GREEN': imageBogota.select('B3'),  // Banda GREEN
        'NIR': imageBogota.select('B5')
    }
).rename('NDWI');

// PASO 8: Mostrar resultados en el mapa
Map.centerObject(bogota, 10); // Centrar en Bogotá

Map.addLayer(ndvi, {min: -1, max: 1, palette: ['blue', 'white', 'green']}, 'NDVI');
Map.addLayer(savi, {min: -1, max: 1, palette: ['yellow', 'orange', 'green']}, 'SAVI');
Map.addLayer(ndwi, {min: -1, max: 1, palette: ['brown', 'white', 'blue']}, 'NDWI');
