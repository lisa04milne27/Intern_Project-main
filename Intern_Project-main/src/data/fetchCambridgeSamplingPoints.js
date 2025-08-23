// Save as fetchCambridgeSamplingPoints.js
import fs from 'fs';
import csv from 'csv-parser';

// Central Cambridge coordinates (approx)
const cambridgeLat = 52.2053;
const cambridgeLng = 0.1218;

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

// Accurate OSGB36 Easting/Northing to WGS84 lat/lng conversion
// Uses Helmert transform (approximate for most UK points)
import proj4 from 'proj4';
const osgb36 = '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs';
const wgs84 = proj4.WGS84;
function enToLatLng(easting, northing) {
  const [lng, lat] = proj4(osgb36, wgs84, [easting, northing]);
  return { lat, lng };
}

function processCSV() {
  const pointMap = new Map();
  fs.createReadStream('src/data/2025.csv')
    .pipe(csv())
    .on('data', (row) => {
      const easting = parseFloat(row['sample.samplingPoint.easting']);
      const northing = parseFloat(row['sample.samplingPoint.northing']);
      if (!isNaN(easting) && !isNaN(northing)) {
        const { lat, lng } = enToLatLng(easting, northing);
        const id = row['sample.samplingPoint.notation'];
        // Only keep the latest record for each unique id
        const existing = pointMap.get(id);
        if (!existing || new Date(row['sample.sampleDateTime']) > new Date(existing.sampleDateTime)) {
          pointMap.set(id, {
            id,
            name: row['sample.samplingPoint.label'],
            lat,
            lng,
            easting,
            northing,
            sampleDateTime: row['sample.sampleDateTime'],
            determinand: row['determinand.label'],
            result: row['result'],
            resultInterpretation: row['codedResultInterpretation.interpretation'],
            unit: row['determinand.unit.label'],
            materialType: row['sample.sampledMaterialType.label'],
            isComplianceSample: row['sample.isComplianceSample'],
            purpose: row['sample.purpose.label']
          });
        }
      }
    })
    .on('end', () => {
      // Convert map to array
      const results = Array.from(pointMap.values());
      // Sort by distance to Cambridge
      results.sort((a, b) =>
        getDistance(cambridgeLat, cambridgeLng, a.lat, a.lng) -
        getDistance(cambridgeLat, cambridgeLng, b.lat, b.lng)
      );
      // Take 50 closest unique points
      const closest = results.slice(0, 50);
      fs.writeFileSync('src/data/cambridge_sampling_points.json', JSON.stringify(closest, null, 2));
      console.log('Saved 50 unique closest sampling points to src/data/cambridge_sampling_points.json');
    });
}

processCSV();