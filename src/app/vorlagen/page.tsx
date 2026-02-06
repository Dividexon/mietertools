import Link from "next/link";
import { templates } from "@/lib/templates";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TemplatesIndexPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Vorlagenübersicht</h1>
        <p className="text-sm text-muted-foreground">
          Alle Mietdokumente mit Platzhaltern und PDF-Export.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {templates.map((template) => (
          <Card key={template.slug} className="border border-border/60 bg-card/80">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {template.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>{template.summary}</p>
              <Button asChild size="sm">
                <Link href={`/vorlagen/${template.slug}`}>Öffnen</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
