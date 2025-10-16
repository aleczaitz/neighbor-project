import { readFileSync } from 'fs';
import { performance } from 'perf_hooks';
import { firstFitFixedBins } from './src/firstFitFixedBins.js';
import { bestFitFixedBins } from './src/bestFitFixedBins.js';
import { exactFitFixedBins } from './src/exactFitFixedBins.js';

// Load and prepare listings data once
const listings_data = JSON.parse(readFileSync('listings.json', 'utf-8'));
const locationMap = new Map();

for (const listing of listings_data) {
    if (!locationMap.has(listing.location_id)) {
        locationMap.set(listing.location_id, []);
    }
    locationMap.get(listing.location_id).push(listing);
}

// Pre-compute row capacities for each location
const locationRows = new Map();
for (const [location_id, listings] of locationMap) {
    const rowCapacities = [];
    for (const listing of listings) {
        const numRows = Math.floor(listing.width / 10);
        const rowLength = listing.length;
        for (let i = 0; i < numRows; i++) {
            rowCapacities.push(rowLength);
        }
    }
    locationRows.set(location_id, rowCapacities);
}

// Test scenarios
const scenarios = [
    {
        name: "Small vehicles",
        data: [{ length: 10, quantity: 2 }, { length: 15, quantity: 1 }]
    },
    {
        name: "Mixed sizes",
        data: [{ length: 10, quantity: 1 }, { length: 20, quantity: 2 }, { length: 25, quantity: 1 }]
    },
    {
        name: "Large vehicles",
        data: [{ length: 30, quantity: 2 }, { length: 40, quantity: 2 }]
    }
];

const algorithms = [
    { name: 'First-Fit', fn: firstFitFixedBins },
    { name: 'Best-Fit', fn: bestFitFixedBins },
    { name: 'Exact-Fit', fn: exactFitFixedBins }
];

console.log('\n=== ALGORITHM COMPARISON TEST ===\n');
console.log(`Total locations: ${locationMap.size}\n`);

// Run tests
for (const scenario of scenarios) {
    const items = [];
    for (const item of scenario.data) {
        for (let i = 0; i < item.quantity; i++) {
            items.push(item.length);
        }
    }

    console.log(`📦 ${scenario.name}: [${items.join(', ')}]`);

    for (const algo of algorithms) {
        let count = 0;
        const start = performance.now();
        
        for (const rowCapacities of locationRows.values()) {
            if (algo.fn(items, rowCapacities)) count++;
        }
        
        const time = performance.now() - start;
        console.log(`   ${algo.name.padEnd(10)} → ${count.toString().padStart(4)} locations | ${time.toFixed(2).padStart(6)}ms`);
    }
    
    console.log('');
}

console.log('=== TEST COMPLETE ===\n');

