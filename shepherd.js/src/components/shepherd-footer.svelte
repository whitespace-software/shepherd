<script lang="typescript">
  import { Step, type StepOptionsButton } from 'src/step';
  import ShepherdButton from './shepherd-button.svelte';
  import { Tour } from 'src/tour';

  export let step: Step, showProgressbar: boolean;

  // $: buttons = step.options.buttons;

  let tour: Tour;
  let buttons: readonly StepOptionsButton[] | undefined;
  let leftButtons: StepOptionsButton[] | undefined;
  let rightButtons: StepOptionsButton[] | undefined;
  let progressBarText: string = "";
  let currentStepIndex: number;

  $: {

    tour = step.getTour();
    buttons = step.options.buttons;

    leftButtons = buttons?.filter(btn => btn.position === "left");
    rightButtons = buttons?.filter(btn => btn.position === "right");

    currentStepIndex = tour.steps.findIndex(s => s.id === step.id);
    progressBarText = currentStepIndex !== -1 ? `${currentStepIndex + 1} of ${tour.steps.length}` : "";

  }

</script>

<footer class="shepherd-footer footer-group">
  <!-- {#if buttons}
    {#each buttons as config}
      <ShepherdButton {config} {step} />
    {/each}
  {/if} -->

  {#if leftButtons}
    <div class="left-button-group">
      {#each leftButtons as leftButton}
        <ShepherdButton config={leftButton} step={step} />
      {/each}
    </div>
  {/if}

  {#if showProgressbar}
    <span class="ws-progress-bar">
      {progressBarText}
    </span>
  {/if}


  {#if rightButtons}
    <div class="right-button-group">
      {#each rightButtons as rightButton}
        <ShepherdButton config={rightButton} step={step} />
      {/each}
    </div>
  {/if}

</footer>

<style global>
  .shepherd-footer {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    /* display: flex;
    justify-content: flex-end; */
    padding: 0 0.75rem 0.75rem;
  }

  /* .shepherd-footer .shepherd-button:last-child {
    margin-right: 0;
  } */

  .footer-group {
    display: grid;
    grid-template-areas: "left-group right-group";
    grid-template-columns: 1fr 1fr;
  }

  .footer-group:has(.ws-progress-bar){
    grid-template-areas: "left-group progress right-group";
    grid-template-columns: 1fr 1fr 1fr;
  }


  .left-button-group {
    grid-area: left-group;
    place-self: center start;
  }

  .ws-progress-bar {
    grid-area: progress;
    place-self: center;
  }

  .right-button-group {
    grid-area: right-group;
    place-self: center end;
  }




</style>
