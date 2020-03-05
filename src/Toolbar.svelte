<script>
  import MyButton from './components/MyButton.svelte';
  import MySelect from './components/MySelect.svelte';
  import { algorithms, cells, findInProgress, speed } from './store/stores';
  import { createEventDispatcher, onMount } from 'svelte';
  import MySlider from './components/MySlider.svelte';

  const dispatch = createEventDispatcher();

  const editModes = [{ text: 'Wall', id: 'wall' }, { text: 'Erase', id: 'empty' }];

  let selectedAlgo, editMode = editModes[0];

  onMount(() => {
    const unsubscribe = algorithms.subscribe(algos => {
      selectedAlgo = selectedAlgo || algos[0];
      dispatch('selectAlgo', selectedAlgo);
    });

    dispatch('selectEditMode', editMode);

    return unsubscribe;
  });

  function speedChanged(value) {
    speed.set(value);
  }

</script>

<div class="toolbar">
  <div style="width: 300px">
    <MySelect bind:selectedItem={selectedAlgo}
              label={"Choose search algorithm:"}
              disabled={$findInProgress}
              on:select={elem => dispatch('selectAlgo', elem.detail)}
              items={$algorithms}
    />
  </div>
  <div>
    <MySelect bind:selectedItem={editMode}
              label={"Choose edit mode:"}
              disabled={$findInProgress}
              on:select={elem => dispatch('selectEditMode', elem.detail)}
              items={editModes}
    />
  </div>
  <div>
    <MySlider title="Choose speed" minValue={0} maxValue={100} on:change={e => speedChanged(e.detail)}/>
  </div>
  <div>
    {#if !$findInProgress}
      <MyButton title="Find path" color="green" icon="fas fa-search" on:click={() => dispatch('findPath')}
                disabled={$findInProgress} />
    {:else}
      <MyButton title="Stop" color="red" icon="fas fa-stop" on:click={() => dispatch('stop')}/>
    {/if}
  </div>
  <div>
    <MyButton title="Clear" color="gray" icon="far fa-trash-alt" on:click={() => dispatch('clear')}
              disabled={$findInProgress} />
  </div>
  <div>
    <MyButton title="Clear path" color="blue" icon="fas fa-wave-square" on:click={() => dispatch('clearPath')}
              disabled={$findInProgress} />
  </div>

</div>

<style lang="scss">
  .toolbar {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-wrap: wrap;

    > div {
      margin: 10px 0;

      &:not(:first-child) {
        margin-left: 20px;
      }
    }
  }
</style>
