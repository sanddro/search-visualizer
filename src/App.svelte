<script>
  import AlgoSelect from './AlgoSelect.svelte';

  export let name;
</script>

<main>
  <div class="container">
    <AlgoSelect/>

  </div>
</main>

<style lang="scss">

  main {
    height: 100%;
    width: 100%;

    .container {
      width: 1200px;
      margin: 0 auto;
    }

  }
</style>
