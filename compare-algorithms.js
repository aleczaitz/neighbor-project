import { readFileSync } from 'fs';
import { performance } from 'perf_hooks';
import { firstFitFixedBins } from './src/firstFitFixedBins.js';
import { bestFitFixedBins } from './src/bestFitFixedBins.js';

// Test data
const testData = [
    { length: 10, quantity: 1 },
    { length: 20, quantity: 2 },
    { length: 25, quantity: 1 }
];

// Convert to items
const items = [];
for (const item of testData) {
    for (let i = 0; i < item.quantity; i++) {
        items.push(item.length);
    }
}

// Read listings
const listings_data = JSON.parse(readFileSync('listings.json', 'utf-8'));

// Group by location
const locationMap = new Map();
for (const listing of listings_data) {
    if (!locationMap.has(listing.location_id)) {
        locationMap.set(listing.location_id, []);
    }
    locationMap.get(listing.location_id).push(listing);
}

console.log('\n=== ALGORITHM COMPARISON ===\n');
console.log(`Test: ${JSON.stringify(testData)}`);
console.log(`Items to fit: ${items} (total: ${items.length} vehicles)\n`);

// Run both algorithms on all locations
let firstFitCount = 0;
let bestFitCount = 0;
let firstFitOnlyLocations = [];
let bestFitOnlyLocations = [];

const start = performance.now();

for (const [location_id, listings] of locationMap) {
    // Collect row capacities
    const rowCapacities = [];
    for (const listing of listings) {
        const numRows = listing.width / 10;
        const rowLength = listing.length;
        for (let i = 0; i < numRows; i++) {
            rowCapacities.push(rowLength);
        }
    }
    
    const firstFitWorks = firstFitFixedBins(items, rowCapacities);
    const bestFitWorks = bestFitFixedBins(items, rowCapacities);
    
    if (firstFitWorks) firstFitCount++;
    if (bestFitWorks) bestFitCount++;
    
    // Track differences
    if (firstFitWorks && !bestFitWorks) {
        firstFitOnlyLocations.push(location_id);
    }
    if (bestFitWorks && !firstFitWorks) {
        bestFitOnlyLocations.push(location_id);
    }
}

const end = performance.now();

console.log('RESULTS:');
console.log(`Total locations: ${locationMap.size}`);
console.log(`First-fit found: ${firstFitCount} locations`);
console.log(`Best-fit found:  ${bestFitCount} locations`);
console.log(`\nDifference: ${bestFitCount - firstFitCount} locations`);
console.log(`\nTime: ${(end - start).toFixed(2)}ms\n`);

if (firstFitOnlyLocations.length > 0) {
    console.log(`Locations ONLY first-fit found: ${firstFitOnlyLocations.length}`);
}
if (bestFitOnlyLocations.length > 0) {
    console.log(`Locations ONLY best-fit found: ${bestFitOnlyLocations.length}`);
    console.log(`(Best-fit found ${bestFitOnlyLocations.length} additional solutions!)`);
}

