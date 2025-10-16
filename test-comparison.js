import { readFileSync } from 'fs';
import { performance } from 'perf_hooks';

// We'll need to modify canFitVehicles to accept algorithm choice
import { findCheapestCombination } from './src/findCheapestCombination.js';

const testData = [
    { length: 10, quantity: 1 },
    { length: 20, quantity: 2 },
    { length: 25, quantity: 1 }
];

// Convert to items array
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
console.log(`Test data: ${JSON.stringify(testData)}`);
console.log(`Total items: ${items.length}`);
console.log(`Total locations: ${locationMap.size}\n`);

// We'll manually test a few locations
let firstFitResults = [];
let bestFitResults = [];

// Test with first 10 locations
let count = 0;
for (const [location_id, listings] of locationMap) {
    if (count++ >= 10) break;
    
    // You'll need to run this twice - once with each algorithm enabled
    const result = findCheapestCombination(listings, items);
    if (result) {
        console.log(`Location ${location_id.substring(0, 8)}...`);
        console.log(`  Listings used: ${result.listing_ids.length}`);
        console.log(`  Price: $${(result.total_price / 100).toFixed(2)}`);
    }
}

