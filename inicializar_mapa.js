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

    // Synchronize both maps
    map1.sync(map2);
    map2.sync(map1);

    // Example of how to load additional layers
    // let loadAdditionalLayer = async function() {
    //     let additionalData = await fetch("ADDITIONAL_LAYER.geojson");
    //     let additionalLayer = await additionalData.json();
    
    //     L.geoJSON(additionalLayer, {
    //         style: { color: 'green' }
    //     }).addTo(map1).addTo(map2); // Add to both maps
    // };
    // loadAdditionalLayer();
});