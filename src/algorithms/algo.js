import { sleep } from '../utils/Utils';
import { cells as _cells, findInProgress } from '../store/stores';

class Node {
  constructor(cell, path) {
    this.cell = cell;
    this.path = path;
  }
}

function manhattanDist(c1, c2) {
  return Math.abs(c2.r - c1.r) + Math.abs(c2.c - c1.c);
}

export default async function searchAlg(type, cells, startCell, endCell) {
  let cellsWidth = cells[0].length;
  let cellsHeight = cells.length;

  // Queue, stack or priority queue depending on type
  let nodes = [new Node(startCell, [])];

  let inProgress = true;

  findInProgress.subscribe(res => inProgress = res);

  while (nodes.length && inProgress) {
    let elem = type === 'dfs' ? nodes.pop() : nodes.shift();
    if (elem.cell.id === endCell.id) {
      return [...elem.path, endCell];
    }

    if (elem.cell.state === 'visited') continue;

    elem.cell.state = 'visiting';
    _cells.set(cells);

    await sleep();

    elem.cell.state = 'visited';
    let { r, c } = elem.cell;

    let neighs = [{ r, c: c - 1 }, { r: r - 1, c }, { r, c: c + 1 }, { r: r + 1, c }];

    // Drop out of bounds
    neighs = neighs.filter(n => n.r >= 0 && n.c >= 0 && n.r < cellsHeight && n.c < cellsWidth);

    neighs = neighs.map(n => cells[n.r][n.c]);

    // Drop walls and visiteds
    neighs = neighs.filter(n => !['wall', 'visited'].includes(n.state));

    neighs.forEach(n => n.state = 'to-visit');

    nodes.push(...neighs.map(n => new Node(n, [...elem.path, elem.cell])));

    if (type === 'aStar')
      nodes.sort((a, b) => manhattanDist(a.cell, endCell) + a.path.length - manhattanDist(b.cell, endCell) - b.path.length);
    if (type === 'bestFirst')
      nodes.sort((a, b) => manhattanDist(a.cell, endCell) - manhattanDist(b.cell, endCell));

    _cells.set(cells);
  }

  return null;
}
