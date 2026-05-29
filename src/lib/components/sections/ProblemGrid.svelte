<script>
  import EditableText from '$lib/cms/EditableText.svelte';
  let { path = "", eyebrow, title, lead, cards } = $props();

  const isAdmin = $derived(typeof window !== 'undefined' && window.location.pathname.startsWith('/admin'));
</script>

<section class="section-band problem-grid-section">
  <div class="section-shell">
    <div class="top-row">
      <div class="header">
        {#if isAdmin}
          <EditableText path="{path}.eyebrow" classes="eyebrow" />
          <EditableText path="{path}.title" element="h2" classes="section-title" />
        {:else}
          <span class="eyebrow">{eyebrow}</span>
          <h2 class="section-title">{@html (title || '').replace('GROW YOUR BUSINESS,', '<span class="highlight-bg">GROW YOUR BUSINESS,</span>')}</h2>
        {/if}
      </div>
      
      {#if isAdmin}
        <EditableText path="{path}.lead" element="p" classes="lead" />
      {:else}
        <p class="lead">{lead}</p>
      {/if}
    </div>

    <div class="cards-container">
      {#each cards || [] as card, i}
        <div class="problem-card">
          <div class="card-num">
            <span>×</span>
            <strong>{String(i + 1).padStart(2, '0')}</strong>
          </div>
          {#if isAdmin}
            <EditableText path="{path}.cards.{i}.title" element="p" />
          {:else}
            <p>{card.title}</p>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .top-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 120px;
    align-items: start;
    padding: 80px 0;
  }

  .header {
    display: flex;
    flex-direction: column;
  }

  .section-title {
    font-size: clamp(2rem, 5vw, 3.8rem);
    line-height: 0.9;
    max-width: 500px;
    letter-spacing: -0.05em;
  }

  .lead {
    font-size: 1.1rem;
    line-height: 1.5;
    color: var(--muted);
    max-width: 480px;
    margin-top: 40px;
  }

  .cards-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-top: 1px solid var(--line);
  }

  .problem-card {
    padding: 40px;
    border-right: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .problem-card:first-child { border-left: 1px solid var(--line); }

  .card-num {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-num span {
    font-size: 0.8rem;
    color: var(--muted);
    font-weight: 400;
  }

  .card-num strong {
    font-size: 0.7rem;
    color: var(--ink);
    font-weight: 900;
  }

  .problem-card p {
    font-size: 1.1rem;
    line-height: 1.4;
    font-weight: 700;
    margin: 0;
    color: var(--ink);
  }

  @media (max-width: 1000px) {
    .top-row {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .cards-container {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 600px) {
    .cards-container {
      grid-template-columns: 1fr;
    }
  }
</style>
