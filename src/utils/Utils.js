import { toPromise } from './Store';
import { speed } from '../store/stores';

export async function sleep(ms) {
  if (ms === undefined)
    ms = await toPromise(speed);
  return await new Promise(resolve => setTimeout(resolve, ms));
}

export const Timer = {
  startTime: undefined,
  start: function () {
    this.startTime = new Date().getTime();
  },
  end: function () {
    if (this.startTime === undefined) return;
    console.log(new Date().getTime() - this.startTime + ' ms');
    this.startTime = undefined;
  }
};

export function getPixelsBetweenPoints([x0, y0], [x1, y1]) {
  const pixels = [];

  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  let sx = x0 < x1 ? 1 : -1;
  let sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (x0 !== x1 || y0 !== y1) {
    let e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
      pixels.push([x0, y0]);
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
      pixels.push([x0, y0]);
    }
  }
  
  return pixels.slice(0, pixels.length - 1);
}

export function isNeighbor(p1, p2) {
  return (
    (p1[0] === p2[0] && Math.abs(p1[1] - p2[1]) <= 1) ||
    (p1[1] === p2[1] && Math.abs(p1[0] - p2[0]) <= 1)
  );
}
