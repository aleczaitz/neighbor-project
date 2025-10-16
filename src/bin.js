class Bin {
    constructor(capacity) {
        this.items = [];
        this.capacity = capacity;
        this.current_weight = 0;
    }

    calc_curr_weight() {
        return this.items.reduce((sum, item) => sum + item, 0);
    }

    is_full() {
        return this.current_weight >= this.capacity;
    }

    can_fit(item) {
        const remainder = this.capacity - this.current_weight;
        return item <= remainder;
    }

    add_item(item) {
        if (this.can_fit(item)) {
            this.items.push(item);
            this.current_weight += item;
        } else {
            throw new Error("Tried to fit item where it can't fit");
        }
    }

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

