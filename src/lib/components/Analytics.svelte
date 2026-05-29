<script>
  import { env } from '$env/dynamic/public';

  const gaId = env.PUBLIC_GA_ID;
</script>

<svelte:head>
  {#if gaId}
    <script async src={"https://www.googletagmanager.com/gtag/js?id=" + gaId}></script>
    {@html `<script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}', { page_path: location.pathname });</script>`}
  {/if}
</svelte:head>
