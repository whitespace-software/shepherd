<script lang="typescript">
  import { afterUpdate } from 'svelte';
  import { isFunction } from '../utils/type-check.ts';

  export let labelId: string, element: HTMLElement | undefined = undefined, title: string | (() => string);

  afterUpdate(() => {
    if (isFunction(title)) {
      title = title();
    }

    if(element){
      element.innerHTML = title;
    }
  });
</script>

<!-- svelte-ignore a11y-missing-content -->
<h3 bind:this={element} id={labelId} class="shepherd-title"></h3>

<style global>
  .shepherd-title {
    display: flex;
    flex: 1 0 auto;

    margin: 0;
    padding: 0;

    font-family: var(--tour-font-secondary);
    font-weight: 500;
    font-size: var(--tour-font-size);
    line-height: 1.2;

    color: var(--tour-font-color);
  }
</style>
