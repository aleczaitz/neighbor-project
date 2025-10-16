/**
 * Bin class for bin packing algorithms
 * Represents a single bin/row that can hold items up to a maximum capacity
 */
class Bin {
    /**
     * @param {number} capacity - Maximum capacity of the bin
     */
    constructor(capacity) {
        this.items = [];
        this.capacity = capacity;
        this.current_weight = 0;
    }

    /**
     * Calculates the current weight by summing all items in the bin
     * @returns {number} - Total weight of all items
     */
    calc_curr_weight() {
        return this.items.reduce((sum, item) => sum + item, 0);
    }

    /**
     * Checks if the bin is at or above capacity
     * @returns {boolean} - True if bin is full, false otherwise
     */
    is_full() {
        return this.current_weight >= this.capacity;
    }

    /**
     * Checks if an item can fit in the bin
     * @param {number} item - Size of the item to check
     * @returns {boolean} - True if item fits, false otherwise
     */
    can_fit(item) {
        const remainder = this.capacity - this.current_weight;
        return item <= remainder;
    }

    /**
     * Adds an item to the bin
     * @param {number} item - Size of the item to add
     * @throws {Error} - If item doesn't fit in the bin
     */
    add_item(item) {
        if (this.can_fit(item)) {
            this.items.push(item);
            this.current_weight += item;
        } else {
            throw new Error("Tried to fit item where it can't fit");
        }
    }

    /**
     * Removes the first occurrence of an item from the bin
     * @param {number} item - Size of the item to remove
     * @throws {Error} - If item is not in the bin
     */
    remove_item(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
            this.current_weight = this.calc_curr_weight();
        } else {
            throw new Error("Tried to remove item that isn't in bin");
        }
    }
}

export default Bin;

