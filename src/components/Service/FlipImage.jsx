import { useRef, useEffect, useState } from "react";

const DEFAULTS = {
    mode: "multi",
    cardWidth: 600,
    cardHeight: 400,
    focusY: 50,
    singleImage:
        "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/babdb603-8b5b-4520-58d6-240a34463c00/w=800",
    singleFocusY: 19,
    animate: true,
    // Lower default tile count — 50 columns was built for large hero-sized
    // canvases. At small sizes (e.g. 100x150) it just means thousands of
    // extra canvas draw calls per frame for detail nobody can see. Pass a
    // higher value explicitly if you're using this at a large size.
    tiles: 16,
    angle: 77,
    flip: 50,
    transition: {
        duration: 1.2,
        ease: "linear",
        delay: 1,
    },
};

const FALLBACK_IMAGES = [
    {
        image: {
            src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/babdb603-8b5b-4520-58d6-240a34463c00/w=800",
        },
        focusY: 19,
    },
    {
        image: {
            src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/12e8b0be-f114-4134-1ab7-53116bfc2800/w=800",
        },
        focusY: 0,
    },
    {
        image: {
            src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/b14ae2a2-1116-4a7f-0a18-1d74c4a46f00/w=800",
        },
        focusY: 26,
    },
];

function resolveImageSrc(image) {
    if (!image) return "";
    if (typeof image === "string") return image.trim();
    return image.src || "";
}

const focusOf = (item) =>
    typeof item?.focusY === "number" ? item.focusY : DEFAULTS.focusY;

const NAMED_EASES = {
    linear: [0, 0, 1, 1],
    easeIn: [0.42, 0, 1, 1],
    easeOut: [0, 0, 0.58, 1],
    easeInOut: [0.42, 0, 0.58, 1],
};

function cubicBezierEase(x1, y1, x2, y2) {
    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;

    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;

    const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
    const sampleY = (t) => ((ay * t + by) * t + cy) * t;
    const dX = (t) => (3 * ax * t + 2 * bx) * t + cx;

    return (p) => {
        let t = p;
        for (let i = 0; i < 8; i++) {
            const x = sampleX(t) - p;
            const d = dX(t);
            if (Math.abs(x) < 1e-4 || Math.abs(d) < 1e-6) break;
            t -= x / d;
        }
        t = Math.max(0, Math.min(1, t));
        return sampleY(t);
    };
}

function makeEase(ease) {
    if (Array.isArray(ease) && ease.length === 4) {
        return cubicBezierEase(ease[0], ease[1], ease[2], ease[3]);
    }
    const b = (typeof ease === "string" && NAMED_EASES[ease]) || NAMED_EASES.easeOut;
    return cubicBezierEase(b[0], b[1], b[2], b[3]);
}

const durationOf = (transition, fallback) =>
    typeof transition?.duration === "number" ? transition.duration : fallback;

const delayOf = (transition, fallback) =>
    typeof transition?.delay === "number" ? transition.delay : fallback;

const FlipImage = ({
    mode = DEFAULTS.mode,
    images = FALLBACK_IMAGES,
    singleImage = DEFAULTS.singleImage,
    singleFocusY = DEFAULTS.singleFocusY,
    cardWidth = DEFAULTS.cardWidth,
    cardHeight = DEFAULTS.cardHeight,
    animate = DEFAULTS.animate,
    tiles = DEFAULTS.tiles,
    angle = DEFAULTS.angle,
    flip = DEFAULTS.flip,
    transition = DEFAULTS.transition,
    style,
}) => {
    const canvasRef = useRef(null);

    const items =
        mode === "single"
            ? [{ image: singleImage || FALLBACK_IMAGES[0].image, focusY: singleFocusY }]
            : images?.length
                ? images
                : FALLBACK_IMAGES;

    const sourcesKey = JSON.stringify(
        items.map((item) => [resolveImageSrc(item?.image), focusOf(item)])
    );

    const [shown, setShown] = useState(0);
    const focusKey = JSON.stringify(items.map(focusOf));
    const lastFocusRef = useRef(null);

    useEffect(() => {
        const next = JSON.parse(focusKey);
        const last = lastFocusRef.current;
        lastFocusRef.current = next;
        if (!last) return;
        const moved = next.findIndex((f, i) => i < last.length && last[i] !== f);
        if (moved >= 0) setShown(moved);
    }, [focusKey]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const entries = JSON.parse(sourcesKey);
        const sources = entries.map(([src]) => src);
        const focusAt = (i) => entries[i]?.[1] ?? DEFAULTS.focusY;
        const ease = makeEase(transition?.ease);

        const total = Math.max(0.1, durationOf(transition, 1.2)) * 1000;
        const hold = Math.max(0, delayOf(transition, 1)) * 1000;
        const flipDur = Math.max(80, total * (flip / 100));
        const spread = Math.max(0, total - flipDur);
        const flaps = Math.max(2, Math.min(6, Math.round(flipDur / 110)));

        let alive = true;
        let raf = 0;
        let holdTimeoutId = null;

        // Pause all work while the canvas isn't on screen — same pattern
        // used for the Footer's LiquidGrid.
        let isVisible = false;
        let running = false;
        const io = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
                if (isVisible && !running && built) {
                    running = true;
                    raf = requestAnimationFrame(loop);
                }
            },
            { threshold: 0 }
        );
        io.observe(canvas);

        let dpr = 1;
        let cols = 0;
        let rows = 0;
        let cw = 0;
        let ch = 0;
        let cellW = 0;
        let cellH = 0;
        let offsets = [];
        const loaded = [];
        let index = 0;
        let startTime = -1;
        let reveal = 0;
        let previous = null;
        let built = false;

        function build() {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(cardWidth * dpr);
            canvas.height = Math.round(cardHeight * dpr);
            cw = canvas.width;
            ch = canvas.height;
            cols = Math.max(4, Math.round(tiles));
            cellW = cw / cols;
            rows = Math.max(1, Math.round(ch / cellW));
            cellH = ch / rows;

            const rad = (angle * Math.PI) / 180;
            const ux = Math.cos(rad);
            const uy = Math.sin(rad);
            const raw = [];
            let lo = Infinity;
            let hi = -Infinity;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = (c + 0.5) / cols;
                    const y = (r + 0.5) / rows;
                    const p = x * ux + y * uy;
                    raw.push(p);
                    lo = Math.min(lo, p);
                    hi = Math.max(hi, p);
                }
            }

            const range = hi - lo || 1;
            offsets = raw.map((p) => (p - lo) / range);
            startTime = -1;
        }

        function cover(img, focusY) {
            const scale = Math.max(cw / img.width, ch / img.height);
            const dx = (cw - img.width * scale) / 2;
            const slack = ch - img.height * scale;
            const f = Math.min(100, Math.max(0, focusY)) / 100;
            return { scale, dx, dy: slack * f };
        }

        // Fast path for the common case (scaleY === 1, i.e. not mid-flip):
        // a plain drawImage with no matrix transform. The save/translate/
        // scale/restore dance is only needed for the small number of tiles
        // actively flipping at any given moment.
        function tile(img, cov, cellX, cellY, srcX, srcY, scaleY) {
            const srcW = cellW / cov.scale;
            const srcH = cellH / cov.scale;
            const sx = Math.max(0, Math.min(img.width - srcW, srcX));
            const sy = Math.max(0, Math.min(img.height - srcH, srcY));

            if (scaleY === 1) {
                ctx.drawImage(
                    img,
                    sx,
                    sy,
                    srcW,
                    srcH,
                    cellX,
                    cellY,
                    cellW + 0.8,
                    cellH + 0.8
                );
                return;
            }

            ctx.save();
            ctx.translate(cellX + cellW / 2, cellY + cellH / 2);
            ctx.scale(1, scaleY);
            ctx.drawImage(
                img,
                sx,
                sy,
                srcW,
                srcH,
                -cellW / 2,
                -cellH / 2,
                cellW + 0.8,
                cellH + 0.8
            );
            ctx.restore();
        }

        function draw(time) {
            if (startTime < 0) startTime = time;
            const elapsed = time - startTime;

            ctx.clearRect(0, 0, cw, ch);

            const img = loaded[index];
            if (!img || !img.width) return false;

            const cov = cover(img, focusAt(index));
            const behind = previous;
            const behindCov = behind ? cover(behind.img, behind.focusY) : null;
            const reversed = reveal % 2 === 1;

            let settled = true;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const idx = r * cols + c;
                    const u = reversed ? 1 - offsets[idx] : offsets[idx];
                    const start = ease(u) * spread;
                    const cellX = c * cellW;
                    const cellY = r * cellH;

                    if (elapsed < start) {
                        settled = false;
                        if (behind && behindCov) {
                            tile(
                                behind.img,
                                behindCov,
                                cellX,
                                cellY,
                                (cellX - behindCov.dx) / behindCov.scale,
                                (cellY - behindCov.dy) / behindCov.scale,
                                1
                            );
                        }
                        continue;
                    }

                    if (elapsed < start + flipDur) {
                        settled = false;
                        const local = (elapsed - start) / flipDur;
                        const tick = Math.floor(local * flaps);
                        const hash = (idx * 73 + tick * 131 + 17) % (cols * rows);
                        const hashCol = hash % cols;
                        const hashRow = Math.floor(hash / cols) % rows;
                        const scaleY =
                            0.12 +
                            Math.abs(Math.cos(local * flaps * Math.PI)) * 0.88;

                        tile(
                            img,
                            cov,
                            cellX,
                            cellY,
                            (hashCol * cellW - cov.dx) / cov.scale,
                            (hashRow * cellH - cov.dy) / cov.scale,
                            scaleY
                        );
                        continue;
                    }

                    tile(
                        img,
                        cov,
                        cellX,
                        cellY,
                        (cellX - cov.dx) / cov.scale,
                        (cellY - cov.dy) / cov.scale,
                        1
                    );
                }
            }

            return settled;
        }

        function nextReady(from) {
            const count = sources.length;
            for (let step = 1; step <= count; step++) {
                const candidate = (from + step) % count;
                if (loaded[candidate]) return candidate;
            }
            return from;
        }

        function loop(time) {
            if (!alive) return;

            if (!isVisible) {
                running = false;
                return; // IntersectionObserver will restart the loop later
            }

            const settled = draw(time);

            if (settled) {
                previous = loaded[index]
                    ? { img: loaded[index], focusY: focusAt(index) }
                    : previous;

                const ready = loaded.filter(Boolean).length;

                if (ready > 1) {
                    // Nothing is visually changing right now — stop paying
                    // for a redraw every frame and just wait exactly as
                    // long as needed until the next flip is due.
                    const remaining = Math.max(0, startTime + total + hold - time);
                    running = false;
                    holdTimeoutId = setTimeout(() => {
                        if (!alive) return;
                        index = nextReady(index);
                        reveal++;
                        startTime = -1;
                        if (isVisible) {
                            running = true;
                            raf = requestAnimationFrame(loop);
                        }
                    }, remaining);
                    return;
                }
            }

            raf = requestAnimationFrame(loop);
        }

        sources.forEach((src, i) => {
            if (!src) return;
            const img = new Image();
            img.crossOrigin = "anonymous";

            img.onload = () => {
                if (!alive) return;
                loaded[i] = img;

                if (!built) {
                    built = true;
                    build();
                }

                if (!running && isVisible) {
                    running = true;
                    raf = requestAnimationFrame(loop);
                }
            };

            img.onerror = () => {
                console.error("FlipImage failed to load:", src);
            };

            img.src = src;
        });

        return () => {
            alive = false;
            io.disconnect();
            cancelAnimationFrame(raf);
            if (holdTimeoutId) clearTimeout(holdTimeoutId);
        };
    }, [sourcesKey, cardWidth, cardHeight, tiles, angle, flip, JSON.stringify(transition)]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                ...style,
                display: "block",
                width: cardWidth,
                height: cardHeight,
            }}
        />
    );
};

export default FlipImage;
