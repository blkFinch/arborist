export interface Node {
  content: string;
  id: string;
  children: Node[];
}

export function buildNode(data: string | null = null) {
  return {
    content: data || "",
    id: Date.now().toString(36) + Math.random().toString(36),
    children: [],
  };
}

// HELPER FUNCTIONS

// returns node with given id
export function getNodeById(nodes: Node[], id: string): Node | null {
  let result: Node | null = null;

  depthFirstSearch(nodes, (node) => {
    if (node.id === id) result = node;
  });

  return result;
}

// removes node with given id from the tree
function removeNodeFromChildren(node: Node, id: string): boolean {
  if (node.id === id) return true;

  if (node.children && node.children.length > 0) {
    node.children = node.children.filter((childNode) => {
      return !removeNodeFromChildren(childNode, id);
    });
  }

  return false;
}

// removes node with given id from a tree array, returns new array
export function filterNodesById(nodes: Node[], id: string): Node[] {
  return nodes.filter((node) => {
    return !removeNodeFromChildren(node, id);
  });
}

// applies callback to each node in the tree
// in depth-first order
type DepthFirstSearchCallback = (node: Node, depth: number) => void;

export function depthFirstSearch(
  nodes: Node[],
  callback: DepthFirstSearchCallback
) {
  function dfs(node: Node, depth: number) {
    callback(node, depth);

    if (node.children && node.children.length > 0) {
      node.children.forEach((childNode) => {
        dfs(childNode, depth + 1);
      });
    }
  }

  for (const node of nodes) {
    dfs(node, 0);
  }
}
