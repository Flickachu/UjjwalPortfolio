<script>
  import { cms } from '$lib/cms/cms.svelte.js';
  import CmsRenderer from '$lib/cms/CmsRenderer.svelte';
</script>

<main>
  {#if cms.data?.pages?.about}
    <CmsRenderer sections={cms.data.pages.about.sections} page="about" />
  {:else}
    <div class="section-shell" style="padding: 100px 0;">
      <h1>About Us</h1>
      <p>Loading studio content...</p>
    </div>
  {/if}
</main>
