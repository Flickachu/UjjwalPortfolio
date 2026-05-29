<script>
  import CmsRenderer from '$lib/cms/CmsRenderer.svelte';
  import { cms } from '$lib/cms/cms.svelte.js';
</script>

<CmsRenderer sections={cms.data?.pages?.home?.sections || []} />
