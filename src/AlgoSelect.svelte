<script>
  import CustomSelect from './CustomSelect.svelte';

  let items = [
    { text: 'DFS (Depth First Search)', id: 1 },
    { text: 'BFS (Uniform Cost Search)', id: 2 },
    { text: 'A*', id: 3 },
    { text: 'Dijkstra\'s ', id: 4 },
    { text: 'Greedy Best First Search', id: 5 },
  ];
  let selectedItem = items[0];

</script>

<div class="wrapper">
  <CustomSelect bind:selectedItem {items} label="Choose search algorithm:"/>
</div>

<style>
  div {
    display: flex;
  }
</style>
