<script>
  import { page } from '$app/stores';
  import { cms } from '$lib/cms/cms.svelte.js';

  let { 
    title = '', 
    description = '', 
    image = '', 
    type = 'WebSite',
    article = false
  } = $props();

  // Fallback to global site settings if page-specific props aren't provided
  let globalTitle = $derived(cms.data?.site?.title || 'Portfolio');
  let globalDesc = $derived(cms.data?.site?.description || '');
  
  let finalTitle = $derived(title ? `${title} | ${globalTitle}` : globalTitle);
  let finalDesc = $derived(description || globalDesc);
  
  // Base domain should be injected from env, using hardcoded fallback for now
  const domain = 'https://ujjwal-portfolio.vercel.app';
  
  let finalImage = $derived(image || `${domain}/favicon.svg`); 
  let url = $derived(`${domain}${$page.url.pathname}`);

  // Generate JSON-LD Schema
  let schemaData = $derived({
    "@context": "https://schema.org",
    "@type": type,
    "name": finalTitle,
    "url": url,
    "description": finalDesc,
    "image": finalImage,
    ...(article && {
      "headline": title,
      "author": {
        "@type": "Person",
        "name": "Ujjwal Saikia"
      },
      "publisher": {
        "@type": "Organization",
        "name": globalTitle,
        "logo": {
          "@type": "ImageObject",
          "url": `${domain}/favicon.svg`
        }
      }
    })
  });
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{finalTitle}</title>
  <meta name="title" content={finalTitle} />
  <meta name="description" content={finalDesc} />
  
  <!-- Canonical URL -->
  <link rel="canonical" href={url} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={article ? 'article' : 'website'} />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={finalTitle} />
  <meta property="og:description" content={finalDesc} />
  <meta property="og:image" content={finalImage} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={url} />
  <meta property="twitter:title" content={finalTitle} />
  <meta property="twitter:description" content={finalDesc} />
  <meta property="twitter:image" content={finalImage} />

  <!-- JSON-LD Structured Data -->
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html `<script type="application/ld+json">${JSON.stringify(schemaData)}</script>`}
</svelte:head>
