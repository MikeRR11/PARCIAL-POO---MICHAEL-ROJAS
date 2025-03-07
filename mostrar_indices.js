async function showNDVIOnMap(map) {
    // PASO 1: Definir el área de localidad
    var bogota = ee.FeatureCollection('FAO/GAUL/2015/level2')
                   .filter(ee.Filter.eq('ADM2_NAME', 'Bogotá'));

    // PASO 2: Cargar la colección de imágenes (Landsat 8 es una buena opción)
    var collection = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')
                      .filterBounds(bogota)   // Filtrar por Bogotá
                      .filterDate('2023-01-01', '2023-12-31');  // Rango temporal

    // PASO 3: Seleccionar la imagen más reciente con menos nubes
    var image = collection.sort('CLOUD_COVER').first();

    // PASO 4: Recortar la imagen al área de Bogotá
    var imageBogota = image.clip(bogota);

    // PASO 5: Calcular NDVI usando .expression()
    var ndvi = imageBogota.expression(
        '(NIR - RED) / (NIR + RED)',
        {
            'NIR': imageBogota.select('B5'),   // Banda NIR
            'RED': imageBogota.select('B4')    // Banda RED
        }
    ).rename('NDVI');

    // PASO 8: Mostrar resultados en el mapa
    var ndviLayer = ui.Map.Layer(ndvi, {min: -1, max: 1, palette: ['blue', 'white', 'green']}, 'NDVI');
    map.layers().set(0, ndviLayer);
}

async function showSAVIOnMap(map) {
    // PASO 1: Definir el área de localidad
    var bogota = ee.FeatureCollection('FAO/GAUL/2015/level2')
                   .filter(ee.Filter.eq('ADM2_NAME', 'Bogotá'));

    // PASO 2: Cargar la colección de imágenes (Landsat 8 es una buena opción)
    var collection = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')
                      .filterBounds(bogota)   // Filtrar por Bogotá
                      .filterDate('2023-01-01', '2023-12-31');  // Rango temporal

    // PASO 3: Seleccionar la imagen más reciente con menos nubes
    var image = collection.sort('CLOUD_COVER').first();

    // PASO 4: Recortar la imagen al área de Bogotá
    var imageBogota = image.clip(bogota);

    // PASO 6: Calcular SAVI usando .expression()
    var savi = imageBogota.expression(
        '((NIR - RED) / (NIR + RED + L)) * (1 + L)',
        {
            'NIR': imageBogota.select('B5'),
            'RED': imageBogota.select('B4'),
            'L': 0.5
        }
    ).rename('SAVI');

    // PASO 8: Mostrar resultados en el mapa
    var saviLayer = ui.Map.Layer(savi, {min: -1, max: 1, palette: ['yellow', 'orange', 'green']}, 'SAVI');
    map.layers().set(0, saviLayer);
}
