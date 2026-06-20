import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Earth" },
  { to: "/control", label: "Control" },
  { to: "/onboarding", label: "Onboarding" },
  { to: "/simulator", label: "2050" },
  { to: "/dual", label: "Dual" },
  { to: "/scanner", label: "Scanner" },
  { to: "/missions", label: "Missions" },
  { to: "/social", label: "Social" },
  { to: "/gaia", label: "GAIA" },
] as const;

export function Nav() {
  return (
    <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <nav className="glass-strong flex items-center gap-1 rounded-full px-2 py-1.5 shadow-bloom">
        <Link
          to="/"
          className="px-3 py-1.5 text-[11px] font-semibold tracking-[0.25em] text-aurora"
        >
          EARTH-X
        </Link>
        <span className="mx-1 h-4 w-px bg-border" />
        {links.slice(1).map((l) => (
          <Link
            key={l.to}
            to={l.to}
            activeProps={{ className: "bg-primary/15 text-primary" }}
            className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}