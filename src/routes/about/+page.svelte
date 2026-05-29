<script>
  import { cms } from '$lib/cms/cms.svelte.js';
  import CmsRenderer from '$lib/cms/CmsRenderer.svelte';
  import SEO from '$lib/components/SEO.svelte';
</script>

<SEO 
  title={cms.data?.pages?.about?.seo?.title || 'About - Studio'}
  description={cms.data?.pages?.about?.seo?.description}
/>

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
