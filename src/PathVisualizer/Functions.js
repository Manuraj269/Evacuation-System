import { animateShortestPath } from "./Animation";
import { aStar } from "../Algorithm/A-star";

let START_NODE_ROW = 14;
let START_NODE_COL = 19;

export const clearGrid = () => {
  for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 70; j++) {
      document.getElementById(`node-${i}-${j}`).className = "node";
    }
  }
};

export const visualizeAstar = (grid) => {
  const startNode = grid[25][18];
  const finishNode = [grid[7][35], grid[13][84], grid[46][66], grid[1][98]];
  const a = aStar(startNode, finishNode, grid);
  animateShortestPath(a);
};
