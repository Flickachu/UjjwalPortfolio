<script>
  const cells = Array.from({ length: 28 }, (_, index) => index);
  const checkpoints = ['Positioning', 'Trust', 'Inquiry', 'Revenue'];
</script>

<div class="signal-panel" aria-hidden="true">
  <div class="panel-top">
    <span>Conversion architecture</span>
    <span>Personal portfolio / 2026</span>
  </div>

  <div class="signal-field">
    <div class="matrix">
      {#each cells as cell}
        <span class:hot={cell === 6 || cell === 17 || cell === 23}></span>
      {/each}
    </div>

    <div class="route">
      {#each checkpoints as item, index}
        <div>
          <strong>{String(index + 1).padStart(2, '0')}</strong>
          <span>{item}</span>
        </div>
      {/each}
    </div>

    <div class="statement">
      <span>Live interface signal</span>
      <strong>Strategy + motion taste + systems</strong>
    </div>
  </div>
</div>

<style>
  .signal-panel {
    position: relative;
    min-height: 520px;
    height: 68vh;
    overflow: hidden;
    border: 1px solid var(--line);
    border-radius: 8px;
    background:
      linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px),
      linear-gradient(135deg, rgba(217, 255, 63, 0.12), transparent 34%),
      linear-gradient(315deg, rgba(255, 107, 69, 0.16), transparent 38%),
      #090a08;
    background-size: 42px 42px, 42px 42px, auto, auto, auto;
    box-shadow: var(--shadow);
    isolation: isolate;
  }

  .signal-panel::before {
    position: absolute;
    inset: -20%;
    content: "";
    background:
      radial-gradient(circle at 62% 38%, rgba(217, 255, 63, 0.24), transparent 18%),
      radial-gradient(circle at 34% 68%, rgba(97, 247, 255, 0.18), transparent 18%);
    filter: blur(18px);
    opacity: 0.9;
  }

  .panel-top {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    gap: 18px;
    border-bottom: 1px solid var(--line);
    padding: 16px 18px;
    color: rgba(247, 244, 237, 0.68);
    font-size: 0.78rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .signal-field {
    position: relative;
    z-index: 1;
    height: calc(100% - 51px);
    padding: 26px;
  }

  .matrix {
    display: grid;
    height: 100%;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    grid-template-rows: repeat(4, minmax(0, 1fr));
    gap: 10px;
  }

  .matrix span {
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.035);
  }

  .matrix span.hot {
    border-color: rgba(217, 255, 63, 0.48);
    background:
      linear-gradient(135deg, rgba(217, 255, 63, 0.24), rgba(97, 247, 255, 0.08)),
      rgba(255, 255, 255, 0.06);
  }

  .route {
    position: absolute;
    inset: auto 26px 118px 26px;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    border: 1px solid var(--line);
    border-radius: 8px;
    overflow: hidden;
    background: rgba(5, 5, 5, 0.72);
    backdrop-filter: blur(14px);
  }

  .route div {
    display: grid;
    gap: 8px;
    min-height: 116px;
    align-content: center;
    border-right: 1px solid var(--line);
    padding: 16px;
  }

  .route div:last-child {
    border-right: 0;
  }

  .route strong {
    color: var(--accent);
    font-size: 1.55rem;
    line-height: 1;
  }

  .route span {
    color: rgba(247, 244, 237, 0.82);
    font-weight: 900;
  }

  .statement {
    position: absolute;
    right: 26px;
    bottom: 26px;
    display: grid;
    gap: 5px;
    width: min(340px, calc(100% - 52px));
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 16px 18px;
    background: rgba(5, 5, 5, 0.78);
  }

  .statement span {
    color: var(--muted);
    font-size: 0.76rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .statement strong {
    color: var(--text);
    font-size: 1.05rem;
  }

  @media (max-width: 900px) {
    .signal-panel {
      min-height: 260px;
      height: 32vh;
    }

    .panel-top {
      display: none;
    }

    .signal-field {
      height: 100%;
      padding: 12px;
    }

    .matrix {
      gap: 7px;
    }

    .route {
      display: none;
    }

    .statement {
      left: 14px;
      right: 14px;
      bottom: 14px;
      width: auto;
      padding: 14px 16px;
    }
  }
</style>
