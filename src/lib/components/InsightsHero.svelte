<script>
  import EditableText from '$lib/cms/EditableText.svelte';

  let {
    path = "",
    eyebrow = "",
    title = "",
    lead = "",
    cta = ""
  } = $props();

  const isAdmin = $derived(typeof window !== 'undefined' && window.location.pathname.startsWith('/admin'));
</script>

<section class="insights-hero section-shell">
  <div class="header-top">
      {#if isAdmin}
        <EditableText path="{path}.eyebrow" classes="eyebrow" />
      {:else}
        <p class="eyebrow">{eyebrow}</p>
      {/if}
      <span class="date">Updated {new Date().getFullYear()}</span>
  </div>
  
  <div class="main-title-area">
    {#if isAdmin}
      <EditableText path="{path}.title" element="h1" classes="display-title editorial" />
    {:else}
      <h1 class="display-title editorial">{title}</h1>
    {/if}
  </div>

  <div class="footer-area">
    {#if isAdmin}
      <EditableText path="{path}.lead" element="p" classes="lead" />
    {:else}
      <p class="lead">{lead}</p>
    {/if}
  </div>
</section>

<style>
  .insights-hero {
    padding: 80px 0;
    text-align: center;
  }
  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--line);
    padding-bottom: 16px;
    margin-bottom: 60px;
  }
  .date {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--muted);
  }
  .eyebrow {
    margin: 0;
  }
  .editorial {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    max-width: 900px;
    margin: 0 auto 60px;
    line-height: 1.1;
    letter-spacing: -0.04em;
  }
  .footer-area {
    border-top: 1px solid var(--line);
    padding-top: 32px;
    max-width: 600px;
    margin: 0 auto;
  }
</style>
