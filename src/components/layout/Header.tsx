import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-gray bg-sand/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-3 group">
          {/* Logo PNG */}
          <Image
            src="/LOGO SAYA.png"
            alt="P.T.R.S Logo"
            width={48}
            height={48}
            className="w-12 h-12 object-contain"
          />
          <span className="font-bebas text-2xl tracking-wider text-[#1a1a1a]">
            <span className="text-accent-red">P</span>.T.R.S
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-10">
          <Link
            href="#home"
            className="font-bold text-sm text-[#1a1a1a] relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#1a1a1a] transition-all"
          >
            Home
          </Link>
          <Link
            href="#portfolio"
            className="font-medium text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
          >
            Portfolio
          </Link>
          <Link
            href="#about"
            className="font-medium text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
          >
            About
          </Link>
          <Link
            href="#library"
            className="font-medium text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
          >
            Library
          </Link>
        </nav>

        {/* Status Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#eae8e4]/50 border border-border-gray shadow-none text-xs font-bold text-[#1a1a1a] hover:bg-[#eae8e4]/85 transition-colors cursor-default">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Open to work</span>
        </div>
      </div>
    </header>
  );
}
export default Header;
