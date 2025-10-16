import { firstFitFixedBins } from './firstFitFixedBins.js';
import { bestFitFixedBins } from './bestFitFixedBins.js';
import { exactFitFixedBins } from './exactFitFixedBins.js';

function canFitVehicles(selectedListings, items, algorithm = 'exact-fit') {
    // Check if the given listings can fit all vehicles
    // Each listing provides multiple "rows" (width / 10)
    // Each row can fit vehicles along its length using bin packing
    
    // Collect all available row capacities from all listings
    const rowCapacities = [];
    
    for (const listing of selectedListings) {
        const numRows = Math.floor(listing.width / 10); // Just in case there is a listing that is not divisible by 10
        const rowLength = listing.length;
        
        // Add this many rows with this capacity
        for (let i = 0; i < numRows; i++) {
            rowCapacities.push(rowLength);
        }
    }
    
    // Choose algorithm
    if (algorithm === 'first-fit') {
        return firstFitFixedBins(items, rowCapacities);
    } else if (algorithm === 'best-fit') {
        return bestFitFixedBins(items, rowCapacities);
    } else {
        return exactFitFixedBins(items, rowCapacities);
    }
}
export { canFitVehicles };