import Link from "next/link";
import { tips } from "@/lib/templates";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TipsIndexPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Tipps & Checklisten</h1>
        <p className="text-sm text-muted-foreground">
          Kurze Leitfäden für SCHUFA, Bewerbung und Besichtigung.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {tips.map((tip) => (
          <Card key={tip.slug} className="border border-border/60 bg-card/80">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{tip.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>{tip.summary}</p>
              <Button asChild size="sm">
                <Link href={`/tipps/${tip.slug}`}>Tipps lesen</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
