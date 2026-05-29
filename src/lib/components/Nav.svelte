<script>
  import { page } from '$app/stores';
  import { cms } from '$lib/cms/cms.svelte.js';
  import EditableText from '$lib/cms/EditableText.svelte';

  const isAdmin = $derived(typeof window !== 'undefined' && window.location.pathname.startsWith('/admin'));
  
  let links = $derived(cms.data?.site?.navLinks || [
    { label: 'Work', href: '/#work' },
    { label: 'Services', href: '/#services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ]);
</script>

<nav class="main-nav">
  <div class="section-shell nav-inner">
    <a href="/" class="logo" aria-label="Home">
      <div class="logo-box">
        <img src={cms.data?.site?.logo || '/favicon.svg'} alt="Logo" width="38" height="38" />
      </div>
      <div class="logo-text">
        {#if isAdmin}
          <EditableText path="site.title" element="strong" />
          <span>WEB STRATEGY STUDIO</span>
        {:else}
          <strong>{cms.data?.site?.title || 'UJJWAL SAIKIA'}</strong>
          <span>WEB STRATEGY STUDIO</span>
        {/if}
      </div>
    </a>

    <div class="nav-links">
      {#each links as link, i}
        {#if isAdmin}
          <EditableText path="site.navLinks.{i}.label" element="span" classes="nav-edit" />
        {:else}
          <a href={link.href} class:active={$page.url.pathname === link.href}>{link.label}</a>
        {/if}
      {/each}
    </div>

    {#if isAdmin}
      <div class="nav-cta-edit">
        <EditableText path="site.ctaText" classes="btn btn-primary nav-cta" />
      </div>
    {:else}
      <a href="/contact" class="btn btn-primary nav-cta">
        {cms.data?.site?.ctaText || 'BOOK A STRATEGY CALL'}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    {/if}
  </div>
</nav>

<style>
  .main-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--bg);
    border-bottom: 1px solid var(--line);
    min-height: 80px;
    display: flex;
    align-items: center;
  }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .logo-box {
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .logo-box img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .logo-text {
    display: flex;
    flex-direction: column;
    line-height: 1;
  }

  .logo-text strong {
    font-size: 0.8rem;
    letter-spacing: 0.02em;
    font-family: var(--font-display);
    font-weight: 900;
  }

  .logo-text span {
    font-size: 0.6rem;
    color: var(--muted);
    margin-top: 4px;
    letter-spacing: 0.05em;
    font-weight: 700;
  }

  .nav-links {
    display: flex;
    gap: 40px;
    align-items: center;
  }

  .nav-links :global(.nav-edit), .nav-links a {
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--ink);
  }

  .nav-links a:hover, .nav-links a.active {
    color: var(--ink);
    opacity: 0.5;
  }

  .nav-cta {
    height: 42px;
    padding: 0 20px;
    font-size: 0.75rem;
    gap: 10px;
    display: flex;
    align-items: center;
  }

  .nav-cta-edit {
    display: flex;
    align-items: center;
  }

  @media (max-width: 900px) {
    .nav-links {
      display: none;
    }
  }
</style>
