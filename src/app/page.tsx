import Link from "next/link";
import { templates } from "@/lib/templates";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-6">
          <Badge className="w-fit bg-primary text-primary-foreground">
            Mariplex Tenant Tools
          </Badge>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
            Mietdokumente schneller erstellen. In Minuten zur fertigen Bewerbung.
          </h1>
          <p className="text-lg text-muted-foreground">
            Mietertools bündelt die wichtigsten Vorlagen, generiert PDFs und
            erstellt Ihre Bewerbungsmappe im deutschen Format – mobilfreundlich
            und sofort druckbereit.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/vorlagen/mieterselbstauskunft">Jetzt starten</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/bewerbungsmappe">Bewerbungsmappe bauen</Link>
            </Button>
          </div>
        </div>
        <Card className="border border-border/60 bg-card/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Schnellüberblick
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>✓ 5 deutsche Mietvorlagen mit Platzhaltern</p>
            <p>✓ PDF-Generierung & Druckansicht</p>
            <p>✓ Bewerbungsmappen-Generator mit Deckblatt</p>
            <p>✓ Tipps für SCHUFA & Besichtigungen</p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Vorlagen</h2>
            <p className="text-sm text-muted-foreground">
              Wählen Sie eine Vorlage und füllen Sie die Felder aus.
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/vorlagen/mieterselbstauskunft">Alle ansehen</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {templates.map((template) => (
            <Card
              key={template.slug}
              className="border border-border/60 bg-card/80"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {template.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>{template.summary}</p>
                <Button asChild size="sm">
                  <Link href={`/vorlagen/${template.slug}`}>
                    Vorlage öffnen
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Card className="border border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">PDF-Generator</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Ausgefüllte Felder werden automatisch in juristische Vorlagen
            eingesetzt und als PDF exportiert.
          </CardContent>
        </Card>
        <Card className="border border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Bewerbungsmappe
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Kombinieren Sie mehrere Dokumente zu einer einzigen, strukturierten
            PDF-Datei.
          </CardContent>
        </Card>
        <Card className="border border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Tipps</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Checklisten und Hinweise rund um SCHUFA, Besichtigung und Bewerbung.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
