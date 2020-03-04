<script>
  import { createEventDispatcher } from 'svelte';

  export let title = 'Button';
  export let disabled = false;
  export let icon, color;

  const dispatch = createEventDispatcher();

  function onClick(e) {
    dispatch('click');
  }
</script>


<button on:click={onClick} class:disabled={disabled} class={color || ''}>
  {#if icon}
    <i class="{icon}"></i>
  {/if}
  <span>{title}</span>
</button>

<style lang="scss">
  $bg-color: #e8ebef;
  $height: 40px;
  $green-bg: #15c15d;

  $colors: ('green': #1cb7a0, 'blue': #1068d2, 'red': #fd6f71, 'gray': #919fa7, 'orange': #f9d77a);

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

    @each $name, $color in $colors {
      &.#{$name} {
        background: $color;

        &, i {
          color: white;
        }

        &:hover {
          background: darken($color, 5);
        }
      }
    }


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

    i {
      margin-right: 10px;
      color: #666;
    }
  }
</style>
