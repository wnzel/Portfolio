import { useEffect, useRef, useState } from "react";

const StarField = () => {
  const canvasRef = useRef(null);
  const numStars = 75;
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const rootElement = document.documentElement;

    const updateThemeState = () => {
      const theme = rootElement.getAttribute("data-theme");
      setIsDarkMode(theme === "dark");
    };

    updateThemeState();

    // theme changes
    const observer = new MutationObserver(updateThemeState);
    observer.observe(rootElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let stars = [];
    let targetMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let currentMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      createStars();
    };

    // Create stars
    const createStars = () => {
      stars.length = 0;
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          depth: Math.random() * 3,
          velocityX: (Math.random() - 0.5) * 0.15,
          velocityY: (Math.random() - 0.5) * 0.15,
        });
      }
    };

    // Draw stars
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.05;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.05;

      const starColor = isDarkMode ? "rgba(255, 255, 255, " : "rgba(0, 0, 0, ";

      for (const star of stars) {
        // Parallax effect
        const parallaxX =
          (currentMouse.x - canvas.width / 2) * star.depth * 0.02;
        const parallaxY =
          (currentMouse.y - canvas.height / 2) * star.depth * 0.02;

        // Update position for drifting
        star.x += star.velocityX * star.depth;
        star.y += star.velocityY * star.depth;

        // Wrap stars around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Draw star
        ctx.beginPath();
        ctx.arc(
          star.x + parallaxX,
          star.y + parallaxY,
          star.radius,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `${starColor}${0.8 * star.depth})`;
        ctx.fill();
      }
    };

    // Mouse movement
    const handleMouseMove = (e) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };

    // Mouse leave
    const handleMouseLeave = () => {
      targetMouse.x = currentMouse.x;
      targetMouse.y = currentMouse.y;
    };

    // Animation loop
    const animate = () => {
      drawStars();
      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDarkMode]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default StarField;
