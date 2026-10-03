/**
 * Paints an image sequence onto a canvas, object-fit: cover.
 *
 * Loading is progressive: frame 1, then every 4th frame, then the gaps, so
 * scrubbing works almost immediately and sharpens as the rest arrive. `seek`
 * draws the nearest frame that has loaded.
 */
type Options = {
  count: number;
  /** Use every Nth frame (phones). */
  step: number;
  path: (index: number) => string;
};

export function createFramePlayer(canvas: HTMLCanvasElement, { count, step, path }: Options) {
  const ctx = canvas.getContext("2d");
  const indices = Array.from({ length: Math.ceil(count / step) }, (_, i) => 1 + i * step);
  const frames: (HTMLImageElement | null)[] = indices.map(() => null);
  let target = 0;
  let drawn = -1;
  let destroyed = false;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    drawn = -1;
    draw();
  };

  const nearestLoaded = (i: number) => {
    for (let d = 0; d < frames.length; d++) {
      if (frames[i - d]) return i - d;
      if (frames[i + d]) return i + d;
    }
    return -1;
  };

  function draw() {
    if (!ctx || destroyed) return;
    const i = nearestLoaded(target);
    if (i < 0 || i === drawn) return;
    const img = frames[i]!;
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    drawn = i;
  }

  // Load order: first, every 4th, then the rest.
  const order = [0, ...indices.keys()].filter((i, pos, all) => all.indexOf(i) === pos);
  order.sort((a, b) => Number(a % 4 !== 0) - Number(b % 4 !== 0) || a - b);

  let cursor = 0;
  const loadNext = () => {
    if (destroyed || cursor >= order.length) return;
    const i = order[cursor++];
    const img = new Image();
    img.decoding = "async";
    img.src = path(indices[i]);
    img.onload = () => {
      frames[i] = img;
      if (Math.abs(i - target) <= Math.abs(drawn - target) || drawn < 0) draw();
      loadNext();
    };
    img.onerror = loadNext;
  };
  // A few parallel lanes keep the network busy without flooding it.
  for (let lane = 0; lane < 4; lane++) loadNext();

  resize();
  window.addEventListener("resize", resize);

  return {
    /** progress 0..1 */
    seek(progress: number) {
      target = Math.round(progress * (frames.length - 1));
      draw();
    },
    destroy() {
      destroyed = true;
      window.removeEventListener("resize", resize);
    },
  };
}
