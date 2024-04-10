class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  changePriority(val, priority) {
    const index = this.values.findIndex((v) => v.val === val);
    this.values[index].priority = priority;
    this.sort();
  }

  contains(val) {
    return this.values.some((v) => v.val === val);
  }

  isEmpty() {
    return !this.values.length;
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

function getPath(node) {
  const path = [node];
  while (node.previousNode) {
    path.unshift(node.previousNode);
    node = node.previousNode;
  }
  return path;
}

export function aStar(startNode, endNodes, grid) {
  const visited = new Set();

  const queue = new PriorityQueue();
  const totVisited = [];

  startNode.fScore = 0;
  startNode.gScore = 0;

  queue.enqueue(startNode, startNode.fScore);

  while (!queue.isEmpty()) {
    const currentNode = queue.dequeue();
    totVisited.push(currentNode.val);

    if (endNodes.some((endNode) => endNode === currentNode.val)) {
      return getPath(currentNode.val);
    }

    visited.add(currentNode.val);

    for (let neighbor of getNeighbors(currentNode.val, grid)) {
      if (!visited.has(neighbor)) {
        const tentativeGScore = currentNode.val.gScore + 1;

        if (!queue.contains(neighbor)) {
          neighbor.fScore =
            tentativeGScore +
            heuristic(neighbor, findNearestEndNode(neighbor, endNodes));
          neighbor.gScore = tentativeGScore;
          neighbor.previousNode = currentNode.val;
          queue.enqueue(neighbor, neighbor.fScore);
        } else if (tentativeGScore < neighbor.gScore) {
          neighbor.gScore = tentativeGScore;
          neighbor.fScore =
            tentativeGScore +
            heuristic(neighbor, findNearestEndNode(neighbor, endNodes));
          neighbor.previousNode = currentNode.val;
          queue.changePriority(neighbor, neighbor.fScore);
        }
      }
    }
  }

  return null;
}

function findNearestEndNode(node, endNodes) {
  let minDistance = Infinity;
  let nearestEndNode = null;
  for (let endNode of endNodes) {
    const distance =
      Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);
    if (distance < minDistance) {
      minDistance = distance;
      nearestEndNode = endNode;
    }
  }
  return nearestEndNode;
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;

  if (row > 0 && !grid[row - 1][col].isWall && !grid[row - 1][col].isFire) {
    neighbors.push(grid[row - 1][col]);
  }
  if (
    col < grid[0].length - 1 &&
    !grid[row][col + 1].isWall &&
    !grid[row][col - 1].isFire
  ) {
    neighbors.push(grid[row][col + 1]);
  }
  if (
    row < grid.length - 1 &&
    !grid[row + 1][col].isWall &&
    !grid[row + 1][col].isFire
  ) {
    neighbors.push(grid[row + 1][col]);
  }
  if (col > 0 && !grid[row][col - 1].isWall && !grid[row][col - 1].isFire) {
    neighbors.push(grid[row][col - 1]);
  }

  return neighbors;
}

function heuristic(nodeA, nodeB) {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}
