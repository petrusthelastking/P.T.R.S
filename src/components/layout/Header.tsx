"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const isLibraryPage = pathname?.startsWith("/library");

  const getLinkClass = (path: string) => {
    let isActive = false;
    if (path === "/library") {
      isActive = pathname === "/library";
    } else if (path === "/library/riset-blockchain") {
      isActive = pathname?.startsWith("/library/riset-blockchain") || false;
    } else {
      isActive = pathname === path;
    }
      
    return isActive
      ? "font-bold text-sm text-[#1a1a1a] relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#1a1a1a] transition-all"
      : "font-medium text-sm text-[#666] hover:text-[#1a1a1a] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1a1a1a] hover:after:w-full after:transition-all after:duration-300";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-gray bg-sand/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Logo PNG */}
          <Image
            src="/logo.png"
            alt="P.T.R.S Logo"
            width={48}
            height={48}
            className="w-10 h-10 md:w-12 md:h-12 object-contain group-hover:scale-105 transition-transform"
            priority
          />
          <span className="font-bebas text-2xl tracking-wider text-[#1a1a1a]">
            <span className="text-accent-red">P</span>.T.R.S
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-10">
          {isLibraryPage ? (
            <>
              <Link
                href="/library"
                className={getLinkClass("/library")}
              >
                Home
              </Link>
              <Link
                href="/library/riset-blockchain"
                className={getLinkClass("/library/riset-blockchain")}
              >
                Riset Blockchain
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/"
                className={getLinkClass("/")}
              >
                Home
              </Link>
              <Link
                href="/portfolio"
                className={getLinkClass("/portfolio")}
              >
                Portfolio
              </Link>
              <Link
                href="/about"
                className={getLinkClass("/about")}
              >
                About
              </Link>
            </>
          )}
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

