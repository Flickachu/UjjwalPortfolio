<script>
  import { cms } from '$lib/cms/cms.svelte.js';
  import EditableText from '$lib/cms/EditableText.svelte';

  const isAdmin = $derived(typeof window !== 'undefined' && window.location.pathname.startsWith('/admin'));
</script>

<footer class="main-footer">
  <div class="section-shell">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="f-logo">
          <img src={cms.data?.site?.logo || '/favicon.svg'} alt="Logo" width="38" height="38" />
        </div>
        <p class="f-copyright">
          © {new Date().getFullYear()} 
          {#if isAdmin}
            <EditableText path="footer.bottomText" />
          {:else}
            {cms.data?.footer?.bottomText || 'Ujjwal Saikia.'}
          {/if}
          <br/>
          All rights reserved.
        </p>
      </div>

      <div class="footer-mission">
        {#if isAdmin}
          <EditableText path="footer.heading" element="p" />
        {:else}
          <p>{cms.data?.footer?.heading || 'Sharp websites. Calm systems. Measurable outcomes.'}</p>
        {/if}
      </div>

      <div class="footer-links">
        {#each cms.data?.footer?.socials || [] as social, i}
          {#if isAdmin}
            <EditableText path="footer.socials.{i}.label" element="span" classes="f-social-edit" />
          {:else}
            <a href={social.url} target="_blank" rel="noopener noreferrer">{social.label.toUpperCase()}</a>
          {/if}
        {/each}
      </div>

      <div class="footer-contact">
        {#if isAdmin}
          <EditableText path="footer.email" classes="f-email" />
        {:else}
          <a href="mailto:{cms.data?.footer?.email}" class="f-email">{cms.data?.footer?.email || 'ujjwalsaikia@outlook.in'}</a>
        {/if}
      </div>
    </div>
  </div>
</footer>

<style>
  .main-footer {
    padding: 40px 0;
    background: var(--bg);
    border-top: 1px solid var(--line);
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr;
    gap: 32px;
    align-items: center;
  }

  .f-logo {
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .f-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .f-copyright {
    font-size: 0.65rem;
    line-height: 1.5;
    color: var(--muted);
    font-weight: 700;
  }

  .footer-mission p {
    font-size: 0.7rem;
    line-height: 1.5;
    font-weight: 800;
    color: var(--ink);
    max-width: 180px;
  }

  .footer-links {
    display: flex;
    gap: 32px;
  }

  .footer-links a, :global(.f-social-edit) {
    font-size: 0.65rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    color: var(--ink);
    text-transform: uppercase;
  }

  .footer-contact {
    text-align: right;
  }

  .f-email {
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 0.02em;
  }

  @media (max-width: 1000px) {
    .footer-grid { grid-template-columns: repeat(2, 1fr); gap: 48px; }
    .footer-contact { text-align: left; }
  }

  @media (max-width: 600px) {
    .footer-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 900px) {
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .footer-contact { text-align: left; }
  }

  @media (max-width: 600px) {
    .footer-grid { grid-template-columns: 1fr; }
  }
</style>
