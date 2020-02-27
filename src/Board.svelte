<script>

  import { onMount } from 'svelte';
  import { CssVars } from './utils/CssVars';

  let board;

  const cellSize = 30;

  let xPadding = 0, yPadding = 0, xCells = 0, yCells = 0;

  let startPoint = [0, 0], endPoint = [0, 0];

  let rows = [];

  let selecting = false;
  let selectMode = 'wall';
  let lastSelectedCell;

  function initCells() {
    const boardWidth = board.offsetWidth;
    const boardHeight = board.offsetHeight;

    xCells = Math.floor(boardWidth / cellSize);
    yCells = Math.floor(boardHeight / cellSize);

    const xLeft = boardWidth - xCells * cellSize;
    const yLeft = boardHeight - yCells * cellSize;

    xPadding = Math.floor(xLeft / 2);
    yPadding = Math.floor(yLeft / 2);

    for (const [i, _] of new Array(yCells).entries()) {
      const arr = [];
      for (const [j, _] of new Array(xCells).entries()) {
        arr.push({state: 'empty', id: i * xCells + j});
      }
      rows.push(arr);
    }

    chooseStartEnd();
  }

  function chooseStartEnd() {

    const y = Math.floor(yCells / 2);
    const x = Math.floor(xCells / 5);

    startPoint = [x, y - 1];
    endPoint = [4 * x, y - 1];

    console.log(startPoint);
    console.log(endPoint);
    console.log({xCells, yCells});

    rows[startPoint[1]][startPoint[0]].state = 'start';
    rows[endPoint[1]][endPoint[0]].state = 'end';
  }

  function generatePoint() {
    const x = Math.floor(Math.random() * (xCells + 1));
    const y = Math.floor(Math.random() * (yCells + 1));
    return [x, y];
  }

  function onCellSelect(e, i, j) {
    if (!selecting || !['empty', 'wall'].includes(rows[i][j].state)) return;
    if (e.target === lastSelectedCell) return;
    lastSelectedCell = e.target;
    rows[i][j].state = selectMode;
  }

  onMount(initCells);

</script>

<div class="board" bind:this={board} on:mousedown={e => selecting = true} on:mouseup={e => selecting = false}
     style={CssVars({cellSize: cellSize + 'px'})}>
  <div class="rows">
  {#each rows as row, i}
    <div class="row">
      {#each rows[i] as cell, j}
        <div class="cell"
             class:endpoint={startPoint[0] === j && startPoint[1] === i || endPoint[0] === j && endPoint[1] === i}
             class:wall={rows[i][j].state === 'wall'}
             on:mousemove={e => onCellSelect(e, i, j)}
             on:mousedown={e => onCellSelect(e, i, j)}>
          {#if startPoint[0] === j && startPoint[1] === i}
            <i class="far fa-dot-circle start-point"></i>
          {/if}
          {#if endPoint[0] === j && endPoint[1] === i}
            <i class="fas fa-dot-circle end-point"></i>
          {/if}
        </div>
      {/each}
    </div>
  {/each}
  </div>
</div>

<style lang="scss">
  $border-color: #cce2ff;

  .board {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .rows {
    border-left: 1px solid $border-color;
    border-top: 1px solid $border-color;
  }

  .row {
    display: flex;
    align-items: center;
  }

  .cell {
    position: relative;
    height: var(--cellSize);
    width: var(--cellSize);
    border-right: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: 24px;
      height: 100%;
      width: 100%;

      &.start-point {
        color: seagreen;
      }

      &.end-point {
        color: crimson;
      }
    }

    &:not(.endpoint):after {
      content: "";
      display: block;
      background: transparent;
      height: 80%;
      width: 80%;
      transition: 0.2s width, 0.2s height, 0s background;
      position: absolute;
      left: 0;
      top: 0;
    }

    &.wall:not(.endpoint):after {
      background: #555;
      height: calc(100% + 1px);
      width: calc(100% + 1px);
    }
  }
</style>
