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

<section class="about-hero section-shell">
  <div class="copy">
    {#if isAdmin}
      <EditableText path="{path}.eyebrow" classes="eyebrow" />
      <EditableText path="{path}.title" element="h1" classes="display-title huge-text" />
    {:else}
      <p class="eyebrow">{eyebrow}</p>
      <h1 class="display-title huge-text">{title}</h1>
    {/if}
    <div class="bottom-row">
      {#if isAdmin}
        <EditableText path="{path}.lead" element="p" classes="lead" />
      {:else}
        <p class="lead">{lead}</p>
      {/if}
      <a class="btn btn-primary" href="/projects">
        {#if isAdmin}
          <EditableText path="{path}.cta" />
        {:else}
          {cta}
        {/if}
      </a>
    </div>
  </div>
</section>

<style>
  .about-hero {
    padding: 100px 0 80px;
  }
  .copy {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  .huge-text {
    font-size: clamp(3rem, 10vw, 8rem);
    text-transform: uppercase;
    line-height: 0.85;
    letter-spacing: -0.06em;
    max-width: 1000px;
  }
  .bottom-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-top: 2px solid var(--ink);
    padding-top: 32px;
    margin-top: 20px;
    gap: 40px;
  }
  .lead {
    max-width: 400px;
    margin: 0;
  }
  @media (max-width: 768px) {
    .bottom-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 24px;
    }
  }
</style>
