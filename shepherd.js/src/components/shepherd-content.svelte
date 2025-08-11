<script lang="typescript">
  import ShepherdFooter from './shepherd-footer.svelte';
  import ShepherdHeader from './shepherd-header.svelte';
  import ShepherdText from './shepherd-text.svelte';
  import { isUndefined } from '../utils/type-check.ts';
  import { Step } from 'src/step.ts';
  import  { Tour } from 'src/tour.ts';

  export let descriptionId: string, labelId: string, step: Step;

  let tour: Tour;
  let progressBarEnabled: boolean;
  let showFooter: boolean;

  $: {
    tour = step.getTour();
    progressBarEnabled = !!tour.options.enableProgressBar;
    showFooter = progressBarEnabled || (Array.isArray(step.options.buttons) && step.options.buttons.length > 0);
  }

</script>

<div class="shepherd-content">
  {#if !isUndefined(step.options.title) || (step.options.cancelIcon && step.options.cancelIcon.enabled)}
    <ShepherdHeader {labelId} {step} />
  {/if}

  {#if !isUndefined(step.options.text)}
    <ShepherdText {descriptionId} {step} />
  {/if}

  {#if showFooter}
    <ShepherdFooter {step} showProgressbar={progressBarEnabled}/>
  {/if}
</div>

<style global>
  .shepherd-content {
    outline: none;
    padding: 0;
    overflow: hidden;

    box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, .05);

  }
</style>
