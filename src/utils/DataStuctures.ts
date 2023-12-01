export class Node<T> {
  public data: T;
  public children: Node<T>[];
  public id: string;
  public next: Node<T> | null;
  public prev: Node<T> | null;

  constructor(data: T) {
    this.data = data;
    this.children = [];
    this.next = null;
    this.prev = null;
    this.id = Date.now().toString(36) + Math.random().toString(36);
  }

  updateData(data: T) {
    this.data = data;
  }

  addChild(node: Node<T>) {
    this.children.push(node);
  }
}

// Using a Map to store the nodes for O(1) lookup, as well as
// a doubly linked list to keep track of the order of the nodes.
// This is so that we can easily remove the last node in the list.
// ugly but it works -- g.h.
export class Stem<T> {
  table: Map<string, Node<T>>;
  tail: Node<T> | null;

  constructor() {
    this.table = new Map();
    this.tail = null;
  }

  addNode(node: Node<T>) {
    if (this.tail) {
      this.tail.next = node;
      node.prev = this.tail;
    }
    this.table.set(node.id, node);
    this.tail = node;
  }

  removeNode(nodeId: string | null) {
    const node = this.table.get(nodeId || "");
    if (!node) {
      return;
    }

    if (node === this.tail) {
      this.tail = node.prev;
    }
    if (node?.prev) {
      node.prev.next = node.next;
    }
    if (node?.next) {
      node.next.prev = node.prev;
    }
    this.table.delete(node.id);
  }

  getLastNode() {
    return this.tail;
  }

  // Beware the O(n)
  getAllNodes() {
    return Array.from(this.table.values());
  }
}
