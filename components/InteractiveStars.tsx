import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export const InteractiveStars: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    let animationFrameId: number;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      initStars(width, height);
    };

    const initStars = (width: number, height: number) => {
      const starCount = Math.floor((width * height) / 3000); // Density based on area
      stars = [];
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        stars.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random(),
          twinkleSpeed: Math.random() * 0.05 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
        // Calculate mouse position relative to the center of the viewport for parallax
        const x = (e.clientX - window.innerWidth / 2) * 0.05; // Sensitivity factor
        const y = (e.clientY - window.innerHeight / 2) * 0.05;
        mouseRef.current = { x, y };
    };

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: mouseX, y: mouseY } = mouseRef.current;

      stars.forEach((star) => {
        // Twinkle effect
        star.twinklePhase += star.twinkleSpeed;
        const opacity = Math.abs(Math.sin(star.twinklePhase)) * 0.8 + 0.2; // Min opacity 0.2

        // Movement reaction (Parallax opposite to mouse)
        // Stars closer to screen (larger) move more
        const moveFactor = star.size * 2; 
        const targetX = star.baseX - mouseX * moveFactor;
        const targetY = star.baseY - mouseY * moveFactor;

        // Smooth interpolation
        star.x += (targetX - star.x) * 0.1;
        star.y += (targetY - star.y) * 0.1;

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
