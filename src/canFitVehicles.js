import { firstFitFixedBins } from './firstFitFixedBins.js';

function canFitVehicles(selectedListings, items) {
    // Check if the given listings can fit all vehicles
    // Each listing provides multiple "rows" (width / 10)
    // Each row can fit vehicles along its length using bin packing
    
    // Collect all available row capacities from all listings
    const rowCapacities = [];
    
    for (const listing of selectedListings) {
        const numRows = listing.width / 10;
        const rowLength = listing.length;
        
        // Add this many rows with this capacity
        for (let i = 0; i < numRows; i++) {
            rowCapacities.push(rowLength);
        }
    }
    
    // Try to fit all vehicles into these rows using first-fit decreasing
    return firstFitFixedBins(items, rowCapacities);
}
export { canFitVehicles };