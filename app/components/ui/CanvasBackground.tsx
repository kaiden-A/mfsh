"use client";

import { useEffect, useRef } from "react";

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W: number, H: number;
    let animationFrameId: number;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Particles Class
    class Particle {
      // Added "!" to tell TypeScript these are assigned in the reset() method
      x!: number;
      y!: number;
      s!: number;
      vx!: number;
      vy!: number;
      life!: number;
      decay!: number;
      hue!: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.s = Math.random() * 1.8 + 0.4;
        this.vx = (Math.random() - 0.5) * 0.28;
        this.vy = (Math.random() - 0.5) * 0.28;
        this.life = Math.random();
        this.decay = 0.002 + Math.random() * 0.003;
        this.hue = Math.random() < 0.5 ? 60 : 280; // Yellow or Purple
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        if (this.life <= 0 || this.x < 0 || this.x > W || this.y < 0 || this.y > H) {
          this.reset();
        }
      }

      draw() {
        ctx!.save();
        ctx!.globalAlpha = this.life * 0.35;
        ctx!.fillStyle = `hsl(${this.hue}, 100%, 70%)`;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.s, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }

    // Gradient blobs
    const blobs = [
      { x: 0.2, y: 0.3, r: 280, c: "rgba(75,0,130,", sp: 0.0003, ph: 0 },
      { x: 0.8, y: 0.6, r: 360, c: "rgba(45,53,0,", sp: 0.0002, ph: 2 },
      { x: 0.5, y: 0.1, r: 220, c: "rgba(100,0,200,", sp: 0.0004, ph: 4 },
    ];

    let t = 0;

    const draw = () => {
      // Create a slight trail effect or clear
      ctx.clearRect(0, 0, W, H);
      t += 1; // Increment time

      // Draw blobs
      blobs.forEach((b) => {
        const x = (b.x + Math.sin(t * b.sp + b.ph) * 0.1) * W;
        const y = (b.y + Math.cos(t * b.sp + b.ph) * 0.1) * H;
        const g = ctx.createRadialGradient(x, y, 0, x, y, b.r);
        g.addColorStop(0, b.c + "0.16)");
        g.addColorStop(1, b.c + "0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        backgroundColor: "#0a0a0a", // Dark background for the glow to pop
      }}
    />
  );
}