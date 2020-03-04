<script>
  import MyButton from './components/MyButton.svelte';
  import MySelect from './components/MySelect.svelte';
  import { algorithms, cells, findInProgress, speed } from './store/stores';
  import { createEventDispatcher, onMount } from 'svelte';
  import MySlider from './components/MySlider.svelte';

  const dispatch = createEventDispatcher();

  const editModes = [{ text: 'Wall', id: 'wall' }, { text: 'Erase', id: 'empty' }];

  let selectedAlgo, editMode = editModes[0];

  let disabled = false;

  onMount(() => {
    const unsubscribe = algorithms.subscribe(algos => {
      selectedAlgo = selectedAlgo || algos[0];
      dispatch('selectAlgo', selectedAlgo);
    });

    dispatch('selectEditMode', editMode);

    return unsubscribe;
  });

  onMount(() => {
    return findInProgress.subscribe(inProgress => disabled = inProgress);
  });

  function speedChanged(value) {
    speed.set(value);
  }

</script>

<div class="toolbar">
  <div style="width: 300px">
    <MySelect bind:selectedItem={selectedAlgo}
              label={"Choose search algorithm:"}
              on:select={elem => dispatch('selectAlgo', elem.detail)}
              items={$algorithms}
      {disabled}
    />
  </div>
  <div>
    <MySelect bind:selectedItem={editMode}
              label={"Choose edit mode:"}
              on:select={elem => dispatch('selectEditMode', elem.detail)}
              items={editModes}
      {disabled}
    />
  </div>
  <div>
    <MySlider title="Choose speed" minValue={0} maxValue={100} on:change={e => speedChanged(e.detail)}/>
  </div>
  <div>
    <MyButton title="Find path" color="green" icon="fas fa-search" on:click={() => dispatch('findPath')} {disabled} />
  </div>
  <div>
    <MyButton title="Clear" color="red" icon="far fa-trash-alt" on:click={() => dispatch('clear')} {disabled} />
  </div>
  <div>
    <MyButton title="Clear path" color="blue" icon="fas fa-road" on:click={() => dispatch('clearPath')} {disabled} />
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
