export function StarField({ density = 120 }: { density?: number }) {
  const stars = Array.from({ length: density });
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {stars.map((_, i) => {
        const size = Math.random() * 2 + 0.5;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: size,
              height: size,
              opacity: Math.random() * 0.7 + 0.15,
              boxShadow: `0 0 ${size * 4}px rgba(255,255,255,${Math.random() * 0.5})`,
              animation: `pulse ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}