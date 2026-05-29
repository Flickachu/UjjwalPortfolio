<script>
  import { enhance } from '$app/forms';

  let { form } = $props();
  let loading = $state(false);
</script>

<div class="login-wrapper">
  <div class="login-box">
    <div class="login-header">
      <div class="f-logo">
        <img src="/favicon.svg" alt="Logo" width="48" height="48" />
      </div>
      <h1>Control Panel</h1>
      <p>Please enter your password to access the CMS.</p>
    </div>

    <form method="POST" use:enhance={() => {
      loading = true;
      return async ({ update }) => {
        await update();
        loading = false;
      };
    }}>
      <div class="input-group">
        <label for="email">Admin Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          placeholder="admin@example.com"
          required
        />
      </div>

      <div class="input-group">
        <label for="password">Admin Password</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          placeholder="••••••••"
          required
        />
      </div>

      {#if form?.error}
        <p class="error-msg">{form.error}</p>
      {/if}

      <button type="submit" class="btn btn-primary" disabled={loading}>
        {loading ? 'Authenticating...' : 'Login'}
      </button>
    </form>
  </div>
</div>

<style>
  .login-wrapper {
    min-height: 100vh;
    display: grid;
    place-items: center;
    background: var(--bg);
  }

  .login-box {
    width: 100%;
    max-width: 400px;
    background: white;
    padding: 48px;
    border-radius: 8px;
    box-shadow: var(--shadow);
    border: 1px solid var(--line);
  }

  .login-header {
    text-align: center;
    margin-bottom: 32px;
  }

  .f-logo {
    width: 48px;
    height: 48px;
    margin: 0 auto 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .f-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  h1 {
    font-family: var(--font-sans);
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0 0 8px 0;
    text-transform: none;
  }

  p {
    color: var(--muted);
    font-size: 0.9rem;
    margin: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--ink);
  }

  input {
    width: 100%;
    height: 48px;
    padding: 0 16px;
    border: 1px solid var(--line-strong);
    border-radius: 4px;
    font-family: inherit;
    font-size: 1rem;
    transition: all 0.2s;
  }

  input:focus {
    outline: none;
    border-color: var(--ink);
    box-shadow: 0 0 0 1px var(--ink);
  }

  .btn {
    width: 100%;
  }

  .error-msg {
    color: #e53e3e;
    font-size: 0.85rem;
    font-weight: 500;
    margin: -8px 0 0 0;
    text-align: center;
  }
</style>
