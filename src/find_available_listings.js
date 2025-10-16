import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { first_fit_decreasing } from './first_fit.js';
import { canFitVehicles } from './canFitVehicles.js';
import { findCheapestCombination } from './findCheapestCombination.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function find_available_listings(vehicles_data) {
    const items = [];

    // Convert vehicles data to array of vehicle lengths
    for (const item of vehicles_data) {
        for (let i = 0; i < item.quantity; i++) {
            items.push(item.length);
        }
    }

    // Read the listings json
    const listingsPath = join(__dirname, '..', 'listings.json');
    const listings_data = JSON.parse(
        readFileSync(listingsPath, 'utf-8')
    );

    // Group listings by location_id
    const locationMap = new Map();
    
    for (const listing of listings_data) {
        if (!locationMap.has(listing.location_id)) {
            locationMap.set(listing.location_id, []);
        }
        locationMap.get(listing.location_id).push(listing);
    }

    const results = [];

    // For each location, find if vehicles can fit and find cheapest combination
    for (const [location_id, listings] of locationMap) {
        const cheapestCombination = findCheapestCombination(listings, items);
        
        if (cheapestCombination) {
            results.push({
                location_id,
                listing_ids: cheapestCombination.listing_ids,
                total_price_in_cents: cheapestCombination.total_price
            });
        }
    }

    // Sort by total price ascending
    results.sort((a, b) => a.total_price_in_cents - b.total_price_in_cents);

    return results;
}

export { find_available_listings };

