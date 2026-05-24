import { useEffect, useRef } from "react";
import { LiveWallpaperType } from "@/app/types/wallpaper";

interface LiveWallpaperCanvasProps {
  type: LiveWallpaperType;
  accentColor: string; // hex
}

export default function LiveWallpaperCanvas({
  type,
  accentColor,
}: LiveWallpaperCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    // Dynamic color parsing to RGB for canvas opacity values
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 0, g: 255, b: 65 }; // Cyber green fallback
    };

    const rgb = hexToRgb(accentColor);

    // --- MATRIX CANVAS ENGINE ---
    const matrixColumns = Math.floor(width / 16);
    const matrixRain: number[] = Array(matrixColumns).fill(1);
    const chars =
      "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEF";

    // --- STARS CANVAS ENGINE ---
    const starsCount = 150;
    const stars: { x: number; y: number; z: number; speed: number }[] = [];
    for (let i = 0; i < starsCount; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        speed: Math.random() * 2 + 1,
      });
    }

    // --- NEBULA CANVAS ENGINE ---
    let nebulaTime = 0;

    // --- Grid ENGINE ---
    let gridOffset = 0;

    // --- ANIMATION LOOP ---
    const render = () => {
      if (type === "none") {
        ctx.clearRect(0, 0, width, height);
        return;
      }

      if (type === "matrix") {
        // Semi-transparent overlay to create trailing fade
        ctx.fillStyle = "rgba(10, 10, 12, 0.08)";
        ctx.fillRect(0, 0, width, height);

        ctx.font = "14px monospace";

        for (let i = 0; i < matrixRain.length; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const x = i * 16;
          const y = matrixRain[i] * 16;

          // Head of the rain is brighter
          if (Math.random() > 0.98) {
            ctx.fillStyle = `rgba(255, 255, 255, 0.95)`;
          } else {
            ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.85)`;
          }

          ctx.fillText(char, x, y);

          if (y > height && Math.random() > 0.975) {
            matrixRain[i] = 0;
          }
          matrixRain[i]++;
        }
      } else if (type === "stars") {
        ctx.fillStyle = "rgba(10, 10, 12, 0.15)";
        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < starsCount; i++) {
          const star = stars[i];
          star.z -= star.speed;

          if (star.z <= 0) {
            star.z = width;
            star.x = Math.random() * width - width / 2;
            star.y = Math.random() * height - height / 2;
          }

          const k = 128.0 / star.z;
          const px = star.x * k + width / 2;
          const py = star.y * k + height / 2;

          if (px >= 0 && px < width && py >= 0 && py < height) {
            const size = (1 - star.z / width) * 3 + 0.5;
            const starOpacity = (1 - star.z / width) * 0.9;
            ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${starOpacity})`;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else if (type === "nebula") {
        ctx.fillStyle = "rgba(10, 10, 12, 0.04)";
        ctx.fillRect(0, 0, width, height);

        nebulaTime += 0.003;
        const particlesCount = 8;

        ctx.save();
        ctx.globalCompositeOperation = "screen";
        for (let i = 0; i < particlesCount; i++) {
          const centerX = width / 2 + Math.sin(nebulaTime + i) * (width * 0.2);
          const centerY =
            height / 2 + Math.cos(nebulaTime * 0.7 + i * 1.5) * (height * 0.25);
          const radius = Math.abs(Math.sin(nebulaTime * 0.5 + i) * 150) + 120;

          const grad = ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            radius,
          );
          grad.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.22)`);
          grad.addColorStop(
            0.5,
            `rgba(${Math.max(0, rgb.r - 40)}, ${Math.max(0, rgb.g - 40)}, ${Math.max(0, rgb.b - 40)}, 0.08)`,
          );
          grad.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      } else if (type === "grid") {
        // 3D Retro cyberpunk digital grid projection
        ctx.fillStyle = "#0a0a0c";
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.18)`;
        ctx.lineWidth = 1.2;

        gridOffset += 1.8;
        if (gridOffset >= 60) {
          gridOffset = 0;
        }

        const horizon = height * 0.45;
        const gridSpacing = 40;

        // Horizontals with perspective compression
        for (let y = horizon; y < height; y += 15) {
          const pers = (y - horizon) / (height - horizon);
          const opacity = pers * 0.6;
          ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.35})`;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Perspective vertical lines meeting at a vanishing point
        const vanishingX = width / 2;
        const perspectiveCount = Math.floor(width / gridSpacing) + 6;
        for (let i = -perspectiveCount / 2; i <= perspectiveCount / 2; i++) {
          const bottomX = vanishingX + i * gridSpacing * 2.5;
          ctx.beginPath();
          ctx.moveTo(vanishingX, horizon);
          ctx.lineTo(bottomX, height);
          ctx.stroke();
        }

        // Horizontal scrolling grid-lines for synthetic motion feel
        const runningPers = gridOffset / 60;
        const scrollY = horizon + runningPers * (height - horizon);
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`;
        ctx.beginPath();
        ctx.moveTo(0, scrollY);
        ctx.lineTo(width, scrollY);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [type, accentColor]);

  // If none selection, we display nothing
  if (type === "none") return null;

  return (
    <canvas
      ref={canvasRef}
      id="live-wallpaper-canvas"
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 pointer-events-none select-none z-0"
    />
  );
}
