<script>
  export let businessCase = {
    title: '',
    businessContext: '',
    objective: '',
    whatIDid: [],
    businessImpact: [],
    strategicThinking: ''
  };
</script>

<article class="case-card">
  <div>
    <p class="eyebrow">Case logic</p>
    <h3>{businessCase.title}</h3>
  </div>

  {#if businessCase.businessContext}
    <p class="lede">{businessCase.businessContext}</p>
  {/if}

  <div class="case-columns">
    {#if businessCase.whatIDid?.length}
      <div>
        <strong>Build moves</strong>
        <ul>
          {#each businessCase.whatIDid as item}
            <li>{item}</li>
          {/each}
        </ul>
      </div>
    {/if}

    {#if businessCase.businessImpact?.length}
      <div>
        <strong>Business impact</strong>
        <ul>
          {#each businessCase.businessImpact as item}
            <li>{item}</li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>

  {#if businessCase.strategicThinking}
    <p class="strategy">{businessCase.strategicThinking}</p>
  {/if}
</article>

<style>
  .case-card {
    display: grid;
    gap: 22px;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 28px;
    background: rgba(255, 255, 255, 0.045);
  }

  h3 {
    margin: 8px 0 0;
    font-size: 1.8rem;
    line-height: 1.05;
    font-weight: 900;
  }

  .lede,
  .strategy {
    margin: 0;
    color: var(--muted);
    line-height: 1.75;
  }

  .case-columns {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  strong {
    display: block;
    margin-bottom: 10px;
    color: var(--accent);
  }

  ul {
    display: grid;
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    color: rgba(247, 244, 237, 0.78);
  }

  li::before {
    color: var(--coral);
    content: "+ ";
    font-weight: 900;
  }

  .strategy {
    border-top: 1px solid var(--line);
    padding-top: 18px;
  }

  @media (max-width: 720px) {
    .case-card {
      padding: 22px;
    }

    .case-columns {
      grid-template-columns: 1fr;
    }
  }
</style>
