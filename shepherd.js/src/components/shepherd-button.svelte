<script lang="typescript">
    import { Step, type StepOptionsButton } from 'src/step.ts';
  import { isFunction } from '../utils/type-check.ts';

  export let config: StepOptionsButton, step: Step;
  let action: () => void, classes: string | undefined, disabled: boolean, label: string, secondary: boolean, text: string, iconName: string | undefined, iconPosition: string | undefined;

  $: {
    action = config.action ? config.action.bind(step.tour) : () => {};
    classes = config.classes;
    disabled = config.disabled ? getConfigOption(config.disabled) : false;
    label = config.label ? getConfigOption(config.label) : null;
    secondary = !!config.secondary;
    text = config.text ? getConfigOption(config.text) : null;
    iconName = config.iconName;
    iconPosition = config.iconPosition;
  }

  function getConfigOption(option: unknown) {
    if (isFunction(option)) {
      return (option = option.call(step));
    }
    return option;
  }
</script>

<button
  aria-label={label ? label : null}
  class={`${classes || ''} shepherd-button ${
    secondary ? 'shepherd-button-secondary' : ''
  }`}
  class:has-icon={!!iconName && !!iconPosition}
  {disabled}
  on:click={action}
  tabindex="0"
  type="button"
>

  {#if !!iconName && iconPosition === "left"}
    <span class=shepherd-material-symbols-outlined>{iconName}</span>
  {/if}

  <!-- <span>{@html text}</span> -->
  {@html text}

  {#if !!iconName && iconPosition === "right"}
    <span class=shepherd-material-symbols-outlined>{iconName}</span>
  {/if}


</button>

<style global>
  .shepherd-button {
    background-color: transparent;

    border: none;
    border-radius: 0.25rem;
    outline: none;

    cursor: pointer;

    text-align: center;

    font-family:  Roboto, Helvetica, Arial, sans-serif;
    font-weight: 500;
    font-size: var(--tour-font-size);
    line-height: var(--tour-line-height);
    color: var(--tour-primary);

    /* margin-right: 0.5rem; */
    padding: 0.625rem 0.75rem;
    transition: all 0.5s ease;

  }

  .shepherd-button:not(:disabled):hover {
    color: var(--tour-blue-darkest);
  }

  .shepherd-button.shepherd-button-secondary {
    background: rgb(241, 242, 243);
    color: rgba(0, 0, 0, 0.75);
  }

  .shepherd-button.shepherd-button-secondary:not(:disabled):hover {
    background: rgb(214, 217, 219);
    color: rgba(0, 0, 0, 0.75);
  }

  .shepherd-button:disabled {
    cursor: not-allowed;
  }

  .shepherd-button.has-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
  }

  .text-with-icon {
    border: 1px solid var(--tour-primary);
    padding: 0.5rem 0.75rem;
  }

  .text-with-icon:not(:disabled):hover {
    background: var(--tour-primary);
    color: white;
  }




</style>
