<script lang="typescript">
  import { onMount, afterUpdate } from "svelte";
  import ShepherdContent from "./shepherd-content.svelte";
  import { isUndefined, isString } from "../utils/type-check.ts";
  import { Step } from "src/step.ts";

  const KEY_TAB = "Tab";
  const KEY_ESC = "Escape";
  const LEFT_ARROW = "ArrowLeft";
  const RIGHT_ARROW = "ArrowRight";

  export let classPrefix: string | undefined,
    element: HTMLElement | undefined = undefined,
    descriptionId: string,
    firstFocusableElement: HTMLElement | undefined,
    focusableElements: HTMLElement[],
    labelId: string,
    lastFocusableElement: HTMLElement | undefined,
    step: Step,
    dataStepId: { [key: string]: string };

  let hasCancelIcon: boolean, hasTitle: boolean, classes: string;

  $: {
    hasCancelIcon = !!(
      step.options &&
      step.options.cancelIcon &&
      step.options.cancelIcon.enabled
    );
    hasTitle = !!(step.options && step.options.title);
  }

  export const getElement = () => element;

  onMount(() => {
    // Get all elements that are focusable
    dataStepId = { [`data-${classPrefix}shepherd-step-id`]: step.id };

    if (element) {
      focusableElements = Array.from(
        element.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
        )
      );

      firstFocusableElement = focusableElements[0];
      lastFocusableElement = focusableElements[focusableElements.length - 1];
    }
  });

  afterUpdate(() => {
    if (classes !== step.options.classes) {
      updateDynamicClasses();
    }
  });

  function updateDynamicClasses() {
    removeClasses(classes);
    classes = step.options.classes ?? "";
    addClasses(classes);
  }

  function removeClasses(classes: string) {
    if (isString(classes)) {
      const oldClasses = getClassesArray(classes);
      if (element && oldClasses.length) {
        element.classList.remove(...oldClasses);
      }
    }
  }

  function addClasses(classes: string) {
    if (isString(classes)) {
      const newClasses = getClassesArray(classes);
      if (element && newClasses.length) {
        element.classList.add(...newClasses);
      }
    }
  }

  function getClassesArray(classes: string) {
    return classes.split(" ").filter((className) => !!className.length);
  }

  /**
   * Setup keydown events to allow closing the modal with ESC
   *
   * Borrowed from this great post! https://bitsofco.de/accessible-modal-dialog/
   *
   * @private
   */
  const handleKeyDown = (e: KeyboardEvent) => {
    const { tour } = step;
    switch (e.key) {
      case KEY_TAB:
        if (focusableElements.length === 0) {
          e.preventDefault();
          break;
        }
        // Backward tab
        if (e.shiftKey) {
          if (
            document.activeElement === firstFocusableElement ||
            document.activeElement?.classList.contains("shepherd-element")
          ) {
            e.preventDefault();
            lastFocusableElement?.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement?.focus();
          }
        }
        break;
      case KEY_ESC:
        if (tour.options.exitOnEsc) {
          e.preventDefault();
          e.stopPropagation();
          step.cancel();
        }
        break;
      case LEFT_ARROW:
        if (tour.options.keyboardNavigation) {
          e.preventDefault();
          e.stopPropagation();
          tour.back();
        }
        break;
      case RIGHT_ARROW:
        if (tour.options.keyboardNavigation) {
          e.preventDefault();
          e.stopPropagation();
          tour.next();
        }
        break;
      default:
        break;
    }
  };
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
  aria-describedby={!isUndefined(step.options.text) ? descriptionId : null}
  aria-labelledby={step.options.title ? labelId : null}
  bind:this={element}
  class:shepherd-has-cancel-icon={hasCancelIcon}
  class:shepherd-has-title={hasTitle}
  class:shepherd-element={true}
  {...dataStepId}
  on:keydown={handleKeyDown}
  role="dialog"
  tabindex="0"
>
  {#if step.options.arrow && step.options.attachTo && step.options.attachTo.element && step.options.attachTo.on}
    <div class="shepherd-arrow" data-popper-arrow></div>
  {/if}
  <ShepherdContent {descriptionId} {labelId} {step} />
</div>

<style global>
  @font-face {
    font-family: "Material Symbols Outlined";
    font-style: normal;
    src:
      url("/assets/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].woff2")
        format("woff2"),
      url("/assets/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].ttf")
        format("truetype");
  }

  .shepherd-material-symbols-outlined {
    font-family: "Material Symbols Outlined";
    font-weight: normal;
    font-variation-settings:
      "FILL" 0,
      "wght" 200,
      "GRAD" 0,
      "opsz" 24;
    font-style: normal;
    font-size: 24px;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
  }

  :root {
    --tour-primary: #007bff;

    --tour-grey-darkest: #212529;
    --tour-grey-dark: #60637c;
    --tour-grey-mid-darkest: #6c757d;
    --tour-grey-mid-dark: #888888;
    --tour-grey-mid: #c7c9d6;
    --tour-grey-mid-light: #d6d6d6;
    --tour-grey-light: #efeff4;
    --tour-grey-lightest: #f8f9fa;

    --tour-blue-darkest: #1f3674;
    --tour-blue-dark: #004bb2;
    --tour-blue-mid: var(--tour-primary);
    --tour-blue-light: #6ea9ff;
    --tour-blue-lightest: #f1f6ff;

    --tour-success: #34c759;
    --tour-cyan: #17a2b8;

    --tour-header-bg: var(--tour-grey-lightest);
    --tour-badge-bg: #ecf1ff;
    --tour-pointer-bg: white;

    --tour-btn-active-shadow-col: #6161624d;

    --tour-font: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
  }

  .shepherd-element {
    background: #fff;
    border-radius: 5px;
    /* box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2); */
    filter: drop-shadow(0 1px 4px rgba(0,0,0,.2));

    max-width: 560px;
    opacity: 0;
    outline: none;
    transition:
      opacity 0.3s,
      visibility 0.3s;
    visibility: hidden;
    width: 100%;
    z-index: 9999;
  }

  .shepherd-enabled.shepherd-element {
    opacity: 1;
    visibility: visible;
  }

  .shepherd-element[data-popper-reference-hidden]:not(.shepherd-centered) {
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
  }

  .shepherd-element,
  .shepherd-header,
  .shepherd-footer,
  .shepherd-content {
    border-radius: 0.75rem;
  }

  .shepherd-header {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .shepherd-footer {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }


  .shepherd-element,
  .shepherd-element *,
  .shepherd-element *:after,
  .shepherd-element *:before {
    box-sizing: border-box;
  }

  .shepherd-arrow,
  .shepherd-arrow::before {
    position: absolute;
    width: 16px;
    height: 16px;
    z-index: -1;
  }

  .shepherd-arrow:before {
    content: "";
    transform: rotate(45deg);
    background: #fff;
  }

  .shepherd-element[data-popper-placement^="top"] > .shepherd-arrow {
    bottom: -8px;
  }

  .shepherd-element[data-popper-placement^="bottom"] > .shepherd-arrow {
    top: -8px;
  }

  .shepherd-element[data-popper-placement^="left"] > .shepherd-arrow {
    right: -8px;
  }

  .shepherd-element[data-popper-placement^="right"] > .shepherd-arrow {
    left: -8px;
  }

  .shepherd-element.shepherd-centered > .shepherd-arrow {
    opacity: 0;
  }

  /**
  * Arrow on top of tooltip centered horizontally, with title color
  */
  .shepherd-element.shepherd-has-title[data-popper-placement^="bottom"]
    > .shepherd-arrow::before {
    background-color: #e6e6e6;
  }

  .shepherd-target-click-disabled.shepherd-enabled.shepherd-target,
  .shepherd-target-click-disabled.shepherd-enabled.shepherd-target * {
    pointer-events: none;
  }

  .shepherd-large-container {
    max-width: 660px;
    max-height: 650px;
  }

  .shepherd-extra-large-container {
    max-width: 750px;
    max-height: 750px;
  }
</style>
