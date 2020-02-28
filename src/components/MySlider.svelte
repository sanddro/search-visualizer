<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let title = '';
  export let disabled = false;
  export let minValue = 0;
  export let maxValue = 100;
  export let value = maxValue;

  function onChange(e) {
    dispatch('change', maxValue - value);
  }

</script>


<div class="wrapper">
<div class="title">{title}</div>
<div class="slider-wrapper">
  <label>
    <input type="range" min={minValue} max={maxValue} bind:value class="slider" class:disabled={disabled} on:input={onChange}>
  </label>
</div>
</div>

<style lang="scss">
  $bg: #e8ebef;

  .title {
    margin-bottom: 5px;
    color: #5a6676;
    font-weight: 500;
    font-size: 14px;
  }

  .slider-wrapper {
    height: 40px;
    display: flex;
    align-items: center;
  }

  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    border: none;
    background: $bg;
    cursor: pointer;
    outline: none;
    transition: background .1s;

    &.disabled {
      opacity: .5;
      pointer-events: none;
      cursor: default;
    }

    &:not(.disabled):hover {
      background: darken($bg, 10);
    }


  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: darken($bg, 20);
    cursor: pointer;
    transition: background .1s;

    &:hover {
      background: darken($bg, 30);
    }
  }

</style>