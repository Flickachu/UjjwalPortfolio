<script>
  import EditableText from '$lib/cms/EditableText.svelte';
  let { path = "", eyebrow, title, steps } = $props();

  const isAdmin = $derived(typeof window !== 'undefined' && window.location.pathname.startsWith('/admin'));
</script>

<section class="section-band approach-section">
  <div class="section-shell">
    <div class="approach-header">
      {#if isAdmin}
        <EditableText path="{path}.eyebrow" classes="eyebrow" />
        <h1 class="display-title highlight-text">
          <EditableText path="{path}.title" multiline={true} />
        </h1>
      {:else}
        <span class="eyebrow">{eyebrow}</span>
        <h2 class="display-title highlight-text">
          STRATEGY. DESIGN. <br/> DEVELOPMENT. <br/> <span class="highlight">ALL WORKING TOGETHER.</span>
        </h2>
      {/if}
    </div>

    <div class="steps-grid">
      {#each steps || [] as step, i}
        <div class="step-card">
          <div class="step-visual">
            <div class="icon-circle">
              {#if i === 0}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/><path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              {:else if i === 1}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
              {:else if i === 2}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 18L22 12L16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 6L2 12L8 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              {:else}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              {/if}
            </div>
            {#if i < (steps?.length || 0) - 1}
              <div class="step-connector">
                <div class="arrow-tip"></div>
              </div>
            {/if}
          </div>
          <div class="step-content">
            {#if isAdmin}
              <EditableText path="{path}.steps.{i}.label" classes="step-id" />
              <EditableText path="{path}.steps.{i}.text" element="p" />
            {:else}
              <span class="step-id">{step.id}. {step.label}</span>
              <p>{step.text}</p>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .approach-section {
    background: #0D0D0D;
    color: white;
    border-top: none;
    padding: 140px 0;
  }

  .approach-header {
    margin-bottom: 100px;
  }

  .highlight-text {
    font-size: clamp(2rem, 8vw, 5.5rem);
    line-height: 0.85;
    letter-spacing: -0.06em;
  }

  .highlight {
    color: var(--accent);
  }

  .steps-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
  }

  .step-card {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .step-visual {
    display: flex;
    align-items: center;
    gap: 0;
    width: 100%;
  }

  .icon-circle {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.1);
    display: grid;
    place-items: center;
    color: var(--accent);
    background: rgba(217, 255, 0, 0.05);
    flex-shrink: 0;
  }

  .step-connector {
    height: 1px;
    flex-grow: 1;
    background: rgba(255,255,255,0.1);
    position: relative;
  }

  .arrow-tip {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    border-top: 1px solid rgba(255,255,255,0.1);
    border-right: 1px solid rgba(255,255,255,0.1);
    transform: translateY(-50%) rotate(45deg);
  }

  .step-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .step-id {
    font-size: 0.7rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent);
  }

  .step-content p {
    font-size: 0.85rem;
    line-height: 1.6;
    color: rgba(255,255,255,0.4);
    margin: 0;
    max-width: 240px;
  }

  @media (max-width: 1000px) {
    .steps-grid {
      grid-template-columns: 1fr 1fr;
    }
    .step-connector { display: none; }
  }
</style>
