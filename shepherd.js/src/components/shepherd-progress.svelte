<script lang="typescript">
  import { Step } from 'src/step';
  import { Tour } from 'src/tour';

  export let step: Step;

  // $: buttons = step.options.buttons;


  let tour: Tour;
  let progressBarText: string = "";
  let currentStepIndex: number;

  $: {
    tour = step.getTour();
    currentStepIndex = tour.steps.findIndex(s => s.id === step.id);
    progressBarText = currentStepIndex !== -1 ? `${currentStepIndex + 1} of ${tour.steps.length}` : "";
  }


</script>

<style global>
  .shepherd-progress-bar {
    font-weight: 700;
    font-size: 1rem;
    color: var(--tour-grey-dark);
  }

</style>

<div class="shepherd-progress-bar">
  {progressBarText}
</div>