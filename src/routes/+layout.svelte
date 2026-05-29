<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { cms } from '$lib/cms/cms.svelte.js';
  import Nav from '$lib/components/Nav.svelte';
  import Analytics from '$lib/components/Analytics.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import '../app.css';

  let { children } = $props();

  let isAdmin = $derived($page.url.pathname.startsWith('/admin'));

  $effect(() => {
    if (typeof window === 'undefined') return;
    
    /** @type {any} */
    let lenis;
    const init = async () => {
      if (isAdmin) return;
      try {
        const mod = await import('$lib/init/scroll.js');
        lenis = mod.initScroll();
      } catch (e) {
        console.warn('Scroll init failed:', e);
      }
    };

    init();

    return () => {
      if (lenis) {
        import('$lib/init/scroll.js').then(mod => mod.destroyScroll());
      }
    };
  });
</script>

<SEO />

<Analytics />

<div class="site-root">
  {#if !isAdmin}
    <Nav />
  {/if}
  
  {#if isAdmin}
    <main class="full-view">
      {@render children()}
    </main>
  {:else}
    <main>
      {#key $page.url.pathname}
        <div 
          in:fly={{ y: 40, duration: 600, easing: cubicOut }} 
          class="page-transition-wrapper"
        >
          {@render children()}
        </div>
      {/key}
    </main>
  {/if}

  {#if !isAdmin}
    <Footer />
  {/if}
</div>

<style>
  main {
    display: grid;
    grid-template-columns: 100%;
    overflow: hidden;
  }

  main.full-view {
    display: block;
    height: 100vh;
  }

  main > div {
    grid-row: 1;
    grid-column: 1;
  }
</style>
