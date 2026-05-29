<script>
  export let data;
  const { project } = data;
</script>

<svelte:head>
  <title>{project.title} - Ujjwal Saikia</title>
  <meta name="description" content={project.description} />
  <meta property="og:title" content={project.title} />
  <meta property="og:description" content={project.description} />
  {#if project.image}
    <meta property="og:image" content={project.image} />
  {/if}
</svelte:head>

<article class="project-detail">
  <div class="section-shell detail-hero">
    <a class="back-link" href="/projects">Back to work</a>
    <div class="detail-heading">
      <div>
        <p class="eyebrow">Case study</p>
        <h1 class="display-title">{project.title}</h1>
      </div>
      <p class="lead">{project.description}</p>
    </div>
  </div>

  {#if project.image}
    <div class="section-shell hero-image">
      <img src={project.image} alt={project.title} />
    </div>
  {/if}

  <div class="section-shell detail-grid">
    <aside class="panel detail-meta">
      <div>
        <span>Date</span>
        <strong>{project.date}</strong>
      </div>
      <div>
        <span>Stack</span>
        <div class="pill-row">
          {#each project.tags as tag}
            <span class="pill">{tag}</span>
          {/each}
        </div>
      </div>
      {#if project.link}
        <a class="btn btn-primary" href={project.link} target="_blank" rel="noreferrer">Visit live</a>
      {/if}
    </aside>

    <div class="prose detail-copy">
      {@html project.content}
    </div>
  </div>
</article>

<style>
  .project-detail {
    padding-bottom: 110px;
  }

  .detail-hero {
    display: grid;
    gap: 28px;
    padding: 72px 0 34px;
  }

  .back-link {
    color: var(--muted);
    font-weight: 900;
  }

  .back-link:hover {
    color: var(--accent);
  }

  .detail-heading {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(280px, 0.58fr);
    gap: 34px;
    align-items: end;
  }

  .hero-image {
    overflow: hidden;
    border: 1px solid var(--line);
    border-radius: 8px;
    aspect-ratio: 16 / 8;
    background: #111;
    box-shadow: var(--shadow);
  }

  .hero-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .detail-grid {
    display: grid;
    grid-template-columns: 300px minmax(0, 1fr);
    gap: 36px;
    align-items: start;
    padding-top: 44px;
  }

  .detail-meta {
    position: sticky;
    top: 96px;
    display: grid;
    gap: 24px;
    padding: 22px;
  }

  .detail-meta span {
    display: block;
    margin-bottom: 8px;
    color: var(--muted);
    font-size: 0.82rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .detail-meta strong {
    font-size: 1.05rem;
  }

  .detail-copy {
    max-width: 780px;
    font-size: 1.08rem;
  }

  @media (max-width: 860px) {
    .detail-heading,
    .detail-grid {
      grid-template-columns: 1fr;
    }

    .detail-meta {
      position: static;
    }
  }

  @media (max-width: 640px) {
    .hero-image {
      aspect-ratio: 4 / 3;
    }
  }
</style>
