<script>
  import { cms } from '$lib/cms/cms.svelte.js';
  import CmsRenderer from '$lib/cms/CmsRenderer.svelte';
  import Nav from '$lib/components/Nav.svelte';
  import EditableText from '$lib/cms/EditableText.svelte';
  import EditableImage from '$lib/cms/EditableImage.svelte';
  import { fly, fade } from 'svelte/transition';

  let activeTab = $state('home');
  let viewMode = $state('editor'); // 'editor' | 'preview'
  let saving = $state(false);
  let status = $state('');

  async function handleSave() {
    saving = true;
    status = 'Saving...';
    const success = await cms.save();
    saving = false;
    status = success ? 'Changes published!' : 'Save failed.';
    setTimeout(() => { status = ''; }, 3000);
  }

  function addSection() {
    const page = activeTab;
    if (!cms.data.pages[page]) return;
    cms.data.pages[page].sections.push({
      type: 'hero',
      id: `section-${Date.now()}`,
      eyebrow: 'NEW SECTION',
      title: 'New Section Title',
      lead: 'New lead text',
      cta: 'LEARN MORE',
      features: []
    });
  }



  function addProject() {
    cms.data.projects.push({
      slug: 'new-project',
      title: 'Untitled Project',
      description: 'Project description...',
      link: '',
      tags: ['SvelteKit', 'UI/UX'],
      content: '<p>Project content...</p>',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1400',
      date: new Date().toISOString().split('T')[0]
    });
  }
</script>

<svelte:head>
  <title>Advanced CMS - Svelte 5 Runes</title>
</svelte:head>

<div class="cms-dashboard">
  <!-- Admin Sidebar -->
  <aside class="cms-sidebar">
    <div class="cms-sidebar-header">
      <div class="cms-logo">Control Panel</div>
      <p>Modular CMS v2.0 (Runes)</p>
    </div>

    <nav class="cms-nav">
      <div class="cms-nav-group">Pages</div>
      <button class:active={activeTab === 'home'} onclick={() => activeTab = 'home'}>Home</button>
      <button class:active={activeTab === 'services'} onclick={() => activeTab = 'services'}>Services</button>
      <button class:active={activeTab === 'about'} onclick={() => activeTab = 'about'}>About</button>
      <button class:active={activeTab === 'contact'} onclick={() => activeTab = 'contact'}>Contact</button>
      <button class:active={activeTab === 'projects-page'} onclick={() => activeTab = 'projects-page'}>Projects</button>
      
      <div class="cms-nav-group">Content</div>
      <button class:active={activeTab === 'header'} onclick={() => activeTab = 'header'}>Header</button>
      <button class:active={activeTab === 'projects'} onclick={() => activeTab = 'projects'}>Projects ({cms.data?.projects?.length || 0})</button>
      <button class:active={activeTab === 'footer'} onclick={() => activeTab = 'footer'}>Footer</button>
      
      <div class="cms-nav-group">Config</div>
      <button class:active={activeTab === 'site'} onclick={() => activeTab = 'site'}>Site Settings</button>
      <button class:active={activeTab === 'seo'} onclick={() => activeTab = 'seo'}>SEO & Meta</button>
    </nav>

    <div class="cms-sidebar-footer">
      <button class="btn btn-primary cms-save-btn" onclick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : 'Publish Site'}
      </button>
      {#if status}
        <p class="cms-status" in:fade>{status}</p>
      {/if}
    </div>
  </aside>

  <!-- Live Editor View -->
  <main class="cms-main">
    <div class="cms-top-bar">
      <div class="cms-tab-info">
        <h2>Editing: <span class="capitalize">{activeTab}</span></h2>
      </div>
      <div class="cms-view-toggle">
        <button class:active={viewMode === 'editor'} onclick={() => viewMode = 'editor'}>Editor View</button>
        <button class:active={viewMode === 'preview'} onclick={() => viewMode = 'preview'}>Preview View</button>
      </div>
    </div>

    <div class="cms-preview-frame">
      {#if activeTab === 'header'}
         <div class="cms-header-editor">
            <div class="panel">
              <h3>Site Branding</h3>
              <label>
                <span>Site Display Name</span>
                <EditableText path="site.title" />
              </label>
              <label>
                <span>Logo Initials</span>
                <EditableText path="site.logo" />
              </label>
              <label>
                <span>CTA Button Text</span>
                <EditableText path="site.ctaText" />
              </label>
            </div>
            
            <div class="panel">
              <div class="panel-header">
                <h3>Navigation Links</h3>
                <button class="btn" onclick={() => cms.data.site.navLinks.push({ label: 'New Link', href: '/' })}>+ Add Link</button>
              </div>
              <div class="nav-links-grid">
                {#each cms.data.site.navLinks as link, i}
                  <div class="nav-link-edit-row">
                    <div class="edit-col">
                      <span>Label</span>
                      <EditableText path="site.navLinks.{i}.label" />
                    </div>
                    <div class="edit-col">
                      <span>URL / Hash</span>
                      <EditableText path="site.navLinks.{i}.href" />
                    </div>
                    <button class="btn danger" onclick={() => cms.data.site.navLinks.splice(i, 1)}>×</button>
                  </div>
                {/each}
              </div>
            </div>
         </div>
      {:else if activeTab === 'projects'}
         <div class="cms-blog-manager">
            <div class="manager-header">
              <h2>Manage Projects</h2>
              <button class="btn btn-primary" onclick={addProject}>+ New Project</button>
            </div>
            <div class="blog-list">
              {#each cms.data?.projects || [] as project, i (project.slug || i)}
                <div class="blog-item panel">
                  <div class="blog-info">
                    <EditableText path="projects.{i}.title" element="h3" />
                    <p>{project?.slug || 'no-slug'}</p>
                  </div>
                  <div class="blog-item-actions">
                    <button class="btn" onclick={() => alert('Edit via block editor coming soon')}>Edit Content</button>
                    <button class="btn danger" onclick={() => { cms.data.projects.splice(i, 1); }}>Delete</button>
                  </div>
                </div>
              {/each}
            </div>
         </div>
      {:else if activeTab === 'footer'}
         <div class="cms-footer-editor">
            <div class="panel">
              <h3>Footer Branding</h3>
              <label>
                <span>Heading</span>
                <EditableText path="footer.heading" element="h2" />
              </label>
              <label>
                <span>Contact Email</span>
                <EditableText path="footer.email" />
              </label>
              <label>
                <span>Bottom Copy</span>
                <EditableText path="footer.bottomText" />
              </label>
            </div>
         </div>
      {:else if activeTab === 'site'}
         <div class="cms-settings-grid">
            <div class="panel">
              <h3>Brand Identity</h3>
              <label>
                <span>Site Title</span>
                <EditableText path="site.title" />
              </label>
              <label>
                <span>Site Logo</span>
                <EditableText path="site.logo" />
              </label>
              <label>
                <span>Favicon URL</span>
                <EditableText path="site.favicon" />
              </label>
            </div>
            <div class="panel">
              <h3>Theme</h3>
              <label>
                <span>Accent Color</span>
                <input type="color" bind:value={cms.data.site.accentColor} />
              </label>
            </div>
         </div>
      {:else if activeTab === 'seo'}
         <div class="cms-seo-editor">
            <div class="panel">
              <h3>Homepage Metadata</h3>
              <label>
                <span>SEO Title</span>
                <EditableText path="pages.home.seo.title" />
              </label>
              <label>
                <span>SEO Description</span>
                <EditableText path="pages.home.seo.description" element="p" />
              </label>
            </div>
         </div>
      {:else if cms.data?.pages[activeTab === 'projects-page' ? 'projects' : activeTab]}
        <div class="cms-live-page">
          {#if viewMode === 'preview'}
            <iframe src={activeTab === 'home' ? '/' : activeTab === 'about' ? '/about' : activeTab === 'contact' ? '/contact' : activeTab === 'blog' ? '/blog' : activeTab === 'projects-page' ? '/projects' : '/'} title="Site Preview" class="cms-preview-iframe"></iframe>
          {:else}
            <div class="admin-nav-wrapper">
              <Nav />
            </div>
            <CmsRenderer bind:sections={cms.data.pages[activeTab === 'projects-page' ? 'projects' : activeTab].sections} page={activeTab === 'projects-page' ? 'projects' : activeTab} />
            <div class="cms-admin-controls-overlay">
              <button class="btn btn-primary" onclick={addSection}>+ Add Section to {activeTab}</button>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </main>
</div>

<style>
  :global(body) {
    background: #0a0a0c;
    margin: 0;
    overflow: hidden;
  }

  .cms-dashboard {
    display: grid;
    grid-template-columns: 280px 1fr;
    height: 100vh;
    color: white;
    font-family: Inter, sans-serif;
  }

  .cms-sidebar {
    background: #111114;
    border-right: 1px solid rgba(255,255,255,0.05);
    display: flex;
    flex-direction: column;
    padding: 24px;
    z-index: 100;
  }

  .cms-sidebar-header {
    margin-bottom: 40px;
  }

  .cms-logo {
    font-size: 1.2rem;
    font-weight: 900;
    letter-spacing: -0.02em;
    color: var(--accent);
  }

  .cms-sidebar-header p {
    font-size: 0.65rem;
    color: #666;
    margin-top: 4px;
    font-weight: 700;
  }

  .cms-nav {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .cms-nav-group {
    font-size: 0.6rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #444;
    margin: 20px 0 8px;
  }

  .cms-nav button {
    background: none;
    border: none;
    color: #999;
    text-align: left;
    padding: 10px 14px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.2s;
  }

  .cms-nav button:hover {
    background: rgba(255,255,255,0.05);
    color: white;
  }

  .cms-nav button.active {
    background: var(--accent);
    color: black;
  }

  .cms-sidebar-footer {
    margin-top: auto;
    padding-top: 24px;
    border-top: 1px solid rgba(255,255,255,0.05);
  }

  .cms-save-btn {
    width: 100%;
    padding: 14px;
    font-weight: 800;
    font-size: 0.8rem;
  }

  .cms-status {
    font-size: 0.7rem;
    text-align: center;
    margin-top: 12px;
    color: var(--accent);
  }

  .cms-main {
    display: flex;
    flex-direction: column;
    background: #0a0a0c;
  }

  .cms-top-bar {
    height: 72px;
    background: #111114;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
  }

  .cms-tab-info h2 {
    font-size: 0.9rem;
    font-weight: 700;
    color: #999;
  }

  .cms-tab-info h2 span {
    color: white;
  }

  .cms-view-toggle {
    display: flex;
    background: rgba(255,255,255,0.05);
    padding: 4px;
    border-radius: 8px;
  }

  .cms-view-toggle button {
    background: none;
    border: none;
    color: #666;
    padding: 8px 16px;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    border-radius: 6px;
  }

  .cms-view-toggle button.active {
    background: rgba(255,255,255,0.1);
    color: white;
  }

  .cms-preview-frame {
    flex: 1;
    overflow-y: auto;
    position: relative;
    background: #16161a;
  }

  .cms-preview-iframe {
    width: 100%;
    height: 100%;
    border: none;
    background: white;
  }

  .cms-live-page {
    background: white;
    color: black;
    min-height: 100%;
    position: relative;
  }

  .cms-admin-controls-overlay {
    padding: 40px;
    display: flex;
    justify-content: center;
    background: #f9f9f9;
  }

  .admin-nav-wrapper {
    background: #f4f4f4;
    padding: 10px;
    border-bottom: 2px solid var(--accent);
    margin-bottom: 20px;
  }

  .panel {
    background: #1c1c21;
    border: 1px solid rgba(255,255,255,0.05);
    padding: 32px;
    border-radius: 12px;
    margin: 32px;
  }

  .panel h3 {
    margin-bottom: 24px;
    font-size: 1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 24px;
  }

  label span {
    font-size: 0.65rem;
    font-weight: 800;
    text-transform: uppercase;
    color: #666;
  }

  .cms-blog-manager {
    padding: 32px;
  }

  .manager-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  }

  .blog-list {
    display: grid;
    gap: 16px;
  }

  .blog-item {
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .blog-info :global(h3) {
    margin: 0;
  }

  .blog-info p {
    font-size: 0.75rem;
    color: #666;
  }

  .blog-item-actions {
    display: flex;
    gap: 12px;
  }

  .capitalize {
    text-transform: capitalize;
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .nav-links-grid {
    display: grid;
    gap: 16px;
  }

  .nav-link-edit-row {
    display: grid;
    grid-template-columns: 1fr 1fr 40px;
    gap: 16px;
    align-items: end;
    background: rgba(255,255,255,0.02);
    padding: 16px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.05);
  }

  .edit-col {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .edit-col span {
    font-size: 0.6rem;
    font-weight: 800;
    text-transform: uppercase;
    color: #444;
  }
</style>
