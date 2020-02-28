<script>
  import { createEventDispatcher } from 'svelte';

  export let title = 'Button';
  export let disabled = false;

  const dispatch = createEventDispatcher();

  function onClick(e) {
    dispatch('click');
  }
</script>


<button on:click={onClick} class:disabled={disabled}><span>{title}</span></button>

<style lang="scss">
  $bg-color: #e8ebef;
  $height: 40px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $height;
    padding: 0 15px;
    outline: none;
    background: none;
    border-radius: 5px;
    background: $bg-color;
    transition: .1s background;
    cursor: pointer;
    border: none;

    &.disabled {
      opacity: .5;
      cursor: default;
      pointer-events: none;
    }

    &:hover {
      background: darken($bg-color, 5);
    }

    &:active {
      background: darken($bg-color, 10);
    }
  }
</style>
