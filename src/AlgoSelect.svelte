<script>
  import CustomSelect from './CustomSelect.svelte';

  let items = [
    { text: 'DFS (Depth First Search)', id: 1 },
    { text: 'BFS (Uniform Cost Search)', id: 2 },
    { text: 'A*', id: 3 },
    { text: 'Djikstra', id: 4 },
  ];
  let selectedItem = items[0];

</script>

<div class="wrapper">
  <CustomSelect bind:selectedItem {items} label="Choose search algorithm:"/>
</div>

<style>
  div {
    margin: 20px 200px;
    display: flex;
  }
</style>
