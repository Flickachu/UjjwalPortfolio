<script>
  import CmsRenderer from '$lib/cms/CmsRenderer.svelte';
  import { cms } from '$lib/cms/cms.svelte.js';
</script>

<svelte:head>
  <title>{cms.data?.pages?.home?.seo?.title || 'Home'}</title>
  <meta name="description" content={cms.data?.pages?.home?.seo?.description || ''} />
</svelte:head>

<CmsRenderer sections={cms.data?.pages?.home?.sections || []} />
