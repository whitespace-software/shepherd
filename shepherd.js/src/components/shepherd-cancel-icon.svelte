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

<button
  aria-label={cancelIcon.label ? cancelIcon.label : "Close Tour"}
  class="shepherd-text-cancel"
  on:click={handleCancelClick}
  type="button"
>
  Dismiss
</button>

<style global>
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
