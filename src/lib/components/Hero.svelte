<script>
  import { cms } from '$lib/cms/cms.svelte.js';
  import EditableText from '$lib/cms/EditableText.svelte';
  
  let {
    path = "pages.home.sections.0",
    eyebrow = "WEB DESIGN & STRATEGY PARTNER",
    title = "WEBSITES\nTHAT WIN\nTRUST\nBEFORE THE\nFIRST CALL.",
    lead = "Strategy-led websites for founders and brands who want more than pretty - they want performance.",
    cta = "BOOK A FREE STRATEGY CALL"
  } = $props();

  const isAdmin = $derived(typeof window !== 'undefined' && window.location.pathname.startsWith('/admin'));

  function formatTitle(text) {
    if (!text) return '';
    return text
      .replace(/TRUST/, '<span class="highlight-bg">TRUST</span>')
      .replace(/\n/g, '<br/>');
  }
</script>

<section class="hero-redesign">
  <div class="section-shell hero-grid">
    <div class="hero-copy">
      {#if isAdmin}
        <EditableText path="{path}.eyebrow" classes="eyebrow" />
        <h1 class="display-title">
          <EditableText path="{path}.title" multiline={true} />
        </h1>
        <EditableText path="{path}.lead" element="p" classes="lead" />
      {:else}
        <span class="eyebrow">{eyebrow}</span>
        <h1 class="display-title">
          {@html formatTitle(title)}
        </h1>
        <p class="lead">{lead}</p>
      {/if}

      <div class="hero-actions">
        <a href="/contact" class="btn btn-primary hero-cta">
          {#if isAdmin}
            <EditableText path="{path}.cta" />
          {:else}
            {cta}
          {/if}
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="/projects" class="btn-text">
          VIEW WORK
          <span>{@html '&rarr;'}</span>
        </a>
      </div>
    </div>

    <div class="hero-visual">
      <div class="visual-stack">
        <!-- Code Window -->
        <div class="stack-item code-window">
          <div class="code-dot"></div>
          <pre><code>{`<h1>Websites built
for trust and results.</h1>
<p>Strategy. Design.
Development.</p>
<button>Book a Call</button>`}</code></pre>
        </div>

        <!-- Clarity Card -->
        <div class="stack-item preview-window">
          <div class="preview-header">
            <span class="p-logo">LM</span>
            <div class="p-action-box">
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>

          <div class="preview-body">
            <h2>CLARITY<br/>THAT<br/>CONVERTS<span>.</span></h2>
            <div class="p-divider"></div>
            <p>WEBSITES BUILT FOR TRUST,<br/>NOT JUST TRAFFIC.</p>
          </div>

          <div class="preview-footer">
            <span class="footer-label">OUR WORK</span>
            <div class="barcode">
              <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
        </div>

        <!-- Metrics Card -->
        <div class="stack-item metrics-card">
          <div class="metric-quad">
            <div class="m-item"><span class="m-val">98</span><span class="m-label">PERFORMANCE</span></div>
            <div class="m-item"><span class="m-val">100</span><span class="m-label">SEO SCORE</span></div>
            <div class="m-item"><span class="m-val">90</span><span class="m-label">SPEED</span></div>
            <div class="m-item"><span class="m-val">100</span><span class="m-label">SATISFACTION</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .hero-redesign {
    padding: 80px 0 120px;
    background: var(--bg);
    overflow: hidden;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(320px, 400px);
    gap: 60px;
    align-items: center;
  }

  .hero-copy {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .eyebrow {
    color: var(--muted);
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .display-title {
    font-size: clamp(3.5rem, 6.5vw, 5.5rem);
    line-height: 0.85;
    font-weight: 900;
    letter-spacing: -0.05em;
    margin: 0;
    max-width: 620px;
    text-transform: uppercase;
  }

  .highlight-bg {
    display: inline-block;
    background: var(--accent);
    color: var(--ink);
    padding: 0 0.1em;
    border-radius: 0.05em;
  }

  .lead {
    max-width: 440px;
    font-size: 0.98rem;
    color: var(--muted);
    line-height: 1.6;
    margin: 0;
    font-weight: 500;
  }

  .hero-actions {
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  .hero-cta {
    min-width: 240px;
    height: 58px;
    font-size: 0.9rem;
    border-radius: 4px;
  }

  .btn-text {
    background: none;
    border: none;
    padding: 0;
    color: var(--ink);
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    font-size: 0.85rem;
  }

  /* Hero Visual System */
  .hero-visual {
    position: relative;
    height: 540px;
    width: 100%;
    margin-top: 120px; /* AGGRESSIVELY BRING IT DOWN */
    perspective: 1200px;
    align-self: center;
  }

  .visual-stack {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
  }

  .stack-item {
    position: absolute;
    border-radius: 12px; /* Sharper corners as per mockup */
    overflow: hidden;
    box-shadow: 0 50px 100px rgba(0, 0, 0, 0.18);
  }

  /* Code Window */
  .code-window {
    top: 0;
    left: 0;
    width: 260px;
    padding: 24px;
    background: #0d0d0d;
    color: #f6f6f6;
    z-index: 1;
    transform: rotate(-3deg) translateZ(0);
  }

  .code-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    margin-bottom: 24px;
  }

  pre {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 0.72rem;
    line-height: 1.5;
    margin: 0;
    white-space: pre-wrap;
    opacity: 0.9;
  }

  /* Preview Window (Clarity Card) */
  .preview-window {
    top: 100px;
    right: 0;
    width: 280px;
    padding: 32px;
    background: white;
    z-index: 3;
    display: flex;
    flex-direction: column;
    gap: 20px;
    transform: translateZ(60px);
    border-radius: 12px;
  }

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .p-logo {
    font-weight: 900;
    font-size: 1rem;
    letter-spacing: -0.02em;
  }

  .p-action-box {
    width: 30px;
    height: 30px;
    background: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }

  .preview-body h2 {
    font-size: 2.4rem;
    line-height: 1;
    margin: 0;
    letter-spacing: -0.05em;
    font-weight: 900;
    color: #111;
  }

  .preview-body h2 span {
    color: var(--accent);
  }

  .p-divider {
    width: 100%;
    height: 1px;
    background: #eee;
    margin: 20px 0;
  }

  .preview-body p {
    margin: 0;
    color: #333;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    line-height: 1.4;
  }

  .preview-footer {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .footer-label {
    font-size: 0.65rem;
    font-weight: 900;
    letter-spacing: 0.1em;
  }

  .barcode {
    display: flex;
    gap: 2px;
    align-items: flex-end;
    height: 16px;
  }

  .barcode span {
    background: #111;
    width: 2px;
    height: 100%;
  }

  .barcode span:nth-child(even) { width: 1px; height: 50%; opacity: 0.5; }
  .barcode span:nth-child(3n) { width: 3px; height: 80%; }
  .barcode span:nth-child(4n) { width: 1px; height: 100%; }

  /* Metrics Card */
  .metrics-card {
    bottom: 20px;
    left: 0;
    width: 260px;
    background: #0d0d0d;
    color: white;
    z-index: 2;
    transform: rotate(2deg) translateZ(30px);
  }

  .metric-quad {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .metric-quad .m-item {
    padding: 24px;
    border: 0.5px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .m-val {
    font-size: 1.8rem;
    font-weight: 900;
    color: var(--accent);
    line-height: 1;
  }

  .m-label {
    font-size: 0.55rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    color: #999;
  }

  @media (max-width: 1100px) {
    .hero-grid {
      grid-template-columns: 1fr;
      justify-items: center;
      text-align: center;
      gap: 80px;
    }

    .hero-copy {
      align-items: center;
    }

    .hero-visual {
      margin-top: 0;
      max-width: 400px;
    }
  }

  @media (max-width: 780px) {
    .hero-redesign { padding: 60px 0 80px; }
    
    .display-title { font-size: clamp(2.8rem, 12vw, 4rem); }

    .hero-visual {
      display: flex;
      flex-direction: column;
      height: auto;
      perspective: none;
    }

    .visual-stack {
      display: flex;
      flex-direction: column;
      gap: 32px;
      transform-style: flat;
    }

    .stack-item {
      position: relative;
      width: 100% !important;
      max-width: 100% !important;
      top: auto !important;
      bottom: auto !important;
      left: auto !important;
      right: auto !important;
      transform: none !important;
    }

    .code-window { display: none; }
  }
</style>
