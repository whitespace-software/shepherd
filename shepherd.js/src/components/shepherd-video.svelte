<script lang="typescript">
  import { Step } from 'src/step';

  export let step: Step;

  let url: string;
  let height: number;
  let width: number;
  let classes: string | undefined;

  $: {
    if (step.options.video) {
      const videoConfig = step.options.video;
      url = videoConfig.url;
      height = videoConfig.height;
      width = videoConfig.width;
      classes = videoConfig.classes;
    }
  }
</script>

<div class="shepherd-video-container">
  <!-- svelte-ignore a11y-media-has-caption -->
  <video src={url} {width} {height} class="shepherd-video {classes}" controls>
  </video>
</div>

<style global>
  .shepherd-video-container {
    padding: 0 2rem;
    /* margin-bottom: 1rem; */
  }

  .shepherd-video {
    width: 100%;
    height: auto;
    border-radius: 0.5rem;
  }
</style>
