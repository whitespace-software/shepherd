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

    // if (isHTMLElement(text)) {
    //   element.appendChild(text);
    // } else if (Array.isArray(text) && text.every(item => isString(item))) {
    //   element.innerHTML = text.join('');
    // } else {
    //   element.innerHTML = text;
    // }

    if(!element){
      return;
    }

    if(isHTMLElement(text)){
      element.appendChild(text);
    } else if(isString(text)){
      // element.innerHTML = text;
      textHTML = text
    } else if(Array.isArray(text)) {
      // element.innerHTML = text.join("")
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

<!-- {#if step.options.image}
  <ShepherdImage step={step}></ShepherdImage>
{/if} -->

<style global>
  .shepherd-text {
    columns: var(--tour-grey-darkest);
    background-color: white;
    font-size: 0.875rem;
    /* line-height: 1.3em; */
    padding: 1rem 1.5rem;
  }

  .shepherd-text p {
    margin-top: 0;
  }

  .shepherd-text p:last-child {
    margin-bottom: 0;
  }

  .shepherd-text ul {
    list-style: disc;
  }

</style>
