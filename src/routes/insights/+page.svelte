<script>
  import { cms } from '$lib/cms/cms.svelte.js';
  import CmsRenderer from '$lib/cms/CmsRenderer.svelte';
  import SEO from '$lib/components/SEO.svelte';
</script>

<SEO 
  title={cms.data?.pages?.insights?.seo?.title || 'Insights'}
  description={cms.data?.pages?.insights?.seo?.description}
/>

<main>
  {#if cms.data?.pages?.insights}
    <CmsRenderer sections={cms.data.pages.insights.sections} page="insights" />
  {/if}
</main>
