<script>
  import { createEventDispatcher } from 'svelte';

  export let title = 'Button';

  const dispatch = createEventDispatcher();

  function onClick(e) {
    dispatch('click');
  }
</script>


<button on:click={onClick}><span>{title}</span></button>

<style lang="scss">
  $bg-color: #e8ebef;

  button {
    padding: 10px 15px;
    outline: none;
    background: none;
    border-radius: 5px;
    background: $bg-color;
    transition: .1s background;
    cursor: pointer;
    border: none;

    &:hover {
      background: darken($bg-color, 5);
    }

    &:active {
      background: darken($bg-color, 10);
    }
  }
</style>
