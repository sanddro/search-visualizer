<script>

  import { onMount } from 'svelte';
  import { CssVars } from './CssVars';

  let board;

  const cellSize = 30;

  let xPadding = 0, yPadding = 0, xCells = 0, yCells = 0;

  let startPoint = [0, 0], endPoint = [0, 0];

  function calculateCells() {
    const boardWidth = board.offsetWidth;
    const boardHeight = board.offsetHeight;

    xCells = Math.floor(boardWidth / cellSize);
    yCells = Math.floor(boardHeight / cellSize);

    const xLeft = boardWidth - xCells * cellSize;
    const yLeft = boardHeight - yCells * cellSize;

    xPadding = Math.floor(xLeft / 2);
    yPadding = Math.floor(yLeft / 2);
  }

  function chooseStartEnd() {

    const y = Math.floor(yCells / 2);
    const x = Math.floor(xCells / 5);

    startPoint = [x, y - 1];
    endPoint = [4 * x, y - 1];

  }

  function geneRatePoint() {
    const x = Math.floor(Math.random() * (xCells + 1));
    const y = Math.floor(Math.random() * (yCells + 1));
    return [x, y];
  }

  onMount(calculateCells);

  onMount(chooseStartEnd);

</script>

<div class="board" bind:this={board}
     style={CssVars({cellSize: cellSize + 'px'}) + `padding: ${yPadding}px ${xPadding}px;`}>
  {#each new Array(yCells) as yCell, i}
    <div class="row">
      {#each new Array(xCells) as xCell, j}
        <div class="cell">
          {#if startPoint[0] === j && startPoint[1] === i}
            <i class="far fa-dot-circle start-point"></i>          {/if}
          {#if endPoint[0] === j && endPoint[1] === i}
            <i class="fas fa-dot-circle end-point"></i>
          {/if}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  .board {
    height: 100%;
  }

  .row {
    display: flex;
    align-items: center;
  }

  .cell {
    height: calc(var(--cellSize) + 1px);
    width: calc(var(--cellSize) + 1px);
    border: 1px solid #cce2ff;
    user-select: none;
    margin-left: -1px;
    margin-top: -1px;

    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: 24px;

      &.start-point {
        color: seagreen;
      }

      &.end-point {
        color: crimson;
      }
    }
  }
</style>
