import { notFound } from "next/navigation";
import { tips } from "@/lib/templates";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return tips.map((tip) => ({ slug: tip.slug }));
}

export default function TipPage({ params }: PageProps) {
  const tip = tips.find((item) => item.slug === params.slug);
  if (!tip) {
    notFound();
  }

  return (
    <Card className="border border-border/60 bg-card/80">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">{tip.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <p className="text-base text-foreground">{tip.summary}</p>
        <ul className="space-y-3">
          {tip.content.map((item) => (
            <li key={item} className="rounded-md border border-border/60 p-3">
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
