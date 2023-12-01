export class Node<T> {
  public data: T;
  public next: Node<T> | null;
  public parent: Node<T> | null;
  public children: Node<T>[];
  public id: string;

  constructor(data: T) {
    this.data = data;
    this.next = null;
    this.parent = null;
    this.children = [];
    this.id = Date.now().toString(36) + Math.random().toString(36);
  }

  updateData(data: T) {
    this.data = data;
  }

  addChild(node: Node<T>) {
    this.children.push(node);
  }
}

// deprecated -- TODO: remove
export class LinkedList<T> {
  head: Node<T> | null;

  constructor() {
    this.head = null;
  }

  addNode(node: Node<T>) {
    if (!this.head) {
      this.head = node;
      return;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }

    current.next = node;
  }

  getNodes(): Node<T>[] {
    const nodes: Node<T>[] = [];
    let current = this.head;
    while (current) {
      nodes.push(current);
      current = current.next;
    }

    return nodes;
  }
}
