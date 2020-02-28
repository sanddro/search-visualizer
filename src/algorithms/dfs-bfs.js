import { sleep } from '../utils/Utils';
import { cells as _cells, speed } from '../store/stores';
import { toPromise } from '../utils/Store';

export default async function dfsBfs(isDfs, cells, startCell, endCell) {
  let cellsWidth = cells[0].length;
  let cellsHeight = cells.length;

  // Queue or stack depending on isDfs
  let arr = [{ path: [], cell: startCell }];

  let lastVisited;

  let visited = {};

  while (arr.length) {
    let elem = isDfs ? arr.pop() : arr.shift();
    if (elem.cell.id === endCell.id) {
      return [...elem.path, endCell];
    }

    if (elem.cell.state === 'visited') continue;

    elem.cell.state = 'visiting';
    lastVisited = elem;
    _cells.update(c => c);

    await sleep(await toPromise(speed));

    visited[elem.cell.id] = true;
    elem.cell.state = 'visited';
    let { r, c } = elem.cell;

    let neighs = [[r, c - 1], [r - 1, c], [r, c + 1], [r + 1, c]];
    neighs = neighs.filter(n => n[0] >= 0 && n[1] >= 0 && n[0] < cellsHeight && n[1] < cellsWidth);
    neighs = neighs.filter(n => cells[n[0]][n[1]].state !== 'wall');
    neighs = neighs.filter(n => !visited[cells[n[0]][n[1]].id]);
    neighs = neighs.map(n => cells[n[0]][n[1]]);

    neighs.forEach(n => cells[n.r][n.c].state = 'to-visit');

    arr.push(...neighs.map(n => ({ path: [...elem.path, elem.cell], cell: n })));

    _cells.set(cells);
  }

  return null;
}
