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

    color: var(--tour-grey-darkest);
    font-family: var(--tour-font);
    font-size: 0.875rem;
    font-weight: 500;
  }
</style>
