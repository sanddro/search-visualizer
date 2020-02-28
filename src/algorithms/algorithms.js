import dfsBfsAstar from './dfsBfsAstar';

export const algorithms = {
  bfs: (...params) => dfsBfsAstar('bfs', ...params),
  dfs: (...params) => dfsBfsAstar('dfs', ...params),
  aStar: (...params) => dfsBfsAstar('aStar', ...params)
};
