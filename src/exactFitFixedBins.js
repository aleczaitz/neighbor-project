import Bin from './bin.js';

/**
 * Exact-fit decreasing with a fixed set of bins (rows) with potentially different capacities
 * Prioritizes exact fits (no wasted space), then falls back to best-fit
 * @param {number[]} items - Array of vehicle lengths to fit
 * @param {number[]} binCapacities - Array of bin capacities (row lengths)
 * @returns {boolean} - True if all items fit, false otherwise
 */
function exactFitFixedBins(items, binCapacities) {
    // Sort items in decreasing order
    const sorted_items = [...items].sort((a, b) => b - a);
    
    // Create bins with specified capacities
    const bins = binCapacities.map(capacity => new Bin(capacity));
    
    // Try to fit each item
    for (const item of sorted_items) {
        let exactBin = null;
        let bestBin = null;
        let smallestRemainder = Infinity;
        
        // First pass: look for exact fit
        for (const bin of bins) {
            if (bin.can_fit(item)) {
                const remainder = bin.capacity - bin.current_weight - item;
                
                // Perfect fit!
                if (remainder === 0) {
                    exactBin = bin;
                    break;
                }
                
                // Track best fit as fallback
                if (remainder < smallestRemainder) {
                    smallestRemainder = remainder;
                    bestBin = bin;
                }
            }
        }
        
        // Prefer exact fit, fall back to best fit
        const chosenBin = exactBin || bestBin;
        
        if (chosenBin) {
            chosenBin.add_item(item);
        } else {
            // No bin can fit this item
            return false;
        }
    }
    
    // All items were placed successfully
    return true;
}

export { exactFitFixedBins };

