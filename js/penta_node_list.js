import PentaNode from './penta_node.js';
import { rootToJson } from './util';

// (head) <-> (...nodes) <-> (tail)
class PentaNodeList {
  constructor(freqHash) {
    this.count = 0;
    this.head = new PentaNode("head", 0);
    this.tail = new PentaNode("tail", 0);
    this.tail.left = this.head;
    this.head.right = this.tail;
    let keys = Object.keys(freqHash);
    for (let i = 0; i < keys.length; i++) {
      let node = new PentaNode(keys[i], freqHash[keys[i]]);
      this.insert(node);
    }
  }

  insert(node) {
    let currNode = this.tail.left;
    while (currNode !== this.head) {
      if (currNode.count > node.count) {
        // insert to right of currNode
        node.left = currNode;
        node.right = currNode.right;
        currNode.right.left = node;
        currNode.right = node;
        this.count++;
        return;
      }
      currNode = currNode.left;
    }
    // insert to right of head
    node.left = currNode;
    node.right = currNode.right;
    currNode.right.left = node;
    currNode.right = node;
    this.count++;
  }

  append(node) {
    node.left = this.tail.left;
    node.right = this.tail;
    this.tail.left.right = node;
    this.tail.left = node;
  }

  mergeLastTwo() {
    if (this.count > 1) {
      let last = this.pop();
      let nextToLast = this.pop();
      this.append(PentaNode.merge(nextToLast, last));
    }
  }

  combineLastTwo() {
    if (this.count > 1) {
      let last = this.pop();
      let nextToLast = this.pop();
      this.insert(PentaNode.merge(nextToLast, last));
    }
  }

  pop() {
    if (this.count < 1) {
      return null;
    } else {
      let node = this.tail.left;
      this.tail.left = node.left;
      node.left.right = this.tail;
      node.left = null;
      node.right = null;
      this.count--;
      return node;
    }
  }

  getPentaNodeTree() {
    if (this.count < 1) {
      return null;
    } else if (this.count === 1) {
      return this.head.right;
    } else {
      while (this.count > 1) {
        this.combineLastTwo();
      }
      return this.head.right;
    }
  }

  nextMorphState() {
    if (this.count > 1) {
      this.combineLastTwo();
      return this.toHierarchyObject();
    } else if (this.count === 1) {
      return this.toHierarchyObject();
    } else {
      return {};
    }
  }

  toHierarchyObject() {
    if (this.isTree()) {
      return rootToJson(this.head.right);
    } else {
      return this.leftToJson(this.head.right);
    }
  }

  leftToJson(node) {
    return {
      name: node.name,
      // id: node.name,
      count: node.count,
      children: (node.right === this.tail) ? [] : [this.leftToJson(node.right)],
    };
  }

  isTree() {
    return this.count === 1;
  }

  isInOrder() {
    let walker = this.head.right;
    let currCount = walker.count;

  }

}

export default PentaNodeList;
