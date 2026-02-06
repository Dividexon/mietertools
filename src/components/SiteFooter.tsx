"use client";

import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/mariplex-logo.png"
                alt="Mariplex Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
                Mietertools
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Digitale Mietvorlagen für schnelle Bewerbungen. 
              Professionell, kostenlos und DSGVO-konform.
            </p>
          </div>

          {/* Links Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Navigation</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/vorlagen" className="hover:text-foreground transition-colors">
                Vorlagen
              </Link>
              <Link href="/bewerbungsmappe" className="hover:text-foreground transition-colors">
                Bewerbungsmappe
              </Link>
              <Link href="/tipps" className="hover:text-foreground transition-colors">
                Tipps & Ratgeber
              </Link>
            </nav>
          </div>

          {/* Vorlagen Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Beliebte Vorlagen</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/vorlagen/mieterselbstauskunft" className="hover:text-foreground transition-colors">
                Mieterselbstauskunft
              </Link>
              <Link href="/vorlagen/mietschuldenfreiheit" className="hover:text-foreground transition-colors">
                Mietschuldenfreiheit
              </Link>
              <Link href="/vorlagen/wohnungsuebergabe" className="hover:text-foreground transition-colors">
                Übergabeprotokoll
              </Link>
            </nav>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Branding */}
          <div className="flex items-center gap-2">
            <Image
              src="/mariplex-logo.png"
              alt="Mariplex"
              width={20}
              height={20}
              className="h-5 w-5 object-contain opacity-70"
            />
            <span className="text-sm font-medium text-muted-foreground">
              Mariplex Immobilien Tools
            </span>
          </div>

          {/* Copyright & Legal */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span>© {currentYear} Mariplex. Alle Rechte vorbehalten.</span>
            <span className="hidden md:inline">•</span>
            <span>Keine Rechtsberatung. Vorlagen dienen als Muster.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
