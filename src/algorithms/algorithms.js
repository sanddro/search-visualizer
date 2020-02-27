import dfsBfs from './dfs-bfs';

export const algorithms = {
  bfs: (...params) => dfsBfs(false, ...params),
  dfs: (...params) => dfsBfs(true, ...params),
};
