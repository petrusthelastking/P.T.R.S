"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <header className="sticky top-0 z-50 w-full border-b border-border-gray bg-sand/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
          {/* Logo PNG */}
          <Image
            src="/logo.png"
            alt="P.T.R.S Logo"
            width={48}
            height={48}
            className="w-9 h-9 sm:w-12 sm:h-12 object-contain group-hover:scale-105 transition-transform"
            priority
          />
          <span className="font-bebas text-xl sm:text-2xl tracking-wider text-[#1a1a1a]">
            <span className="text-accent-red">P</span>.T.R.S
          </span>
        </Link>

        {/* Desktop Navigation Links */}
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

        {/* Right Section: Status Badge & Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#eae8e4]/80 border border-border-gray text-[11px] sm:text-xs font-bold text-[#1a1a1a] cursor-default">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Open to work</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-[#1a1a1a] hover:bg-black/5 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border-gray/60 bg-sand/95 backdrop-blur-lg px-6 py-4 flex flex-col gap-3 shadow-md">
          {isLibraryPage ? (
            <>
              <Link
                href="/library"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-[#1a1a1a] py-2 border-b border-border-gray/30"
              >
                Home Library
              </Link>
              <Link
                href="/library/riset-blockchain"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-[#1a1a1a] py-2"
              >
                Riset Blockchain
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-[#1a1a1a] py-2 border-b border-border-gray/30"
              >
                Home
              </Link>
              <Link
                href="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-[#1a1a1a] py-2 border-b border-border-gray/30"
              >
                Portfolio
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-[#1a1a1a] py-2"
              >
                About
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
