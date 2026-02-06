"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <Image
            src="/mariplex-logo.png"
            alt="Mariplex Logo"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
            priority
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
              Mietertools
            </span>
            <span className="text-[10px] font-medium text-muted-foreground -mt-0.5">
              by Mariplex
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link 
            href="/vorlagen" 
            className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-accent"
          >
            Vorlagen
          </Link>
          <Link 
            href="/bewerbungsmappe" 
            className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-accent"
          >
            Bewerbungsmappe
          </Link>
          <Link 
            href="/tipps" 
            className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-accent"
          >
            Tipps
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden md:inline-flex bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-700 hover:to-violet-700 text-white border-0">
            <Link href="/vorlagen/mieterselbstauskunft">Jetzt starten</Link>
          </Button>
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            <Link 
              href="/vorlagen" 
              className="px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Vorlagen
            </Link>
            <Link 
              href="/bewerbungsmappe" 
              className="px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Bewerbungsmappe
            </Link>
            <Link 
              href="/tipps" 
              className="px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tipps
            </Link>
            <div className="mt-2 px-3">
              <Button asChild size="sm" className="w-full bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-700 hover:to-violet-700 text-white border-0">
                <Link href="/vorlagen/mieterselbstauskunft" onClick={() => setMobileMenuOpen(false)}>
                  Jetzt starten
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
