<script lang="typescript">
  import { Step, type StepOptionsButton } from 'src/step';
  import ShepherdButton from './shepherd-button.svelte';
  import ShepherdProgress from './shepherd-progress.svelte';

  export let step: Step, showProgressbar: boolean;

  // $: buttons = step.options.buttons;

  let buttons: readonly StepOptionsButton[] | undefined;
  let leftButtons: StepOptionsButton[] | undefined;
  let rightButtons: StepOptionsButton[] | undefined;
  let addtionalButtons: StepOptionsButton[] | undefined;
  
  let showPrimaryRow: boolean;
  let showSecondaryRow: boolean;


  $: {

    buttons = step.options.buttons;

    leftButtons = buttons?.filter(btn => btn.position === "left");
    rightButtons = buttons?.filter(btn => btn.position === "right");
    addtionalButtons = buttons?.filter(btn => !btn.position);

    const hasLeftButtons = !!leftButtons && leftButtons.length > 0;
    const hasRightButtons = !!rightButtons && rightButtons.length > 0;

    showPrimaryRow = showProgressbar || hasLeftButtons || hasRightButtons;
    showSecondaryRow = !!addtionalButtons && addtionalButtons.length > 0;

  }

</script>

<footer class="shepherd-footer footer-group">
  <!-- {#if buttons}
    {#each buttons as config}
      <ShepherdButton {config} {step} />
    {/each}
  {/if} -->


  {#if !!addtionalButtons && addtionalButtons.length > 0 }
    <div class="secondary-row">
      {#each addtionalButtons as addtionalBtn}
        <ShepherdButton config={addtionalBtn} step={step} />
      {/each}
    </div>
  {/if}

  {#if showPrimaryRow}
     <div class="primary-row">
       {#if leftButtons}
         <div class="left-button-group">
           {#each leftButtons as leftButton}
             <ShepherdButton config={leftButton} step={step} />
           {/each}
         </div>
       {/if}
       {#if showProgressbar}
         <div class="progress-wrapper">
           <ShepherdProgress step={step}/>
         </div>
       {/if}
       {#if rightButtons}
         <div class="right-button-group">
           {#each rightButtons as rightButton}
             <ShepherdButton config={rightButton} step={step} />
           {/each}
         </div>
       {/if}
     </div>
  {/if}


</footer>

<style global>
  .shepherd-footer {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    /* display: flex;
    justify-content: flex-end; */
    padding: 0.5rem 1rem;

    border-top: 1px solid var(--tour-grey-light);

    display: flex;
    flex-direction: column;
    gap: 0.75rem;

  }

  /* .shepherd-footer .shepherd-button:last-child {
    margin-right: 0;
  } */

  .primary-row {
    display: grid;
    grid-template-areas: "left-group right-group";
    grid-template-columns: 1fr 1fr;
  }

  .primary-row:has(.progress-wrapper){
    grid-template-areas: "left-group progress right-group";
    grid-template-columns: 1fr 1fr 1fr;
  }

  .left-button-group,
  .right-button-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }


  .left-button-group {
    grid-area: left-group;
    place-self: center start;
    justify-content: flex-start;
  }

  .progress-wrapper {
    grid-area: progress;
    place-self: center;
    justify-content: flex-end;
  }

  .right-button-group {
    grid-area: right-group;
    place-self: center end;
  }


  .secondary-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }



</style>
