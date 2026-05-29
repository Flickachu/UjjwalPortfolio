<script>
  import { cms } from '$lib/cms/cms.svelte.js';
  import CmsRenderer from '$lib/cms/CmsRenderer.svelte';
</script>

<svelte:head>
  <title>{cms.data?.pages?.services?.seo?.title || 'Services'}</title>
</svelte:head>

<main>
  {#if cms.data?.pages?.services}
    <CmsRenderer sections={cms.data.pages.services.sections} page="services" />
  {/if}
</main>
