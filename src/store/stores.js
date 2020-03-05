import { writable } from 'svelte/store';
import { withPromise } from '../utils/Store';


export const algorithms = writable([
  { text: 'BFS (Breadth First Search)', id: 1, name: 'bfs' },
  { text: 'DFS (Depth First Search)', id: 2, name: 'dfs' },
  { text: 'A*', id: 3, name: 'aStar' },
  { text: 'Greedy Best First Search', id: 4, name: 'bestFirst' },
]);

export const cells = withPromise(writable([]));

export const startPoint = withPromise(writable([]));
export const endPoint = withPromise(writable([]));

export const findInProgress = withPromise(writable(false));

export const speed = withPromise(writable(0));
