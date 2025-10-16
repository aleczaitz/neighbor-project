class Bin:
    def __init__(self, capacity):
        self.items = []
        self.capacity = capacity
        self.current_weight = 0

    def calc_curr_weight(self):
        items_sum = 0
        for item in self.items:
            items_sum += item
        return items_sum
    
    def is_full(self):
        return self.current_weight >= self.capacity
    
    def can_fit(self, item):
        remainder = self.capacity - self.current_weight
        return item <= remainder
    
    def add_item(self, item):
        if self.can_fit(item):
            self.items.append(item)
            self.current_weight += item
        else:
            raise Exception("Tried to fit item where it can't fit")
        
    def remove_item(self, item):
        if item in self.items:
            self.items.remove(item)
            self.current_weight = self.calc_curr_weight()
        else:
            raise Exception("Tried to remove item that isn't in bin")
        
    
