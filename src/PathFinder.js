import { cells, endPoint, startPoint } from './store/stores';
import { toPromise } from './utils/Store';
import { algorithms } from './algorithms/algorithms';

export async function findPath(algo) {
  const _cells = await toPromise(cells);
  const startP = await toPromise(startPoint);
  const endP = await toPromise(endPoint);
  const path = algorithms[algo.name](_cells, _cells[startP[0]][startP[1]], _cells[endP[0]][endP[1]]);
  if (!path) return;
  for (const { r, c } of path) {
    _cells[r][c].state = 'path';
  }
  cells.set(_cells);
}
