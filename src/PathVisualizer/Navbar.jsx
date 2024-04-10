import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { visualizeAstar, createMaze } from "./Functions";

import { animateWalls } from "./Animation";

function NavBar(props) {
  const { grid, setGrid, sim, setSim } = props;

  const handle = () => {
    setSim(true);
    visualizeAstar(grid);
    console.log(sim);
  };
  const pri = (grid) => {
    let temp = [[]];

    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 100; j++) {
        if (grid[i][j].isFire) {
          temp.push([i, j]);
        }
      }
    }
    console.log(temp);
  };
  const clrGrid = (grid) => {
    const temp = grid;
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 70; j++) {
        document.getElementById(`node-${i}-${j}`).className = "node";
        grid[i][j].isWall = false;
      }
    }
    setGrid(temp);
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      style={{ marginBottom: "20px" }}
    >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={handle} style={{ marginRight: "10px" }}>
            START SIM
          </Nav.Link>
          <Nav.Link
            onClick={() => clrGrid(grid)}
            style={{ marginRight: "100px" }}
          >
            Clear Board
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
