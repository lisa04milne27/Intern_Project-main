// Save as process2025csv.js in src/data
import fs from 'fs';
import csv from 'csv-parser';

// Central Cambridge (WGS84)
const cambridgeLat = 52.2053;
const cambridgeLng = 0.1218;

// Convert OSGB36 Easting/Northing to WGS84 lat/lng
// Uses a simple approximation for Cambridge area
function enToLatLng(easting, northing) {
  // For production, use a library like 'osgb36-to-wgs84'
  // Here is a rough approximation for Cambridge
  const lat = 49.0 + ((northing - 0) / 111320);
  const lng = -7.0 + ((easting - 0) / 40000);
  return { lat, lng };
}

// Haversine formula for distance (km)
function getDistance(lat1, lng1, lat2, lng2) {
  const toRad = x => x * Math.PI / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat/2)**2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

const results = [];
fs.createReadStream('src/data/2025.csv')
  .pipe(csv())
  .on('data', (row) => {
    const easting = parseFloat(row['sample.samplingPoint.easting']);
    const northing = parseFloat(row['sample.samplingPoint.northing']);
    if (!isNaN(easting) && !isNaN(northing)) {
      const { lat, lng } = enToLatLng(easting, northing);
      results.push({
        id: row['sample.samplingPoint.notation'],
        name: row['sample.samplingPoint.label'],
        lat,
        lng,
        easting,
        northing
      });
    }
  })
  .on('end', () => {
    // Sort by distance to Cambridge
    results.sort((a, b) =>
      getDistance(cambridgeLat, cambridgeLng, a.lat, a.lng) -
      getDistance(cambridgeLat, cambridgeLng, b.lat, b.lng)
    );
    // Take 50 closest
    const closest = results.slice(0, 50);
    fs.writeFileSync('src/data/cambridge_sampling_points.json', JSON.stringify(closest, null, 2));
    console.log('Saved 50 closest sampling points to src/data/cambridge_sampling_points.json');
  });