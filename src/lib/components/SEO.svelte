<script>
  import { page } from '$app/stores';
  import { cms } from '$lib/cms/cms.svelte.js';

  let path = $derived($page.url.pathname);
  let isProject = $derived(path.startsWith('/projects/') && path.length > 10);
  let projectSlug = $derived(isProject ? path.split('/').pop() : null);
  let projectData = $derived(isProject ? cms.data?.projects?.find(p => p.slug === projectSlug) : null);

  let pageKey = $derived(
    path === '/' ? 'home' : 
    path.replace('/', '')
  );

  let pageSeo = $derived(cms.data?.pages?.[pageKey]?.seo);

  let globalTitle = 'Ujjwal Saikia | Web Designer & Digital Strategist';
  let globalDesc = 'Portfolio of Ujjwal Saikia, a web designer and digital strategist creating high-performance websites, conversion systems, and brand experiences for modern businesses.';
  
  let finalTitle = $derived(
    isProject ? `${projectData?.title} | Ujjwal Saikia` :
    (pageSeo?.title || globalTitle)
  );

  let finalDesc = $derived(
    isProject ? projectData?.description :
    (pageSeo?.description || globalDesc)
  );
  
  const domain = 'https://ujjwal-portfolio.vercel.app';
  
  let image = $derived(isProject ? projectData?.image : '/og/home.jpg');
  let finalImage = $derived(image?.startsWith('http') ? image : `${domain}${image}`); 
  let url = $derived(`${domain}${path}`);

  // Schema
  let schemaData = $derived(
    isProject ? {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": finalTitle,
      "image": finalImage,
      "url": url,
      "description": finalDesc,
      "author": {
        "@type": "Person",
        "name": "Ujjwal Saikia",
        "url": domain
      },
      "publisher": {
        "@type": "Person",
        "name": "Ujjwal Saikia",
        "jobTitle": "Web Designer & Digital Strategist",
        "url": domain,
        "sameAs": [
          "https://linkedin.com/in/ujjwalsaikia",
          "https://github.com/flickachu"
        ]
      }
    } : {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Ujjwal Saikia",
      "jobTitle": "Web Designer & Digital Strategist",
      "url": domain,
      "description": finalDesc,
      "image": finalImage,
      "sameAs": [
        "https://linkedin.com/in/ujjwalsaikia",
        "https://github.com/flickachu"
      ]
    }
  );
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{finalTitle}</title>
  <meta name="title" content={finalTitle} />
  <meta name="description" content={finalDesc} />
  
  <!-- Canonical URL -->
  <link rel="canonical" href={url} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={isProject ? 'article' : 'website'} />
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
