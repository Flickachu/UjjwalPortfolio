<script>
  let { project, index } = $props();
</script>

<article class="work-card" style="--delay: {index * 0.1}s">
  <div class="card-visual">
    <img src={project.image} alt={project.description ? `${project.title}: ${project.description}` : `Project image for ${project.title}`} />
    <div class="card-overlay always-visible">
      <div class="overlay-top">
        <span class="number">{String(index + 1).padStart(2, '0')} — {project.title}</span>
      </div>
      <div class="overlay-content">
        <h3>{project.description}</h3>
      </div>
      <a href={project.link || `/projects/${project.slug}`} target={project.link ? '_blank' : null} rel={project.link ? 'noopener noreferrer' : null} class="overlay-arrow" aria-label="View Project">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>
        </svg>
      </a>
    </div>
  </div>
  
  <div class="card-footer">
    <div class="footer-copy">
      <strong>{project.client || project.title}</strong>
      <span>{project.clientDesc || project.description}</span>
      <div class="card-metrics-bottom">
        {#each project.tags || [] as tag}
          <span>{tag}</span>
        {/each}
      </div>
    </div>
  </div>
</article>

<style>
  .work-card {
    display: flex;
    flex-direction: column;
    gap: 16px;
    opacity: 0;
    transform: translateY(20px);
    animation: fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: var(--delay);
  }

  @keyframes fade-up {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .card-visual {
    position: relative;
    aspect-ratio: 16 / 11;
    background: #111;
    border-radius: 2px;
    overflow: hidden;
  }

  .card-visual img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.8) brightness(0.9);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .card-overlay {
    position: absolute;
    inset: 0;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.8) 100%);
    color: white;
    transition: all 0.4s;
  }

  .work-card:hover img {
    transform: scale(1.05);
    filter: saturate(1.2) brightness(0.6);
  }

  .number {
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: white;
    text-transform: uppercase;
  }

  .overlay-content h3 {
    font-size: 1.8rem;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin-bottom: 20px;
    font-weight: 400;
    max-width: 90%;
  }

  .overlay-arrow {
    position: absolute;
    bottom: 32px;
    right: 32px;
    width: 44px;
    height: 44px;
    border: 1px solid rgba(255,255,255,0.3);
    display: grid;
    place-items: center;
    color: white;
    transition: all 0.3s;
  }

  .work-card:hover .overlay-arrow {
    background: white;
    color: black;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .footer-copy {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
  }

  .footer-copy strong {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 900;
    color: var(--ink);
  }

  .footer-copy span {
    font-size: 0.75rem;
    color: var(--muted);
  }

  .card-metrics-bottom {
    display: flex;
    gap: 16px;
    margin-top: 12px;
  }

  .card-metrics-bottom span {
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 900;
    color: var(--ink);
  }
</style>
