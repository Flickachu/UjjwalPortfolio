<script>
  import Hero from '$lib/components/Hero.svelte';
  import PolishedHero from '$lib/components/PolishedHero.svelte';
  import AboutHero from '$lib/components/AboutHero.svelte';
  import ServicesHero from '$lib/components/ServicesHero.svelte';
  import InsightsHero from '$lib/components/InsightsHero.svelte';
  import ProblemGrid from '$lib/components/sections/ProblemGrid.svelte';
  import Approach from '$lib/components/sections/Approach.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import EditableText from './EditableText.svelte';
  import EditableImage from './EditableImage.svelte';
  import { cms } from './cms.svelte.js';

  let { sections = $bindable([]), page = "home" } = $props();
  // CMS Renderer component for modular sections

  const isAdmin = $derived(typeof window !== 'undefined' && window.location.pathname.startsWith('/admin'));

  function move(i, dir) {
    const target = i + dir;
    if (target < 0 || target >= sections.length) return;
    const temp = sections[i];
    sections[i] = sections[target];
    sections[target] = temp;
  }

  function remove(i) {
    sections.splice(i, 1);
  }
</script>

{#each sections || [] as section, i (section.id || section.type + i)}
  {@const path = `pages.${page}.sections.${i}`}
  <div class="cms-section-wrapper" id={section.id} class:cms-admin-wrapper={isAdmin}>
    {#if isAdmin}
      <div class="cms-section-controls">
        <span class="cms-section-tag">{section.type}</span>
        <div class="cms-control-btns">
          <button onclick={() => move(i, -1)} disabled={i === 0}>↑</button>
          <button onclick={() => move(i, 1)} disabled={i === sections.length - 1}>↓</button>
          <button class="cms-delete-btn" onclick={() => remove(i)}>×</button>
        </div>
      </div>
    {/if}
    {#if section.type === 'hero'}
      {#if page === 'home'}
        <Hero {...section} {path} />
      {:else if page === 'services'}
        <ServicesHero {...section} {path} />
      {:else if page === 'about'}
        <AboutHero {...section} {path} />
      {:else if page === 'insights'}
        <InsightsHero {...section} {path} />
      {:else}
        <PolishedHero {...section} {path} />
      {/if}
    
    {:else if section.type === 'logo-strip'}
      <section class="logo-strip">
        <div class="section-shell logo-track">
          <span class="trust-label">TRUSTED BY FOUNDERS & TEAMS ACROSS</span>
          <div class="logos">
            {#each section.items || [] as item, j (item + j)}
              {#if isAdmin}
                <EditableText path="{path}.items.{j}" />
              {:else}
                <span>{item}</span>
              {/if}
            {/each}
            <div class="status-dot"></div>
          </div>
        </div>
      </section>

    {:else if section.type === 'problem-grid'}
      <ProblemGrid {...section} {path} />

    {:else if section.type === 'awards'}
      <section class="awards-section">
        <div class="section-shell awards-grid">
          {#each section.items || [] as award, j (award.title || j)}
            <div class="award-card" class:main-award={j === 0}>
              {#if isAdmin}
                <EditableText path="{path}.items.{j}.label" />
                <EditableText path="{path}.items.{j}.title" element="strong" />
              {:else}
                <span>{award.label}</span>
                <strong>{award.title}</strong>
              {/if}
            </div>
          {/each}
        </div>
      </section>

    {:else if section.type === 'services'}
      <section class="section-band services-section">
        <div class="section-shell">
          <div class="section-heading">
            <div>
              {#if isAdmin}
                <EditableText path="{path}.eyebrow" classes="eyebrow" />
                <EditableText path="{path}.title" element="h2" classes="section-title" />
              {:else}
                <span class="eyebrow">{section.eyebrow}</span>
                <h2 class="section-title">{@html (section.title || "").replace('ZERO GUESSWORK.', '<span class="highlight-bg">ZERO GUESSWORK.</span>')}</h2>
              {/if}
            </div>
            {#if isAdmin}
              <EditableText path="{path}.lead" element="p" classes="lead" />
            {:else}
              <p class="lead">{section.lead}</p>
            {/if}
          </div>

          <div class="services-grid">
            {#each section.items || [] as service, index (service.title || index)}
              <article>
                <div class="service-header">
                   <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                {#if isAdmin}
                  <EditableText path="{path}.items.{index}.title" element="h3" />
                  <EditableText path="{path}.items.{index}.text" element="p" />
                {:else}
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                {/if}
              </article>
            {/each}
          </div>
        </div>
      </section>

    {:else if section.type === 'work-grid'}
      <section class="section-band work-section" id="work">
        <div class="section-shell">
          <div class="work-header">
            {#if isAdmin}
              <EditableText path="{path}.eyebrow" classes="eyebrow" />
            {:else}
              <span class="eyebrow">{section.eyebrow || '03 / SELECTED WORK'}</span>
            {/if}
            <div class="work-title-row">
              {#if isAdmin}
                <EditableText path="{path}.title" element="h2" classes="section-title" />
              {:else}
                <h2 class="section-title">{@html (section.title || "WEBSITES THAT <br/> DRIVE REAL RESULTS.").replace('RESULTS.', '<span class="highlight">RESULTS.</span>')}</h2>
              {/if}
              <a href="/projects" class="view-all">VIEW ALL WORK <span>→</span></a>
            </div>
          </div>

          <div class="work-grid">
            {#each section.projects || [] as project, index (project.slug || index)}
              <ProjectCard {project} index={index} />
            {/each}
          </div>
        </div>
      </section>

    {:else if section.type === 'benefits'}
      <section class="section-band benefits-section">
        <div class="section-shell benefits-grid">
          <div>
            {#if isAdmin}
              <EditableText path="{path}.eyebrow" classes="eyebrow" />
              <EditableText path="{path}.title" element="h2" classes="section-title" />
            {:else}
              <span class="eyebrow">{section.eyebrow}</span>
              <h2 class="section-title">{section.title}</h2>
            {/if}
          </div>

          <div class="benefit-list">
            {#each section.items || [] as benefit, j (benefit + j)}
              <div>
                {#if isAdmin}
                  <EditableText path="{path}.items.{j}" />
                {:else}
                  {benefit}
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </section>

    {:else if section.type === 'approach'}
      <Approach {...section} {path} />

    {:else if section.type === 'testimonials'}
      <section class="section-band testimonials-section">
        <div class="section-shell">
          <div class="section-heading">
            <div>
              {#if isAdmin}
                <EditableText path="{path}.eyebrow" classes="eyebrow" />
                <EditableText path="{path}.title" element="h2" classes="display-title highlight-text" />
              {:else}
                <span class="eyebrow">{section.eyebrow || '04 / CLIENT LOVE'}</span>
                <h2 class="display-title highlight-text">{@html (section.title || "KIND WORDS. <br/> REAL IMPACT.").replace('IMPACT.', '<span class="highlight">IMPACT.</span>')}</h2>
              {/if}
            </div>
          </div>

          <div class="testimonial-grid">
            {#each section.items || [] as testimonial, j (testimonial.name + j)}
              <div class="testimonial-card">
                <svg class="quote-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11H6C4.89543 11 4 10.1046 4 9V7C4 5.89543 4.89543 5 6 5H8C9.10457 5 10 5.89543 10 7V11ZM10 11C10 12.1046 9.10457 13 8 13H6M20 11H16C14.8954 11 14 10.1046 14 9V7C14 5.89543 14.8954 5 16 5H18C19.1046 5 20 5.89543 20 7V11ZM20 11C20 12.1046 19.1046 13 18 13H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                {#if isAdmin}
                  <EditableText path="{path}.items.{j}.quote" element="p" classes="quote-text" />
                  <div class="author-info">
                    <div class="avatar"></div>
                    <div class="author-meta">
                       <EditableText path="{path}.items.{j}.name" element="cite" />
                    </div>
                  </div>
                {:else}
                  <p class="quote-text">"{testimonial.quote}"</p>
                  <div class="author-info">
                    {#if testimonial.avatar}
                      <img class="avatar" src={testimonial.avatar} alt={testimonial.name} />
                    {:else}
                      <div class="avatar"></div>
                    {/if}
                    <div class="author-meta">
                       <cite>{testimonial.name}</cite>
                       {#if testimonial.role}
                         <span class="role">{testimonial.role}</span>
                       {/if}
                    </div>
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </section>

    {:else if section.type === 'closing'}
      <section class="section-band closing-section">
        <div class="section-shell closing-shell">
          <div class="faq-column">
             {#if isAdmin}
               <EditableText path="{path}.faqEyebrow" classes="eyebrow" />
               <EditableText path="{path}.faqTitle" element="h2" classes="display-title small" />
             {:else}
               <span class="eyebrow">{section.eyebrow || '05 / FAQ'}</span>
               <h2 class="display-title small">{@html (section.faqTitle || "QUESTIONS? <br/> WE'VE GOT ANSWERS.").replace('ANSWERS.', '<span class="highlight">ANSWERS.</span>')}</h2>
             {/if}
             
             <div class="faq-list">
               {#each section.faqs || [] as faq, j (faq.q + j)}
                 <details>
                   <summary>
                     {#if isAdmin}
                        <EditableText path="{path}.faqs.{j}.q" />
                     {:else}
                        {faq.q}
                     {/if}
                     <span class="plus">+</span>
                   </summary>
                   {#if isAdmin}
                      <EditableText path="{path}.faqs.{j}.a" element="p" />
                   {:else}
                      <p>{faq.a}</p>
                   {#if j < (section.faqs?.length || 0) - 1}
                     <div class="divider"></div>
                   {/if}
                   {/if}
                 </details>
               {/each}
             </div>
          </div>

          <div class="cta-column">
            <div class="cta-box">
              <div class="cta-content">
                <span class="eyebrow-dark">{section.ctaEyebrow || "LET'S BUILD SOMETHING GREAT"}</span>
                <h2 class="cta-title">{@html (section.title || "READY FOR A WEBSITE <br/> THAT ACTUALLY BRINGS <br/> IN CLIENTS?").toUpperCase()}</h2>
                <p>{section.lead || "Book a free strategy call and let's map out your next high-performing website."}</p>
                <div class="cta-actions">
                  <a href="/contact" class="btn btn-primary cta-btn">
                    {section.cta || "BOOK A FREE CALL"} <span>→</span>
                  </a>
                  <button class="btn-text-dark">VIEW WORK <span>→</span></button>
                </div>
              </div>
              <div class="cta-star-wrapper">
                <svg viewBox="0 0 100 100" class="cta-star-icon">
                  <path d="M50 0L55 35L90 40L60 50L70 85L50 65L30 85L40 50L10 40L45 35Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    {/if}
  </div>
{/each}

<style>
  .logo-strip {
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    padding: 24px 0;
    background: var(--bg);
  }

  .logo-track {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .trust-label {
    font-size: 0.6rem;
    font-weight: 900;
    color: var(--muted);
    letter-spacing: 0.1em;
  }

  .logos {
    display: flex;
    gap: 48px;
    align-items: center;
  }

  .logos span {
    font-size: 0.75rem;
    font-weight: 950;
    color: var(--ink);
    letter-spacing: 0.1em;
    opacity: 0.8;
  }

  .section-heading {
    margin-bottom: 80px;
  }

  .testimonial-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 40px;
    border-top: 1px solid var(--line);
    padding-top: 40px;
  }

  .services-grid article {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .service-header {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    font-weight: 900;
    color: var(--muted);
  }

  .service-header span:first-child { color: var(--ink); }

  .services-grid h3 {
    margin: 0;
    font-size: 0.8rem;
    line-height: 1.2;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .services-grid p {
    margin: 0;
    color: var(--muted);
    line-height: 1.4;
    font-size: 0.85rem;
  }

  .work-header {
    margin-bottom: 80px;
  }

  .work-title-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .work-title-row .section-title {
    font-size: clamp(2rem, 5vw, 4rem);
    line-height: 0.9;
    letter-spacing: -0.06em;
  }

  .view-all {
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    color: var(--ink);
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .work-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .testimonials-section {
    background: #0D0D0D;
    color: white;
    padding: 140px 0;
  }

  .testimonial-card {
    background: #161616;
    padding: 40px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    border: 1px solid rgba(255,255,255,0.05);
  }

  .quote-icon { color: var(--accent); opacity: 0.6; }

  .quote-text {
    font-size: 1.1rem;
    line-height: 1.5;
    color: rgba(255,255,255,0.8);
    margin: 0;
  }

  .author-info {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #333;
  }

  cite {
    font-style: normal;
    font-weight: 900;
    font-size: 0.7rem;
    text-transform: uppercase;
    color: white;
    letter-spacing: 0.05em;
  }

  .author-meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .role {
    font-size: 0.6rem;
    color: var(--muted);
  }

  .closing-section {
    padding: 140px 0;
  }

  .closing-shell {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 100px;
    align-items: start;
  }

  .display-title.small {
    font-size: clamp(2rem, 4vw, 3.2rem);
    margin-bottom: 48px;
    line-height: 0.9;
    letter-spacing: -0.05em;
  }

  .faq-list { border-top: 1px solid var(--line); }

  details { border-bottom: 1px solid var(--line); padding: 32px 0; }

  summary {
    list-style: none;
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    font-weight: 900;
    cursor: pointer;
    text-transform: uppercase;
  }

  summary::-webkit-details-marker { display: none; }

  .cta-box {
    background: var(--accent);
    color: black;
    padding: 80px;
    border-radius: 2px;
    position: relative;
    overflow: hidden;
  }

  .eyebrow-dark {
    font-size: 0.65rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    color: black;
    margin-bottom: 24px;
    display: block;
  }

  .cta-title {
    font-size: 2.8rem;
    line-height: 0.9;
    font-weight: 900;
    letter-spacing: -0.05em;
    margin-bottom: 24px;
  }

  .cta-box p {
    font-size: 1rem;
    line-height: 1.5;
    max-width: 380px;
    margin-bottom: 40px;
    font-weight: 700;
  }

  .cta-btn {
    background: black;
    color: white;
    height: 60px;
    padding: 0 32px;
    font-size: 0.8rem;
    gap: 12px;
  }

  .btn-text-dark {
    background: none;
    border: none;
    font-weight: 900;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 2px solid black;
    padding-bottom: 4px;
  }

  .cta-star-wrapper {
    position: absolute;
    top: 40px;
    right: 40px;
    width: 60px;
    height: 60px;
  }

  .cta-star-icon { color: black; }

  @media (max-width: 1100px) {
    .closing-shell, .work-title-row { grid-template-columns: 1fr; gap: 40px; }
    .work-grid, .services-grid, .testimonial-grid { grid-template-columns: 1fr 1fr; }
  }

  @media (max-width: 600px) {
    .work-grid, .services-grid, .testimonial-grid { grid-template-columns: 1fr; }
    .cta-box { padding: 40px; }
    .cta-title { font-size: 2rem; }
  }

  .cms-admin-wrapper {
    position: relative;
    border: 1px dashed rgba(217, 255, 0, 0.3);
    margin: 10px 0;
  }

  .cms-admin-wrapper:hover {
    border-color: var(--accent);
    background: rgba(217, 255, 0, 0.02);
  }

  .cms-section-controls {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--ink);
    padding: 6px 12px;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    opacity: 0.3;
    transition: opacity 0.2s;
  }

  .cms-admin-wrapper:hover .cms-section-controls {
    opacity: 1;
  }

  .cms-section-tag {
    font-size: 0.65rem;
    font-weight: 900;
    text-transform: uppercase;
    color: var(--accent);
    letter-spacing: 0.1em;
  }

  .cms-control-btns {
    display: flex;
    gap: 4px;
  }

  .cms-control-btns button {
    width: 24px;
    height: 24px;
    background: rgba(255,255,255,0.1);
    border: none;
    color: white;
    border-radius: 2px;
    cursor: pointer;
    font-size: 0.8rem;
    display: grid;
    place-items: center;
  }

  .cms-control-btns button:hover:not(:disabled) {
    background: var(--accent);
    color: black;
  }

  .cms-control-btns button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .cms-control-btns .cms-delete-btn:hover {
    background: #ff4444;
    color: white;
  }
</style>
