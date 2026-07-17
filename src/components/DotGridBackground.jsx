import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const smoothstep = (value) => {
  const clamped = clamp(value, 0, 1);
  return clamped * clamped * (3 - 2 * clamped);
};

const parseColor = (color) => {
  if (color.startsWith("rgb")) {
    const channels = color.match(/[\d.]+/g) ?? [];
    return {
      r: Number(channels[0]) || 0,
      g: Number(channels[1]) || 0,
      b: Number(channels[2]) || 0,
    };
  }

  let hex = color.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((character) => character + character)
      .join("");
  }

  const value = Number.parseInt(hex.slice(0, 6), 16);
  if (Number.isNaN(value)) return { r: 99, g: 102, b: 241 };

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
};

function DotGridBackground({
  dotColor = "#6366f1",
  dotSize = 3,
  dotSpacing = 28,
  orbitSpeed = 1.5,
  impactRadius = 100,
  scaleOnHover = 1.8,
  enableRevolve = true,
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    const dots = [];
    const rgb = parseColor(dotColor);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let width = 0;
    let height = 0;
    let frameId = 0;
    let previousTime = 0;
    let globalAngle = 0;
    let isHovering = false;
    let leaveTime = 0;
    const mouse = { x: -9999, y: -9999 };

    const buildDots = () => {
      dots.length = 0;
      const columns = Math.ceil(width / dotSpacing) + 2;
      const rows = Math.ceil(height / dotSpacing) + 2;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          dots.push({
            baseX: column * dotSpacing,
            baseY: row * dotSpacing,
            inclination: Math.random() * Math.PI,
            ascension: Math.random() * Math.PI * 2,
            phase: Math.random() * Math.PI * 2,
            speedMultiplier: 0.7 + Math.random() * 0.6,
          });
        }
      }
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      buildDots();
    };

    const handlePointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect();
      mouse.x = event.clientX - bounds.left;
      mouse.y = event.clientY - bounds.top;
      isHovering = true;
    };

    const handlePointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      isHovering = false;
      leaveTime = performance.now();
    };

    const draw = (time) => {
      const delta = Math.min((time - (previousTime || time)) / 1000, 0.05);
      previousTime = time;
      globalAngle += reducedMotion ? 0 : orbitSpeed * delta;
      context.clearRect(0, 0, width, height);

      const timeSinceLeave = isHovering
        ? 0
        : Math.max(0, time - leaveTime) / 1000;
      const decay = isHovering
        ? 1
        : smoothstep(Math.max(0, 1 - timeSinceLeave * 1.5));

      for (const dot of dots) {
        const distanceX = dot.baseX - mouse.x;
        const distanceY = dot.baseY - mouse.y;
        const distance = Math.hypot(distanceX, distanceY);
        const isInRange = distance > 0 && distance < impactRadius;
        let x = dot.baseX;
        let y = dot.baseY;
        let scale = 1;
        let alpha = 0.3;

        if (isInRange) {
          const distanceRatio = distance / impactRadius;
          const influence = smoothstep(1 - distanceRatio) * decay;

          if (enableRevolve) {
            const orbitRadius =
              (1 - distanceRatio) * dotSpacing * 0.7 * influence;
            const angle =
              globalAngle * dot.speedMultiplier + dot.phase;
            const cosAscension = Math.cos(dot.ascension);
            const sinAscension = Math.sin(dot.ascension);
            const cosInclination = Math.cos(dot.inclination);
            const sinInclination = Math.sin(dot.inclination);
            const localX = Math.cos(angle);
            const localY = Math.sin(angle) * cosInclination;
            const localZ = Math.sin(angle) * sinInclination;
            const orbitX =
              (localX * cosAscension - localY * sinAscension) * orbitRadius;
            const orbitY =
              (localX * sinAscension + localY * cosAscension) * orbitRadius;
            const depthScale = 0.75 + 0.25 * ((localZ + 1) * 0.5);

            x += orbitX;
            y += orbitY;
            scale = (1 + (scaleOnHover - 1) * influence) * depthScale;
            alpha = (0.3 + 0.7 * influence) * depthScale;
          } else {
            scale = 1 + (scaleOnHover - 1) * influence;
            alpha = 0.3 + 0.7 * influence;
          }
        }

        context.beginPath();
        context.arc(x, y, (dotSize / 2) * scale, 0, Math.PI * 2);
        context.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
        context.fill();
      }

      frameId = window.requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("blur", handlePointerLeave);
    resize();
    frameId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handlePointerLeave,
      );
      window.removeEventListener("blur", handlePointerLeave);
    };
  }, [
    dotColor,
    dotSize,
    dotSpacing,
    orbitSpeed,
    impactRadius,
    scaleOnHover,
    enableRevolve,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block h-full w-full ${className}`}
    />
  );
}

DotGridBackground.propTypes = {
  dotColor: PropTypes.string,
  dotSize: PropTypes.number,
  dotSpacing: PropTypes.number,
  orbitSpeed: PropTypes.number,
  impactRadius: PropTypes.number,
  scaleOnHover: PropTypes.number,
  enableRevolve: PropTypes.bool,
  className: PropTypes.string,
};

export default DotGridBackground;
