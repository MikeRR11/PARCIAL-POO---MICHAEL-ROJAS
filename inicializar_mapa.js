document.addEventListener('DOMContentLoaded', function () {
    var map1 = L.map('map1').setView([4.60971, -74.08175], 13);
    var map2 = L.map('map2').setView([4.60971, -74.08175], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map1);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map2);

    L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        attribution: '&copy; Google'
    }).addTo(map2);

    map1.sync(map2);
    map2.sync(map1);
});