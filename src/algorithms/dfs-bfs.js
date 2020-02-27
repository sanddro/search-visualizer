export default function dfsBfs(isDfs, cells, startCell, endCell) {
  let cellsWidth = cells[0].length;
  let cellsHeight = cells.length;

  // Queue or stack depending on isDfs
  let arr = [{ path: [], cell: startCell }];

  let visited = {};

  while (arr.length) {
    let elem = isDfs ? arr.pop() : arr.shift();
    if (elem.cell.id === endCell.id)
      return [...elem.path, endCell];

    if (visited[elem.cell.id]) continue;

    visited[elem.cell.id] = true;
    let { r, c } = elem.cell;

    let neighs = [[r, c - 1], [r - 1, c], [r, c + 1], [r + 1, c]];
    neighs = neighs.filter(n => n[0] >= 0 && n[1] >= 0 && n[0] < cellsHeight && n[1] < cellsWidth);
    neighs = neighs.filter(n => cells[n[0]][n[1]].state !== 'wall');
    neighs = neighs.filter(n => !visited[n.id]);
    neighs = neighs.map(n => cells[n[0]][n[1]]);

    arr.push(...neighs.map(n => ({ path: [...elem.path, elem.cell], cell: n })));
  }
  return null;
}
