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

<section class="services-hero section-shell">
  <div class="grid-layout">
    <div class="left-col">
      {#if isAdmin}
        <EditableText path="{path}.eyebrow" classes="eyebrow" />
      {:else}
        <p class="eyebrow">{eyebrow}</p>
      {/if}
    </div>
    <div class="right-col">
      {#if isAdmin}
        <EditableText path="{path}.title" element="h1" classes="display-title title-text" />
        <EditableText path="{path}.lead" element="p" classes="lead" />
      {:else}
        <h1 class="display-title title-text">{title}</h1>
        <p class="lead">{lead}</p>
      {/if}
      <div class="actions">
        <a class="btn btn-primary" href="/contact">
          {#if isAdmin}
            <EditableText path="{path}.cta" />
          {:else}
            {cta}
          {/if}
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .services-hero {
    padding: 140px 0 100px;
  }
  .grid-layout {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 40px;
  }
  .title-text {
    font-size: clamp(2.5rem, 7vw, 5.5rem);
    margin-bottom: 32px;
    max-width: 900px;
    line-height: 0.9;
  }
  .lead {
    font-size: 1.25rem;
    max-width: 600px;
    margin-bottom: 48px;
    font-weight: 500;
  }
  @media (max-width: 900px) {
    .grid-layout {
      grid-template-columns: 1fr;
    }
  }
</style>
