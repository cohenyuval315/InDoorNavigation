// class PriorityQueue<T> {
//   private items: T[] = [];
//   private comparator: (a: T, b: T) => number;

//   constructor(comparator: (a: T, b: T) => number) {
//     this.comparator = comparator;
//   }

//   enqueue(item: T) {
//     this.items.push(item);
//     this.items.sort(this.comparator);
//   }

//   dequeue(): T | undefined {
//     return this.items.shift();
//   }

//   peek(): T | undefined {
//     return this.items[0];
//   }

//   isEmpty(): boolean {
//     return this.items.length === 0;
//   }
// }

// export default PriorityQueue

class PriorityQueue {
  constructor(comparator) {
    this.items = [];
    this.comparator = comparator;
  }

  enqueue(item) {
    this.items.push(item);
    this.items.sort(this.comparator);
  }

  dequeue() {
    return this.items.shift();
  }

  peek() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
export default PriorityQueue;