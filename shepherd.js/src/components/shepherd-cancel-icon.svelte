<script lang="typescript">
  import type { StepOptionsCancelIcon } from "src/step";
  import { Step } from "src/step";

  export let cancelIcon: StepOptionsCancelIcon, step: Step;

  /**
   * Add a click listener to the cancel link that cancels the tour
   */
  const handleCancelClick = (e: Event) => {
    e.preventDefault();
    step.cancel();
  };
</script>

<!-- <button
  aria-label={cancelIcon.label ? cancelIcon.label : 'Close Tour'}
  class="shepherd-cancel-icon"
  on:click={handleCancelClick}
  type="button"
>
  <span aria-hidden="true">&times;</span>
</button> -->

<button
  aria-label={cancelIcon.label ? cancelIcon.label : "Close Tour"}
  class="shepherd-text-cancel"
  on:click={handleCancelClick}
  type="button"
>
  Dismiss
</button>

<style global>
  /* .shepherd-cancel-icon {
    background: transparent;
    border: none;
    color: rgba(128, 128, 128, 0.75);
    font-size: 2em;
    cursor: pointer;
    font-weight: normal;
    margin: 0;
    padding: 0;
    transition: color 0.5s ease;
  } */

  /* .shepherd-cancel-icon:hover {
    color: rgba(0, 0, 0, 0.75);
  }

  .shepherd-has-title .shepherd-content .shepherd-cancel-icon {
    color: rgba(128, 128, 128, 0.75);
  }

  .shepherd-has-title .shepherd-content .shepherd-cancel-icon:hover {
    color: rgba(0, 0, 0, 0.75);
  } */

  .shepherd-text-cancel {
    background-color: transparent;
    border: none;

    color: var(--tour-primary);

    font-family: var(--tour-font);
    font-size: 0.875rem;
    font-weight: 400;

    /* padding-inline: 0.75rem; */

    cursor: pointer;
  }



</style>
