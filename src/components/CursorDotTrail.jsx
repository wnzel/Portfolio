import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const toRgba = (color, alpha) => {
  if (!color) return `rgba(0, 0, 0, ${alpha})`;

  if (color.startsWith("rgba")) {
    return color.replace(
      /rgba\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*[^)]+\)/,
      (_, red, green, blue) =>
        `rgba(${red}, ${green}, ${blue}, ${alpha})`,
    );
  }

  if (color.startsWith("rgb(")) {
    return `rgba(${color.slice(4, -1)}, ${alpha})`;
  }

  if (color.startsWith("#")) {
    const hex =
      color.length === 4
        ? color
            .slice(1)
            .split("")
            .map((character) => character + character)
            .join("")
        : color.slice(1, 7);
    const value = Number.parseInt(hex, 16);

    if (!Number.isNaN(value)) {
      return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${
        value & 255
      }, ${alpha})`;
    }
  }

  return `rgba(0, 0, 0, ${alpha})`;
};

const lerp = (from, to, amount) => from + (to - from) * amount;

function CursorDotTrail({
  color = "#6366f1",
  colorInverted = "#ffffff",
  size = 12,
  hoverSize = 40,
  borderWidth = 2,
  spring = 0.15,
  friction = 0.5,
  trailDuration = 200,
  transitionSpeed = 0.15,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const supportsCursor = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!supportsCursor || prefersReducedMotion) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const points = [];
    const ball = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    let frameId = 0;
    let lastTime = performance.now();
    let radius = size / 2;
    let fillOpacity = 1;
    let strokeOpacity = 0;
    let lineOpacity = 0;
    let lineWidth = 0;
    let lineTargetWidth = 0;
    let lineProgress = 0;
    let hasPointer = false;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;

    const resize = () => {
      const pixelRatio = Math.max(1, window.devicePixelRatio || 1);
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      canvas.width = Math.floor(viewportWidth * pixelRatio);
      canvas.height = Math.floor(viewportHeight * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const handleMouseMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;

      if (!hasPointer) {
        ball.x = event.clientX;
        ball.y = event.clientY;
        hasPointer = true;
      }
    };

    const animate = (now) => {
      frameId = window.requestAnimationFrame(animate);
      const delta = Math.min(now - lastTime, 33);
      lastTime = now;
      context.clearRect(0, 0, viewportWidth, viewportHeight);

      if (!hasPointer) return;

      const distanceX = target.x - ball.x;
      const distanceY = target.y - ball.y;
      velocity.x = (velocity.x + distanceX * spring) * friction;
      velocity.y = (velocity.y + distanceY * spring) * friction;
      ball.x += velocity.x;
      ball.y += velocity.y;

      points.push({ x: ball.x, y: ball.y, age: 0 });
      for (const point of points) point.age += delta;

      while (points.length && points[0].age >= trailDuration) {
        points.shift();
      }

      const hoveredElement = document.elementFromPoint(target.x, target.y);
      const hidesTrail = hoveredElement?.closest(
        '[aria-label~="trail{hide}"], [data-framer-name~="trail{hide}"], [data-cursor-trail="hide"]',
      );

      if (hidesTrail) return;

      const usesInvertedColor = hoveredElement?.closest(
        '[aria-label~="trail{invert-color}"], [data-framer-name~="trail{invert-color}"], [data-cursor-trail="invert"]',
      );
      const currentColor = usesInvertedColor ? colorInverted : color;

      if (points.length > 1) {
        const oldest = points[0];
        const newest = points[points.length - 1];
        const oldestOpacity = 1 - oldest.age / trailDuration;
        const gradient = context.createLinearGradient(
          oldest.x,
          oldest.y,
          newest.x,
          newest.y,
        );

        gradient.addColorStop(
          0,
          toRgba(currentColor, Math.max(0, oldestOpacity * 0.3)),
        );
        gradient.addColorStop(1, toRgba(currentColor, 1));
        context.beginPath();
        context.moveTo(oldest.x, oldest.y);

        for (let index = 1; index < points.length; index += 1) {
          context.lineTo(points[index].x, points[index].y);
        }

        context.strokeStyle = gradient;
        context.lineWidth = Math.max(2, size / 4);
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
      }

      const isInteractive = hoveredElement?.closest(
        "a, button, [role~='button']",
      );
      const hidesDot = hoveredElement?.closest('[aria-label~="button"]');
      const linkElement = hoveredElement?.closest(
        '[aria-label~="trail{link}"], [data-framer-name~="trail{link}"], [data-cursor-trail="link"]',
      );
      const workCard = hoveredElement?.closest(
        '[aria-label~="work-card"], [data-cursor-trail="work-card"]',
      );
      const isLink = Boolean(linkElement);
      const isWorkCard = Boolean(workCard);

      if (isLink) {
        const bounds = linkElement.getBoundingClientRect();
        ball.x = bounds.left + bounds.width / 2;
        ball.y = bounds.bottom;
        lineTargetWidth = bounds.width;
      } else {
        lineTargetWidth = 0;
      }

      const targetRadius =
        isWorkCard || (!isInteractive && !isLink) ? size / 2 : hoverSize / 2;
      radius = lerp(radius, targetRadius, transitionSpeed);
      fillOpacity = lerp(
        fillOpacity,
        isWorkCard ? 1 : isInteractive || isLink ? 0 : 1,
        transitionSpeed,
      );
      strokeOpacity = lerp(
        strokeOpacity,
        isWorkCard ? 0 : isInteractive ? 1 : 0,
        transitionSpeed,
      );
      lineOpacity = lerp(
        lineOpacity,
        isWorkCard ? 0 : isLink ? 1 : 0,
        transitionSpeed,
      );
      lineProgress = lerp(lineProgress, isLink ? 1 : 0, 0.15);
      lineWidth = lerp(
        lineWidth,
        lineTargetWidth * lineProgress,
        transitionSpeed,
      );

      if (hidesDot) return;

      if (isLink && lineOpacity > 0.01) {
        const bounds = linkElement.getBoundingClientRect();
        const underlineY = bounds.bottom + 1;
        const startX = bounds.left + (bounds.width - lineWidth) / 2;
        context.beginPath();
        context.moveTo(startX, underlineY);
        context.lineTo(startX + lineWidth, underlineY);
        context.strokeStyle = toRgba(currentColor, lineOpacity);
        context.lineWidth = Math.max(1, borderWidth - 1);
        context.stroke();
        return;
      }

      context.beginPath();
      context.arc(ball.x, ball.y, radius, 0, Math.PI * 2);

      if (strokeOpacity > 0.01) {
        context.strokeStyle = toRgba(currentColor, strokeOpacity);
        context.lineWidth = borderWidth;
        context.stroke();
      }

      if (fillOpacity > 0.01) {
        context.fillStyle = toRgba(currentColor, fillOpacity);
        context.fill();
      }
    };

    resize();
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", resize);
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, [
    color,
    colorInverted,
    size,
    hoverSize,
    borderWidth,
    spring,
    friction,
    trailDuration,
    transitionSpeed,
  ]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] block h-dvh w-screen"
    />,
    document.body,
  );
}

CursorDotTrail.propTypes = {
  color: PropTypes.string,
  colorInverted: PropTypes.string,
  size: PropTypes.number,
  hoverSize: PropTypes.number,
  borderWidth: PropTypes.number,
  spring: PropTypes.number,
  friction: PropTypes.number,
  trailDuration: PropTypes.number,
  transitionSpeed: PropTypes.number,
};

export default CursorDotTrail;
