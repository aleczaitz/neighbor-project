export function canFitVehicles(selectedListings, items) {
    // Check if each of the given listings can fit all vehicles
    // Each listing can be treated as having multiple "rows" (width / 10)
    // Each row can fit vehicles along its length using bin packing
    
    let totalRows = 0;
    
    for (const listing of selectedListings) {
        const bin_capacity = listing.length;
        const bins = first_fit_decreasing(items, bin_capacity);
        const rows_needed = bins.length;
        const rows_available = listing.width / 10;
        
        // This listing can only contribute if it has enough rows
        if (rows_needed <= rows_available) {
            // If this single listing can fit everything, we're done
            totalRows += rows_available;
            if (rows_needed <= rows_available) {
                return true;
            }
        }
    }
    
    // For multiple listings, we need more sophisticated logic
    // For now, check if any single listing can fit all vehicles
    for (const listing of selectedListings) {
        const bin_capacity = listing.length;
        const bins = first_fit_decreasing(items, bin_capacity);
        if (bins.length <= listing.width / 10) {
            return true;
        }
    }
    
    return false;
}