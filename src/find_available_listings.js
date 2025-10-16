import { readFileSync } from 'fs';
import { first_fit_decreasing } from './first_fit.js';

function find_available_listings(vehicles_data) {
    const items = [];

    for (const item of vehicles_data) {
        for (let i = 0; i < item.quantity; i++) {
            items.push(item.length);
        }
    }

    // Read the listings json
    const listings_data = JSON.parse(
        readFileSync('listings.json', 'utf-8')
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

