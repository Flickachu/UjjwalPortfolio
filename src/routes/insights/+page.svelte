<script>
  import { cms } from '$lib/cms/cms.svelte.js';
  import CmsRenderer from '$lib/cms/CmsRenderer.svelte';
</script>

<main>
  {#if cms.data?.pages?.insights}
    <CmsRenderer sections={cms.data.pages.insights.sections} page="insights" />
  {/if}
</main>
