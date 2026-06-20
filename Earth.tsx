import { useEffect, useRef } from "react";
import earthImg from "@/assets/earth-hero.jpg";
import earthHealed from "@/assets/earth-healed.jpg";
import earthStressed from "@/assets/earth-stressed.jpg";

const SOURCES = { hero: earthImg, healed: earthHealed, stressed: earthStressed } as const;

export function Earth({
  variant = "hero",
  size = 720,
  spin = true,
  interactive = true,
  className = "",
}: {
  variant?: keyof typeof SOURCES;
  size?: number;
  spin?: boolean;
  interactive?: boolean;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!interactive || !wrap.current) return;
    const el = wrap.current;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      el.style.setProperty("--rx", `${-dy * 8}deg`);
      el.style.setProperty("--ry", `${dx * 12}deg`);
      el.style.setProperty("--tx", `${dx * 14}px`);
      el.style.setProperty("--ty", `${dy * 14}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [interactive]);

  return (
    <div
      ref={wrap}
      className={`relative ${className}`}
      style={{
        width: size,
        height: size,
        perspective: 1400,
        transform:
          "translate3d(var(--tx,0),var(--ty,0),0) rotateX(var(--rx,0)) rotateY(var(--ry,0))",
        transition: "transform .6s cubic-bezier(.2,.8,.2,1)",
      }}
    >
      {/* atmospheric halo */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow:
            "0 0 120px 30px oklch(0.82 0.18 195 / .35), inset 0 0 80px oklch(0.82 0.18 195 / .25)",
        }}
      />
      <div
        className={`absolute inset-0 overflow-hidden rounded-full ${spin ? "earth-spin" : ""}`}
        style={{
          backgroundImage: `url(${SOURCES[variant]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "inset -30px -10px 80px rgba(0,0,0,.7)",
        }}
      />
      {/* specular highlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, rgba(255,255,255,.35), transparent 38%)",
          mixBlendMode: "screen",
        }}
      />
      {/* cloud overlay */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-full opacity-50 ${spin ? "earth-spin" : ""}`}
        style={{
          animationDuration: "200s",
          backgroundImage:
            "radial-gradient(ellipse at 20% 40%, rgba(255,255,255,.5), transparent 35%), radial-gradient(ellipse at 70% 60%, rgba(255,255,255,.4), transparent 40%), radial-gradient(ellipse at 50% 20%, rgba(255,255,255,.3), transparent 30%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}