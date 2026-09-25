const LINKS = [
  { href: "#garden", label: "Garden" },
  { href: "#letter", label: "Letter" },
  { href: "#journey", label: "Journey" },
  { href: "#memories", label: "Memories" },
  { href: "#gift", label: "Gift" },
  { href: "#story", label: "Story" },
  { href: "#quiz", label: "Quiz" },
  { href: "#dreams", label: "Dreams" },
  { href: "#fly", label: "Fly" },
  { href: "#love-world", label: "Us" },
  { href: "#birthday", label: "Birthday" },
];

export default function SectionNav() {
  return (
    <nav
      aria-label="Page sections"
      className="sticky top-0 z-40 overflow-x-auto border-b border-gold/20 bg-plum-deep/80 px-2 py-2 pr-[8.5rem] backdrop-blur-md"
    >
      <ul className="mx-auto flex w-max min-w-full items-center justify-center gap-1 sm:gap-2">
        {LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="inline-flex min-h-[40px] items-center rounded-full px-3 py-1.5 font-body text-xs text-blossom/90 transition-colors hover:bg-plum-light hover:text-gold sm:text-sm"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
