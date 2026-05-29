<script>
  import { cms } from '$lib/cms/cms.svelte.js';
  import CmsRenderer from '$lib/cms/CmsRenderer.svelte';
  import SEO from '$lib/components/SEO.svelte';
</script>

<SEO 
  title={cms.data?.pages?.services?.seo?.title || 'Services'}
  description={cms.data?.pages?.services?.seo?.description}
/>

<main>
  {#if cms.data?.pages?.services}
    <CmsRenderer sections={cms.data.pages.services.sections} page="services" />
  {/if}
</main>
