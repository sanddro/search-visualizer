import { cells, endPoint, findInProgress, startPoint } from './store/stores';
import { toPromise } from './utils/Store';
import { sleep } from './utils/Utils';
import searchAlg from './algorithms/algo';

export async function findPath(algo) {
  findInProgress.set(true);
  try {
    const _cells = await toPromise(cells);
    const startP = await toPromise(startPoint);
    const endP = await toPromise(endPoint);
    const path = await searchAlg(algo.name, _cells, _cells[startP[0]][startP[1]], _cells[endP[0]][endP[1]]);
    if (!path) return;
    for (const { r, c } of path) {
      await sleep(10);
      _cells[r][c].state = 'path';
      cells.set(_cells);
    }
  } finally {
    findInProgress.set(false);
  }

}
