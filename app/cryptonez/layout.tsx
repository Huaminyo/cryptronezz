import Link from "next/link";

const navItems = [
  { href: "/cryptonez", label: "Dashboard" },
  { href: "/cryptonez/tasks", label: "Tasks" },
  { href: "/cryptonez/referrals", label: "Referrals" },
  { href: "/cryptonez/leaderboard", label: "Leaderboard" },
  { href: "/cryptonez/admin", label: "Admin" },
  { href: "/marketing", label: "Marketing" }
];

export default function CryptonezLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <header className="glass rounded-xl p-4">
        <nav className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20">
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </div>
  );
}
