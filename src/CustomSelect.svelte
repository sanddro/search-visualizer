<script>
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  export let items = [];
  export let selectedItem = null;
  export let label = '';

  export let valueKey = 'id';
  export let displayKey = 'text';
  export let placeHolder = 'Choose';

  let opened = false;

  function onSelect(item) {
    selectedItem = item;
    opened = false;

    dispatch('select', item);
  }

</script>

<div tabindex="0" class="wrapper" on:blur={e => opened = false}>
  {#if label}
    <div class="label">{label}</div>
  {/if}
  <div class="selector" class:opened={opened}
       on:click={e => opened = !opened}>
    <span>{selectedItem ? selectedItem[displayKey] : placeHolder}</span>
    <div class="pointer"><i class="fas fa-chevron-down"></i></div>
  </div>
  {#if opened}
    <div class="dropdown" transition:fly={{y: -20, duration: 200}}>
      {#each items as item (item.id)}
        <div class="dropdown_item" on:click={e => onSelect(item)}
             class:selected={selectedItem && selectedItem[valueKey] === item[valueKey]}>
          <span class="dropdown_item_text">{item[displayKey]}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>
<style lang="scss">

  .wrapper {
    width: 100%;
    min-width: 150px;
    position: relative;

    &:focus {
      outline: none;
    }
  }

  .label {
    margin-bottom: 5px;
    color: #5a6676;
    font-weight: 500;
    font-size: 14px;
  }

  .selector {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #e8ebef;
    cursor: pointer;
    transition: .1s background;
    padding: 10px 15px;
    border-radius: 5px;

    &:hover {
      background: #dde1e7;
    }

    & .pointer {
      font-weight: bold;
      font-family: sans-serif;
      transition: .2s transform ease-in-out;
    }

    &.opened .pointer {
      transform: rotate(180deg);
    }
  }

  .dropdown {
    position: absolute;
    width: 100%;
    margin-top: 5px;
    left: 0;
    background: white;
    box-shadow: 0 0 0 1px hsla(214, 61%, 25%, 0.05), 0 2px 6px -1px hsla(214, 53%, 23%, 0.16), 0 8px 24px -4px hsla(214, 47%, 21%, 0.38);
    border-radius: 5px;
    padding: 10px;
    max-height: 350px;
    overflow-y: auto;
    z-index: 100;


    &_item {
      cursor: pointer;
      padding: 10px 15px;
      border-radius: 5px;
      transition: .05s background;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      align-items: center;
      border: 2px solid transparent;

      &.selected {
        border-color: #8abaf9;
      }

      &:hover {
        background: #e7f1fe;
      }
    }
  }
</style>
