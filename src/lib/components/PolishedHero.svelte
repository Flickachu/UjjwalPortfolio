<script>
  import HeroSignal from '$lib/components/HeroSignal.svelte';
  import EditableText from '$lib/cms/EditableText.svelte';

  let {
    path = "",
    eyebrow = "Interactive portfolio",
    title = "Ujjwal Saikia",
    lead = "Strategy-first websites, conversion systems, and interactive product experiences.",
    cta = "Work with me"
  } = $props();

  const isAdmin = $derived(typeof window !== 'undefined' && window.location.pathname.startsWith('/admin'));
</script>

<section class="polished-hero section-shell">
  <div class="copy">
    {#if isAdmin}
      <EditableText path="{path}.eyebrow" classes="eyebrow" />
      <EditableText path="{path}.title" element="h1" classes="display-title" />
      <EditableText path="{path}.lead" element="p" classes="lead" />
    {:else}
      <p class="eyebrow">{eyebrow}</p>
      <h1 class="display-title">{title}</h1>
      <p class="lead">{lead}</p>
    {/if}
    <div class="button-row">
      <a class="btn btn-primary" href="/contact">
        {#if isAdmin}
          <EditableText path="{path}.cta" />
        {:else}
          {cta}
        {/if}
      </a>
      <a class="btn" href="/projects">View work</a>
    </div>
  </div>

  <HeroSignal />
</section>

<style>
  .polished-hero {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(420px, 1fr);
    gap: 34px;
    align-items: center;
    padding: 54px 0 72px;
  }

  .copy {
    display: grid;
    gap: 20px;
  }

  @media (max-width: 940px) {
    .polished-hero {
      grid-template-columns: 1fr;
    }
  }
</style>
