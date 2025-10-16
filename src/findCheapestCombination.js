import { canFitVehicles } from './canFitVehicles.js';

function findCheapestCombination(listings, items, algorithm = 'exact-fit') {
    // Try to find the cheapest combination of listings that can fit all vehicles
    // We need to try different combinations and find the one with minimum total price
    
    let bestCombination = null;
    let minPrice = Infinity;

    // Generate all possible combinations of listings
    const n = listings.length;
    
    // Try all subsets (2^n combinations because we are either using a listing or not using it)
    for (let mask = 1; mask < (1 << n); mask++) {

        const selectedListings = [];
        let totalPrice = 0;
        
        for (let i = 0; i < n; i++) { // Iterate through each listing, deciding whether to include it in the subset
            if (mask & (1 << i)) {
                selectedListings.push(listings[i]); // Add the listing to the selected listings
                totalPrice += listings[i].price_in_cents;
            }
        }
        
        // Check if this combination can fit all vehicles
        if (canFitVehicles(selectedListings, items, algorithm)) { // ex: selectedListings = [1, 0, 1] and items = [item1, item2, item3]
            if (totalPrice < minPrice) {
                minPrice = totalPrice;
                bestCombination = {
                    listing_ids: selectedListings.map(l => l.id),
                    total_price: totalPrice
                };
            }
        }
    }

    return bestCombination; // returns a json object with the listing_ids and total_price
}
export { findCheapestCombination };