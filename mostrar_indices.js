// Import the Earth Engine API
const ee = require('@google/earthengine');

async function showNDVIOnMap(map) {
    console.log("Starting NDVI calculation...");
    try {
        // PASO 1: Definir el área de localidad
        var bogota = ee.FeatureCollection('FAO/GAUL/2015/level2')
                       .filter(ee.Filter.eq('ADM2_NAME', 'Bogotá'));

        // PASO 2: Cargar la colección de imágenes (Landsat 8 es una buena opción)
        var collection = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')
                          .filterBounds(bogota)   // Filtrar por Bogotá
                          .filterDate('2023-01-01', '2023-12-31');  // Rango temporal

        // PASO 3: Seleccionar la imagen más reciente con menos nubes
        var image = collection.sort('CLOUD_COVER').first();
        console.log("Image selected:", image);

        // PASO 4: Recortar la imagen al área de Bogotá
        var imageBogota = image.clip(bogota);
        console.log("Image clipped to Bogotá:", imageBogota);

        // PASO 5: Calcular NDVI usando .expression()
        var ndvi = imageBogota.expression(
            '(NIR - RED) / (NIR + RED)',
            {
                'NIR': imageBogota.select('B5'),   // Banda NIR
                'RED': imageBogota.select('B4')    // Banda RED
            }
        ).rename('NDVI');
        console.log("NDVI calculated:", ndvi);

        // PASO 8: Mostrar resultados en el mapa
        var ndviLayer = ui.Map.Layer(ndvi, {min: -1, max: 1, palette: ['blue', 'white', 'green']}, 'NDVI');
        map.layers().set(0, ndviLayer);
        console.log("NDVI layer added to map");
    } catch (error) {
        console.error("Error calculating NDVI:", error);
    }
}

async function showSAVIOnMap(map) {
    console.log("Starting SAVI calculation...");
    try {
        // PASO 1: Definir el área de localidad
        var bogota = ee.FeatureCollection('FAO/GAUL/2015/level2')
                       .filter(ee.Filter.eq('ADM2_NAME', 'Bogotá'));

        // PASO 2: Cargar la colección de imágenes (Landsat 8 es una buena opción)
        var collection = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')
                          .filterBounds(bogota)   // Filtrar por Bogotá
                          .filterDate('2023-01-01', '2023-12-31');  // Rango temporal

        // PASO 3: Seleccionar la imagen más reciente con menos nubes
        var image = collection.sort('CLOUD_COVER').first();
        console.log("Image selected:", image);

        // PASO 4: Recortar la imagen al área de Bogotá
        var imageBogota = image.clip(bogota);
        console.log("Image clipped to Bogotá:", imageBogota);

        // PASO 6: Calcular SAVI usando .expression()
        var savi = imageBogota.expression(
            '((NIR - RED) / (NIR + RED + L)) * (1 + L)',
            {
                'NIR': imageBogota.select('B5'),
                'RED': imageBogota.select('B4'),
                'L': 0.5
            }
        ).rename('SAVI');
        console.log("SAVI calculated:", savi);

        // PASO 8: Mostrar resultados en el mapa
        var saviLayer = ui.Map.Layer(savi, {min: -1, max: 1, palette: ['yellow', 'orange', 'green']}, 'SAVI');
        map.layers().set(0, saviLayer);
        console.log("SAVI layer added to map");
    } catch (error) {
        console.error("Error calculating SAVI:", error);
    }
}
