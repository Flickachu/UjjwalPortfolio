<script>
  import CmsRenderer from '$lib/cms/CmsRenderer.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import { cms } from '$lib/cms/cms.svelte.js';
</script>

<SEO 
  title={cms.data?.pages?.home?.seo?.title} 
  description={cms.data?.pages?.home?.seo?.description} 
/>

<CmsRenderer sections={cms.data?.pages?.home?.sections || []} />
