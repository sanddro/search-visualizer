<script>
  import MyButton from './components/MyButton.svelte';
  import MySelect from './components/MySelect.svelte';
  import { algorithms, cells } from './store/stores';
  import { createEventDispatcher, onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  let selectedAlgo;

  onMount(() => {
    const unsubscribe = algorithms.subscribe(algos => {
      selectedAlgo = selectedAlgo || algos[0];
      dispatch('selectAlgo', selectedAlgo);
    });

    return unsubscribe;
  });

</script>

<div class="toolbar">
  <div style="width: 300px">
    <MySelect bind:selectedItem={selectedAlgo} on:select={elem => dispatch('selectAlgo', elem.detail)}
              items={$algorithms} label={"Choose search algorithm:"}/>
  </div>
  <div>
    <MyButton title="Clear" on:click={() => dispatch('clear')}/>
  </div>
  <div>
    <MyButton title="Find path" on:click={() => dispatch('findPath')}/>
  </div>
  <div>
    <MyButton title="Clear path" on:click={() => dispatch('clearPath')}/>
  </div>
</div>

<style lang="scss">
  .toolbar {
    display: flex;
    align-items: flex-end;
    justify-content: center;

    > *:not(:first-child) {
      margin-left: 20px;
    }
  }
</style>
