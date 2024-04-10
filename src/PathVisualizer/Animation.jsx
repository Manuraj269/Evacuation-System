import React from "react";

let temp = [];

export function animateShortestPath(nodesInShortestPathOrder) {
  for (let i = 0; i < temp.length; i++) {
    if (!nodesInShortestPathOrder.includes(temp[i])) {
      const node = temp[i];
      let str = document.getElementById(
        `node-${node.row}-${node.col}`
      ).className;
      if (!str.includes("node-fire")) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node";
      }
    }
  }
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    const node = nodesInShortestPathOrder[i];
    setTimeout(() => {
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-shortest-path";
    }, 25 * i);
  }
  console.log(temp);
  console.log(nodesInShortestPathOrder);
  temp = nodesInShortestPathOrder;
}
