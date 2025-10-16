import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { first_fit_decreasing } from './first_fit.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function find_available_listings(vehicles_data) {
    const items = [];

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

    const available_listings = [];

    for (const listing of listings_data) {
        const bin_capacity = listing.length;
        const bins = first_fit_decreasing(items, bin_capacity);
        if (bins.length <= listing.width / 10) {
            available_listings.push(listing);
        }
    }

    return available_listings;
}

export { find_available_listings };

