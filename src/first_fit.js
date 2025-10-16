import Bin from './bin.js';

function first_fit_decreasing(items, bin_capacity) {
    // Sort items in decreasing order
    const sorted_items = [...items].sort((a, b) => b - a);
    
    const bins = [];
    
    for (const item of sorted_items) {
        let placed = false;
        for (const bin of bins) {
            if (bin.can_fit(item)) {
                bin.add_item(item);
                placed = true;
                break;
            }
        }
        if (!placed) {
            const new_bin = new Bin(bin_capacity);
            new_bin.add_item(item);
            bins.push(new_bin);
        }
    }
    
    return bins;
}

export { first_fit_decreasing };

