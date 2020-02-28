<script>
  import { onMount, afterUpdate } from 'svelte';
  import { CssVars } from './utils/CssVars';
  import { cells, startPoint, endPoint, findInProgress } from './store/stores';

  export let editMode;

  const showCellNumbers = false;

  let board;

  const cellSize = 30;

  let xCells = 0, yCells = 0;

  let selecting = false;
  let editDisabled = false;

  let draggingPoint = '';

  function initCells() {
    const boardWidth = board.offsetWidth;
    const boardHeight = board.offsetHeight;

    xCells = Math.floor(boardWidth / cellSize);
    yCells = Math.floor(boardHeight / cellSize);

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

    const y = Math.floor(yCells / 2);
    const x = Math.floor(xCells / 5);

    const _startPoint = [y - 1, x];
    const _endPoint = [y - 1, 4 * x];
    startPoint.set(_startPoint);
    endPoint.set(_endPoint);

    const rows = $cells;
    rows[$startPoint[0]][$startPoint[1]].isEndPoint = true;
    rows[$endPoint[0]][$endPoint[1]].isEndPoint = true;
    cells.set(rows);
  }

  function generatePoint() {
    const x = Math.floor(Math.random() * (xCells + 1));
    const y = Math.floor(Math.random() * (yCells + 1));
    return [x, y];
  }

  function onCellSelect(e) {
    if (editDisabled || !selecting) return;
    const rows = $cells;
    const cellElem = document.querySelector('.cell:hover');
    if (!cellElem) return;
    const [r, c] = cellElem.id.split('-').map(a => +a);
    const cell = rows[r][c];

    if (cell.state === editMode || cell.isEndPoint) return;
    cell.state = editMode;
    cells.set(rows);
  }

  function onMouseDown(e) {
    selecting = true;
    onCellSelect(e);
  }

  function onMouseUp() {
    selecting = false;
  }

  function onMouseMove(e) {
    onCellSelect(e);
  }

  onMount(initCells);

  onMount(() => {
    return findInProgress.subscribe(inProgress => editDisabled = inProgress);
  });

  function onPointDrop(e, r, c) {
    const isEnd = draggingPoint === 'end';

    const rows = $cells;
    if (isEnd)
      rows[$endPoint[0]][$endPoint[1]].isEndPoint = false;
    else
      rows[$startPoint[0]][$startPoint[1]].isEndPoint = false;

    rows[r][c].isEndPoint = true;

    cells.set(rows);
    if (isEnd)
      endPoint.set([r, c]);
    else
      startPoint.set([r, c]);
  }

  onMount(() => {

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
    }
  });

</script>

<div class="board" bind:this={board}
     style={CssVars({cellSize: cellSize + 'px'})}>
  <div class="rows">
    {#each $cells as row, r}
      <div class="row">
        {#each $cells[r] as cell, c (cell.id)}
          <div class="cell {cell.state}" id={cell.id}
               class:endpoint={cell.isEndPoint}
               on:drop={e => onPointDrop(e, r, c)}
               on:dragover|preventDefault
          >
            {#if $startPoint[0] === r && $startPoint[1] === c}
              <i class="far fa-dot-circle start grabbable"
                 draggable={!$findInProgress}
                 on:dragstart={e => draggingPoint = 'start'}
                 on:mousedown|stopPropagation
              ></i>
            {/if}
            {#if $endPoint[0] === r && $endPoint[1] === c}
              <i class="fas fa-dot-circle end grabbable"
                 draggable={!$findInProgress}
                 on:dragstart={e => draggingPoint = 'end'}
                 on:mousedown|stopPropagation
              ></i>
            {/if}
            {#if showCellNumbers}
              <span class="cell-number">{r + '-' + c}</span>
            {/if}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  $border-color: #cce2ff;
  $wall-bg: #124;
  $path-bg: #fffe6a;
  $start-point-color: crimson;
  $end-point-color: seagreen;

  $visiting-bg: #fff591;
  $visited-bg: #3282b8;
  $to-visit-bg: #88e1f2;

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

    transition: .2s background;

    i {
      font-size: 24px;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      &.start {
        color: $start-point-color;
      }

      &.end {
        color: $end-point-color;
      }
    }

    &:after {
      content: "";
      display: block;
      width: 70%;
      height: 70%;
      transition: .05s width, .05s height, .05s border;
    }

    &.wall {
      border: none;

      &:after {
        width: 100%;
        height: 100%;
        background: $wall-bg;
      }
    }

    .cell-number {
      font-size: 9px;
      position: absolute;

    }

    &.path {
      border: none;

      &:after {
        width: 100%;
        height: 100%;
        background: $path-bg;
      }
    }

    &.visiting {
      background: $visiting-bg;
      transition: none;
    }

    &.to-visit {
      background: $to-visit-bg;
      border-color: #fff;
    }

    &.visited {
      background: $visited-bg;
      border-color: #fff;
    }

  }

  .grabbable {
    cursor: grab;
  }

  .grabbable:active {
    cursor: grabbing;
    outline: none !important;
  }
</style>
