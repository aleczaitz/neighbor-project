import time
import sys, json
from first_fit import first_fit_decreasing

def find_available_listings():
    print("Starting the first fit algorithm...", file=sys.stderr)

    # read the and convert the posted json
    vehicles_data = json.load(sys.stdin)

    items = []

    for item in vehicles_data:
        for i in range(item["quantity"]):
            items.append(item["length"])

    
    # read the listings json
    with open('listings.json', 'r') as f:
        listings_data = json.load(f)
    
    available_listings = []

    for listing in listings_data:
        bin_capacity = listing["length"]
        bins = first_fit_decreasing(items, bin_capacity)
        if len(bins) <= listing["width"] / 10:
            available_listings.append(listing)

    # Print the result as JSON
    json.dump(available_listings, sys.stdout)

if __name__ == "__main__":
    find_available_listings()