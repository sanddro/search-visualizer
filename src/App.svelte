<script>
  import { cells, startPoint, endPoint } from './store/stores';
  import Board from './Board.svelte';
  import Toolbar from './Toolbar.svelte';
  import { findPath } from './PathFinder';
  import { onMount } from 'svelte';

  let cellSize = 30;

  let selectedAlgo, editMode, board;

  function clear() {
    const _cells = $cells;
    _cells.forEach(row => row.forEach(cell => {
      cell.state = 'empty';
    }));
    cells.set(_cells);
  }

  function clearPath() {
    const _cells = $cells;
    _cells.forEach(row => row.forEach(cell => {
      if (cell.state !== 'wall')
        cell.state = 'empty';
    }));
    cells.set(_cells);
  }

  async function onFindPath() {
    clearPath();
    await findPath(selectedAlgo);
  }

  function onAlgoSelect({ detail }) {
    clearPath();
    selectedAlgo = detail;
  }

  function onEditModeSelect({ detail }) {
    editMode = detail.id;
  }


  function initCells() {
    const boardWidth = board.offsetWidth;
    const boardHeight = board.offsetHeight;

    const xCells = Math.floor(boardWidth / cellSize);
    const yCells = Math.floor(boardHeight / cellSize);

    const rows = [];

    for (const [i, _] of new Array(yCells).entries()) {
      const arr = [];
      for (const [j, _] of new Array(xCells).entries()) {
        arr.push({ state: 'empty', id: i + '-' + j, r: i, c: j });
      }
      rows.push(arr);
    }

    cells.set(rows);
    chooseStartEnd();
  }

  function chooseStartEnd() {
    const rows = $cells;
    const xCells = rows[0].length, yCells = rows.length;

    const y = Math.floor(yCells / 2);
    const x = Math.floor(xCells / 5);

    const _startPoint = [y - 1, x];
    const _endPoint = [y - 1, 4 * x];
    startPoint.set(_startPoint);
    endPoint.set(_endPoint);

    rows[$startPoint[0]][$startPoint[1]].isEndPoint = true;
    rows[$endPoint[0]][$endPoint[1]].isEndPoint = true;
    cells.set(rows);
  }

  function onResize() {
    cells.set([]);
    setTimeout(initCells, 20);
  }

  onMount(initCells);

  onMount(() => {
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  });

</script>

<main>
  <div class="toolbar-container">
    <Toolbar on:findPath={onFindPath}
             on:clearPath={clearPath}
             on:clear={clear}
             on:selectAlgo={onAlgoSelect}
             on:selectEditMode={onEditModeSelect}
    />
  </div>
  <div class="board-container">
    <div class="board-wrapper" bind:this={board}>
      <Board {editMode} {cellSize}/>
    </div>
  </div>
</main>

<style lang="scss">

  main {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    .toolbar-container {
      margin: 20px auto;
    }

    .board-container {
      flex: 1;
      position: relative;
      margin: 2px;

      .board-wrapper {
        height: 100%;
      }
    }
  }
</style>
