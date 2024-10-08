import lodash from 'lodash';

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.previous = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // add a game to beginning 
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

  // add game to the end
  append(data) {
    const newNode = new Node(data);

    if (this.tail === null) {
      // list is empty, will be first item
      this.head = newNode;
      this.tail = newNode;
    } else {
      const newSecondLastNode = this.tail;
      // Point new node to old tail
      newNode.previous = newSecondLastNode;
      // point old tail to new node
      newSecondLastNode.next = newNode;
      this.tail = newNode;
    }
    this.length++
    return newNode;
  }


  remove(valueToRemove) {
    if (!this.head) return null; // list is empty

    let nodeToRemove = null;

    const obj1 = { key: 'value' };
    const obj3 = {...obj1}
    obj3.newKey = 'different' // { key: 'value',  newKey: 'different' // { key: 'value',  newKey}
    const obj2 = { key: 'value' };

    console.log(obj1 === obj2); // false
    console.log(obj1 === obj3); // false

    if(lodash.isEqual(this.head.data, valueToRemove)) { // remove and update the head
      nodeToRemove = this.head.data;
      const newHead = this.head.next;
      this.head = newHead; // update head to be second item in the list
      // this.head = this.head.next;
      if (this.head === null) { // there was no second, the head was the only item in the list
        this.tail = null;
      } else {
        this.head.previous = null;
      }
      this.length--;
      return nodeToRemove;
    }

    if(lodash.isEqual(this.tail.data, valueToRemove)) { // we have to remove the last item in the list and update tail
      nodeToRemove = this.tail.data;
      const newTail = this.tail;
      this.tail = newTail; // update tail to be second to last item in the list
      // this.tail = this.tail.next;
      if(this.tail === null) { // we just removed the only node
        this.head = null;
      } else {
        this.tail.next = null;
      }
      this.length--;
      return nodeToRemove
    }


    let currentNode = this.head; // use this var to start at the beginning

    while(currentNode.next !== null) { // the only node that will have .next be null is the last item

      if(lodash.isEqual(currentNode.next.data, valueToRemove)) { // we found it!
        nodeToRemove = currentNode.next;

        const newNeighbor = currentNode.next.next; // store the new neighbor

        currentNode.next = newNeighbor; // remove reference to nodeToRemove

        if (currentNode.next === null) { // we just removed the tail
          this.tail = currentNode;
          this.length--;
          return nodeToRemove;
        }

        newNeighbor.previous = currentNode; // remove last reference to nodeToRemove
        this.length--;
        return nodeToRemove;
      }
      currentNode = currentNode.next;
    }

    return nodeToRemove // no item was found;
  }


  toArray() {
    const array = [];
    let currentNode = this.head;
    
    while (currentNode !== null) {
      array.push(currentNode.data);
      currentNode = currentNode.next
    }

    return array;
  }

  size() {
    return this.length
  }

}
