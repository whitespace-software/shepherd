<script lang="typescript">
  import { afterUpdate } from 'svelte';
  import { isHTMLElement, isFunction, isString } from '../utils/type-check.ts';
  import type { Step } from 'src/step.ts';
  import ShepherdImage from './shepherd-image.svelte';
  import ShepherdVideo from './shepherd-video.svelte';

  export let descriptionId: string, element: HTMLElement | undefined = undefined, step: Step;

  let textHTML: string;

  afterUpdate(() => {
    let { text } = step.options;

    if (isFunction(text)) {
      text = text.call(step);
    }

    if(!element){
      return;
    }

    if(isHTMLElement(text)){
      element.appendChild(text);
    } else if(isString(text)){
      textHTML = text
    } else if(Array.isArray(text)) {
      textHTML = text.join("");
    }

  });
</script>

<div bind:this={element} class="shepherd-text" id={descriptionId}>
  {@html textHTML}

  {#if step.options.image}
    <ShepherdImage step={step}></ShepherdImage>
  {/if}

  {#if step.options.video}
    <ShepherdVideo step={step}></ShepherdVideo>
  {/if}

</div>


<style global>
  .shepherd-text {
    /* line-height: 1.3em; */
    background-color: white;
    padding: 1rem 1.5rem;

    font-family: var(--tour-font-primary);
    font-size: var(--tour-font-size);
    font-weight: var(--tour-font-weight);
    line-height: var(--tour-line-height);
    color: var(--tour-font-color);


  }

  .shepherd-text b {
    font-weight: bold;
  }

  .shepherd-text p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .shepherd-text p:last-child {
    margin-bottom: 0;
  }

  .shepherd-text ul {
    list-style: disc;
  }

</style>
