class PentaNode {
  constructor(name, count) {
    this.name = name;
    this.count = count;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.leftChild = null;
    this.rightChild = null;
  }

  isLeaf() {
    return (!this.leftChild) && (!this.rightChild);
  }

  isLeftChild() {
    if (this.parent) {
      return this.parent.leftChild === this;
    } else {
      return false;
    }
  }

  getBirthOrder() {
    if (this.parent.leftChild === this) {
      return 0;
    }
    if (this.parent.rightChild === this) {
      return 1;
    }
    return -1;
  }

  setLeft(node) {
    node.right = this;
    node.left = this.left;
    if (this.left) {
      this.left.right = node;
    }
    this.left = node;
  }

  setRight(node) {
    node.right = this;
    node.left = this.left;
    if (this.left) {
      this.left.right = node;
    }
    this.left = node;
  }

  setLeftChild(node) {
    if (node) {
      if (node.parent) {
        let order = this.getBirthOrder();
        if (order === 0) {
          node.parent.leftChild = null;
        } else if (order === 1) {
          node.parent.rightChild = null;
        }
        node.parent = null;
      }
      node.parent = this;
    }
    this.leftChild = node;
  }

  setRightChild(node) {
    if (node) {
      if (node.parent) {
        let order = this.getBirthOrder();
        if (order === 0) {
          node.parent.leftChild = null;
        } else if (order === 1) {
          node.parent.rightChild = null;
        }
        node.parent = null;
      }
      node.parent = this;
    }
    this.rightChild = node;
  }

  static merge(left, right) {
    const node = new PentaNode(left.name + right.name, left.count + right.count);
    node.leftChild = left;
    node.rightChild = right;
    left.parent = node;
    right.parent = node;
    return node;
  }
}

export default PentaNode;
