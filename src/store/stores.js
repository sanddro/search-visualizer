import { writable } from 'svelte/store';


export const algorithms = writable([
  { text: 'BFS (Breadth First Search)', id: 1, name: 'bfs' },
  { text: 'DFS (Depth First Search)', id: 2, name: 'dfs' },
  { text: 'A*', id: 3, name: 'aStar' },
  { text: 'Greedy Best First Search', id: 4, name: 'bestFirst' },
]);

export const cells = writable([]);

export const startPoint = writable([]);
export const endPoint = writable([]);

export const findInProgress = writable(false);

export const speed = writable(0);
