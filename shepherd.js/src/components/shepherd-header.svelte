<script lang="typescript">
  import {
    Step,
    type StepOptionsCancelIcon,
    type StringOrStringFunction
  } from "src/step";
  import ShepherdCancelIcon from "./shepherd-cancel-icon.svelte";
  import ShepherdTitle from "./shepherd-title.svelte";

  export let labelId: string, step: Step;
  let title: StringOrStringFunction | undefined,
    cancelIcon: StepOptionsCancelIcon | undefined;

  $: {
    title = step.options.title;
    cancelIcon = step.options.cancelIcon;
  }
</script>

<header class="shepherd-header">
  {#if title}
    <ShepherdTitle {labelId} {title} />
  {/if}

  {#if cancelIcon && cancelIcon.enabled}
    <ShepherdCancelIcon {cancelIcon} {step} />
  {/if}
</header>

<style global>
  .shepherd-header {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    padding: 0.75rem 0.75rem 0;

  }

  .shepherd-has-title .shepherd-content .shepherd-header {
    background: var(--tour-header-bg);
    padding: 0.75rem 1.5rem;
    text-transform: uppercase;
  }
</style>
