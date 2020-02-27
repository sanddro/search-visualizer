<script>
  import { cells } from './store/stores';
  import Board from './Board.svelte';
  import Toolbar from './Toolbar.svelte';
  import { findPath } from './PathFinder';

  let selectedAlgo;

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
      if (cell.state === 'path')
        cell.state = 'empty';
    }));
    cells.set(_cells);
  }

  function onFindPath() {
    clearPath();
    console.log(selectedAlgo);
    findPath(selectedAlgo).then();
  }

  function onAlgoSelect({ detail }) {
    clearPath();
    selectedAlgo = detail;
  }

</script>

<main>
  <div class="toolbar-container">
    <Toolbar on:findPath={onFindPath}
             on:clearPath={clearPath}
             on:clear={clear}
             on:selectAlgo={onAlgoSelect}
    />
  </div>
  <div class="board-container">
    <Board/>
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
    }
  }
</style>
