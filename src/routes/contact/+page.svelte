<script>
  import { cms } from '$lib/cms/cms.svelte.js';
  import CmsRenderer from '$lib/cms/CmsRenderer.svelte';

  let status = $state('idle'); // idle, sending, success, error

  /** @param {SubmitEvent} event */
  async function submit(event) {
    event.preventDefault();
    status = 'sending';
    setTimeout(() => { status = 'success'; }, 1500);
  }
</script>

<main>
  {#if cms.data?.pages?.contact}
    <CmsRenderer sections={cms.data.pages.contact.sections} page="contact" />
  {/if}

  <section class="section-band contact-form-section">
    <div class="section-shell">
      <div class="contact-grid">
        <div class="contact-info">
          <div class="direct-contact">
            <div class="c-item">
              <strong>EMAIL</strong>
              <a href="mailto:ujjwalsaikia@outlook.in">ujjwalsaikia@outlook.in</a>
            </div>
            <div class="c-item">
              <strong>SOCIAL</strong>
              <div class="s-links">
                <a href="https://linkedin.com">LinkedIn</a>
                <a href="https://twitter.com">Twitter</a>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-form-container">
          {#if status === 'success'}
            <div class="success-message">
              <h2>MESSAGE SENT.</h2>
              <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
              <button class="btn btn-primary" onclick={() => status = 'idle'}>SEND ANOTHER</button>
            </div>
          {:else}
            <form onsubmit={submit} class="contact-form">
              <div class="form-group">
                <label for="name">NAME</label>
                <input type="text" id="name" required placeholder="Your full name" />
              </div>
              <div class="form-group">
                <label for="email">EMAIL</label>
                <input type="email" id="email" required placeholder="your@email.com" />
              </div>
              <div class="form-group">
                <label for="message">MESSAGE</label>
                <textarea id="message" required rows="6" placeholder="Tell us about your project..."></textarea>
              </div>
              <button type="submit" class="btn btn-primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          {/if}
        </div>
      </div>
    </div>
  </section>
</main>

<style>
  .contact-form-section {
    padding-bottom: 120px;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 80px;
    align-items: start;
  }

  .direct-contact {
    display: grid;
    gap: 32px;
  }

  .c-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .c-item strong {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    color: var(--muted);
  }

  .c-item a {
    font-size: 1.1rem;
    font-weight: 800;
  }

  .s-links {
    display: flex;
    gap: 20px;
  }

  .contact-form {
    display: grid;
    gap: 32px;
    background: white;
    padding: 60px;
    border: 1px solid var(--line);
    border-radius: 4px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  label {
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.1em;
  }

  input, textarea {
    background: #f9f9f9;
    border: 1px solid var(--line);
    padding: 16px;
    border-radius: 2px;
    font-size: 1rem;
    font-family: inherit;
  }

  .success-message {
    padding: 80px;
    background: var(--accent);
    text-align: center;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  @media (max-width: 1000px) {
    .contact-grid { grid-template-columns: 1fr; }
  }
</style>
