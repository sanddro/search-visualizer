import { writable } from 'svelte/store';


export const algorithms = writable([
  { text: 'BFS (Breadth First Search)', id: 1, name: 'bfs' },
  { text: 'DFS (Depth First Search)', id: 2, name: 'dfs' },
  { text: 'A*', id: 3, name: 'aStar' },
  { text: 'Dijkstra\'s ', id: 4, name: 'dijkstra' },
  { text: 'Greedy Best First Search', id: 5, name: 'bestfirst' },
]);

export const cells = writable([]);

export const startPoint = writable([]);
export const endPoint = writable([]);

export const findInProgress = writable(false);

export const speed = writable(1);
