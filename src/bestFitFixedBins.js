import Bin from './bin.js';

/**
 * Best-fit decreasing with a fixed set of bins (rows) with potentially different capacities
 * Places each item in the bin with the smallest remaining space (tightest fit)
 * @param {number[]} items - Array of vehicle lengths to fit
 * @param {number[]} binCapacities - Array of bin capacities (row lengths)
 * @returns {boolean} - True if all items fit, false otherwise
 */
function bestFitFixedBins(items, binCapacities) {
    // Sort items in decreasing order
    const sorted_items = [...items].sort((a, b) => b - a);
    
    // Create bins with specified capacities
    const bins = binCapacities.map(capacity => new Bin(capacity));
    
    // Try to fit each item
    for (const item of sorted_items) {
        let bestBin = null;
        let smallestRemainder = Infinity;
        
        // Find the bin with the smallest remaining space that can still fit the item
        for (const bin of bins) {
            if (bin.can_fit(item)) {
                const remainder = bin.capacity - bin.current_weight - item;
                
                // Choose bin with smallest remainder (tightest fit)
                if (remainder < smallestRemainder) {
                    smallestRemainder = remainder;
                    bestBin = bin;
                }
            }
        }
        
        // If we found a suitable bin, place the item
        if (bestBin) {
            bestBin.add_item(item);
        } else {
            // No bin can fit this item
            return false;
        }
    }
    
    // All items were placed successfully
    return true;
}

export { bestFitFixedBins };

