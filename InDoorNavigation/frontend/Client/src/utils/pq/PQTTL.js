class PriorityQueueTTL {
    constructor(comparator, ttl) {
      this.items = [];
      this.comparator = comparator;
      this.ttl = ttl; // TTL in milliseconds
    }
  
    enqueue(item) {
      // Remove items that are too old
      const now = Date.now();
      while (this.items.length > 0 && now - this.items[0].timestamp > this.ttl) {
        this.items.shift();
      }
      
      this.items.push(item);
      this.items.sort(this.comparator);
    }
  
    dequeue() {
      const now = Date.now();
      // Remove items that are too old
      while (this.items.length > 0 && now - this.items[0].timestamp > this.ttl) {
        this.items.shift();
      }
      
      return this.items.shift();
    }
  
    peek() {
      return this.items[0];
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  }
  

  export default PriorityQueueTTL;