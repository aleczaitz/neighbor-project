from bin import Bin

def first_fit_decreasing(items, bin_capacity):
    # Sort items in decreasing order
    sorted_items = sorted(items, reverse=True)
    
    bins = []
    
    for item in sorted_items:
        placed = False
        for b in bins:
            if b.can_fit(item):
                b.add_item(item)
                placed = True
                break
        if not placed:
            new_bin = Bin(bin_capacity)
            new_bin.add_item(item)
            bins.append(new_bin)
    
    return bins

