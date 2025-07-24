<script lang="typescript">
  import { afterUpdate } from 'svelte';
  import { isHTMLElement, isFunction, isString } from '../utils/type-check.ts';
  import type { Step } from 'src/step.ts';

  export let descriptionId: string, element: HTMLElement, step: Step;

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

    if(isHTMLElement(text)){
      element.appendChild(text);
    } else if(isString(text)){
      element.innerHTML = text;
    } else if(Array.isArray(text)) {
      element.innerHTML = text.join("")
    }

  });
</script>

<div bind:this={element} class="shepherd-text" id={descriptionId}></div>

<style global>
  .shepherd-text {
    color: rgba(0, 0, 0, 0.75);
    font-size: 1rem;
    line-height: 1.3em;
    padding: 0.75em;
  }

  .shepherd-text p {
    margin-top: 0;
  }

  .shepherd-text p:last-child {
    margin-bottom: 0;
  }
</style>
