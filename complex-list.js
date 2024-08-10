class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Print the items in the list
  printList() {
    let current = this.head;
    while (current !== null) {
      console.log(current.data);
      current = current.next;
    }
  }

  // Find a node containing the given data
  find(data) {
    let current = this.head;
    while (current !== null) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  // Append new node with given data to beginning of list
  prepend(data) {
    const newNode = new Node(data);

    if (this.head === null) {
      // list is empty, will be first item
      this.head = newNode;
      this.tail = newNode;
    } else {
      const secondNode = this.head;
      newNode.next = secondNode; // update new node so that .next points to the new second item in the list
      secondNode.previous = newNode; // update new second to point to new first node

      this.head = newNode; // update head to be new first item in list
    }
    this.length++;
    return newNode;
  }

  // Append new node with given data to end of list
  append(data) {
    const newNode = new Node(data);

    if (this.tail === null) {
      // list is empty, will be first item
      this.head = newNode;
      this.tail = newNode;
    } else {
      const newSecondLastNode = this.tail;
      newNode.previous = newSecondLastNode;
      newSecondLastNode.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return newNode;
  }

  remove(valueToRemove) {
    if (!this.head) return null;
    let nodeToRemove = null;

    if (this.head.data === valueToRemove) {
      nodeToRemove = this.head;
      this.head = this.head.next;
      if (this.head === null) {
        this.tail = null;
      } else {
        this.head.previous = null;
      }
      this.length--;
      return nodeToRemove;
    }

    if (this.tail.data === valueToRemove) {
      nodeToRemove = this.tail;
      this.tail = this.tail.previous;
      if (this.tail === null) {
        this.head = null;
      } else {
        this.tail.next = null;
      }
      this.length--;
      return nodeToRemove;
    }

    let currentNode = this.head;

    while (currentNode !== null) {
      if (currentNode.next.data === valueToRemove) {
        nodeToRemove = currentNode.next;

        const newNeighbor = current.next.next;
        currentNode.next = newNeighbor;

        if (currentNode.next === null) {
          this.tail = currentNode;
          this.length--;
          return nodeToRemove;
        }

        newNeighbor.previous = current;
        this.length--;
        return nodeToRemove;
      }
      currentNode = currentNode.next;
    }

    return nodeToRemove;
  }

  // Remove the node at the given index
  removeByIndex(index) {
    if (index < 0 || index >= this.length) {
      return; // invalid index
    }

    if (index === 0) {
      this.head = this.head.next;
      if (this.head === null) {
        this.tail = null;
      }
      this.length--;
      return;
    } // or we can run our prepend method

    let current = this.head;
    let previous = null;
    let currentIndex = 0;

    while (current !== null && currentIndex < index) {
      previous = current;
      current = current.next;
      currentIndex++;
    }

    if (current !== null) {
      previous.next = current.next;
      if (previous.next === null) {
        this.tail = previous;
      }
      this.length--;
    }
  }

  // Insert a new node at the given index
  insertAt(index, data) {
    if (index < 0 || index > this.length) {
      return; // invalid index
    }

    const newNode = new Node(data);

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
      if (this.tail === null) {
        this.tail = newNode;
      }
      this.length++;
      return;
    } // or we can run our prepend method

    let current = this.head;
    let previous = null;
    let currentIndex = 0;

    // traverse through list until we find the index
    while (currentIndex < index) {
      previous = current;
      current = current.next;
      currentIndex++;
    }

    newNode.next = current;
    previous.next = newNode;

    if (newNode.next === null) {
      this.tail = newNode;
    }

    this.length++;
  }

  toArray() {
    const array = [];
    let currentNode = this.head;

    while (currentNode !== null) {
      array.push(currentNode.data);
      currentNode = currentNode.next;
    }

    return array;
  }

  toObject() {
    const obj = {};
    let current = this.head;
    let index = 0;
    while (current !== null) {
      obj[index] = current.data;
      current = current.next;
      index++;
    }
    return obj;
  }

  // Clear the list
  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Check if the list is empty
  isEmpty() {
    return this.length === 0;
  }

  // Get the size of the list
  size() {
    return this.length;
  }
}

// Example usage
const ll = new LinkedList();
ll.append("apple");
ll.append("berry");
ll.append("cherry");
ll.printList();

console.log("Removing index 0:");
ll.removeByIndex(0);
ll.printList();

console.log("Inserting at index 1:");
ll.insertAt(1, "date");
ll.printList();

console.log("Clearing the list:");
ll.clear();
ll.printList();

console.log("Is list empty?", ll.isEmpty());
console.log("Size of list:", ll.size());
