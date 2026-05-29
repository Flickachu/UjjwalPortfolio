<script>
  import { cms } from './cms.svelte.js';

  let { path, element = 'span', classes = '', multiline = false } = $props();

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

  let value = $derived(getValue(cms.data, path) || '');
  let editing = $state(false);

  function handleBlur(e) {
    editing = false;
    const newVal = multiline ? e.target.innerHTML : e.target.innerText;
    if (newVal !== value) {
      setValue(cms.data, path, newVal);
    }
  }

  function handleFocus() {
    editing = true;
  }
</script>

<svelte:element
  this={element}
  class="{classes} {editing ? 'cms-editing' : ''}"
  contenteditable={true}
  onblur={handleBlur}
  onfocus={handleFocus}
>
  {#if multiline}
    {@html value}
  {:else}
    {value}
  {/if}
</svelte:element>

<style>
  .cms-editing {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
    background: rgba(217, 255, 0, 0.05);
    border-radius: 2px;
  }
  
  /* Prevent layout shift during edit */
  [contenteditable="true"]:focus {
    outline: 2px solid var(--accent);
  }
</style>
