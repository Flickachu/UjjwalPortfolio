<script>
  import { cms } from '$lib/cms/cms.svelte.js';
  import CmsRenderer from '$lib/cms/CmsRenderer.svelte';
</script>

<main>
  {#if cms.data?.pages?.services}
    <CmsRenderer sections={cms.data.pages.services.sections} page="services" />
  {/if}
</main>
