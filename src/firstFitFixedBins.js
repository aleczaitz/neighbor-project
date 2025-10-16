import Bin from './bin.js';

/**
 * First-fit decreasing with a fixed set of bins (rows) with potentially different capacities
 * @param {number[]} items - Array of vehicle lengths to fit
 * @param {number[]} binCapacities - Array of bin capacities (row lengths)
 * @returns {boolean} - True if all items fit, false otherwise
 */
function firstFitFixedBins(items, binCapacities) {
    // Sort items in decreasing order
    const sorted_items = [...items].sort((a, b) => b - a);
    
    // Create bins with specified capacities
    const bins = binCapacities.map(capacity => new Bin(capacity));
    
    // Try to fit each item
    for (const item of sorted_items) {
        let placed = false;
        
        // Try to fit in existing bins
        for (const bin of bins) {
            if (bin.can_fit(item)) {
                bin.add_item(item);
                placed = true;
                break;
            }
        }
        
        // If we couldn't place it, the items don't fit
        if (!placed) {
            return false;
        }
    }
    
    // All items were placed successfully
    return true;
}

export { firstFitFixedBins };

