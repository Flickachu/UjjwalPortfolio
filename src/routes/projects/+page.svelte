<script>
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { cms } from '$lib/cms/cms.svelte.js';
  import CmsRenderer from '$lib/cms/CmsRenderer.svelte';
  import SEO from '$lib/components/SEO.svelte';

  let projects = $derived(cms.data?.projects || []);
</script>

<SEO 
  title={cms.data?.pages?.projects?.seo?.title || 'Projects'}
  description={cms.data?.pages?.projects?.seo?.description}
/>

<main>
  {#if cms.data?.pages?.projects}
    <CmsRenderer sections={cms.data.pages.projects.sections} page="projects" />
  {/if}

  <section class="section-band projects-list-section">
    <div class="section-shell">
      <div class="projects-grid">
        {#each projects as project, i (project.slug || i)}
          <ProjectCard {project} index={i} />
        {:else}
          <div class="cms-placeholder">No projects found.</div>
        {/each}
      </div>
    </div>
  </section>
</main>

<style>
  .projects-list-section {
    padding-bottom: 120px;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 42px;
  }

  @media (max-width: 1000px) {
    .projects-grid { grid-template-columns: 1fr 1fr; }
  }

  @media (max-width: 600px) {
    .projects-grid { grid-template-columns: 1fr; }
  }
</style>
