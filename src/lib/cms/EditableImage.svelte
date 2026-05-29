<script>
  import { cms } from './cms.svelte.js';

  let { path, altPath = '', classes = '' } = $props();

  // Helper to get value from path
  const getValue = (data, path) => {
    if (!data || !path) return '';
    return path.split('.').reduce((acc, part) => acc && acc[part], data);
  };

  // Helper to set value in path
  const setValue = (data, path, val) => {
    if (!data || !path) return;
    const parts = path.split('.');
    const last = parts.pop();
    let target = data;
    for (const part of parts) {
      if (!target[part]) target[part] = {};
      target = target[part];
    }
    target[last] = val;
  };

  let src = $derived(getValue(cms.data, path) || '');
  let alt = $derived(altPath ? getValue(cms.data, altPath) || '' : '');
  let uploading = $state(false);

  let fileInput;

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    uploading = true;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        setValue(cms.data, path, data.url);
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed');
    } finally {
      uploading = false;
    }
  }

  function triggerUpload() {
    fileInput.click();
  }

  function handlePrompt() {
    const newSrc = prompt('Enter image URL or cancel to upload:', src);
    if (newSrc !== null && newSrc !== src) {
      setValue(cms.data, path, newSrc);
    }
  }
</script>

<div 
  class="cms-editable-image {classes}" 
  onclick={triggerUpload}
  oncontextmenu={(e) => { e.preventDefault(); handlePrompt(); }}
  onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') triggerUpload(); }}
  role="button"
  tabindex="0"
>
  <input 
    type="file" 
    accept="image/*" 
    bind:this={fileInput} 
    onchange={handleUpload} 
    style="display: none" 
  />

  {#if src}
    <img {src} {alt} class:uploading />
  {:else}
    <div class="cms-image-placeholder">
      {uploading ? 'Uploading...' : 'Click to Upload'}
    </div>
  {/if}
  
  <div class="cms-image-overlay">
    {uploading ? 'UPLOADING...' : 'CHANGE IMAGE'}
    <span class="hint">(Right click for URL)</span>
  </div>
</div>

<style>
  .cms-editable-image {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    display: block;
    width: 100%;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .uploading {
    opacity: 0.5;
    filter: blur(2px);
  }

  .cms-image-placeholder {
    aspect-ratio: 16 / 9;
    background: rgba(255,255,255,0.05);
    border: 2px dashed var(--line);
    display: grid;
    place-items: center;
    color: var(--muted);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 900;
  }

  .cms-image-overlay {
    position: absolute;
    inset: 0;
    background: rgba(196, 181, 253, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    opacity: 0;
    transition: opacity 0.2s;
    color: white;
    font-weight: 900;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    backdrop-filter: blur(8px);
  }

  .hint {
    font-size: 0.6rem;
    opacity: 0.8;
    font-weight: 500;
  }

  .cms-editable-image:hover .cms-image-overlay {
    opacity: 1;
  }
</style>
