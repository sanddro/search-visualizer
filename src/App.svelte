<script>
  import AlgoSelect from './AlgoSelect.svelte';
  import Board from './Board.svelte';

  export let name;
</script>

<main>
  <div class="container">
    <AlgoSelect/>
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

    .container {
      width: 500px;
      margin: 20px auto;
    }

    .board-container {
      flex: 1;
      position: relative;
      margin: 10px;
    }

  }
</style>
