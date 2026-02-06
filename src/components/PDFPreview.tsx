"use client";

import * as React from "react";
import { pdf } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type PDFPreviewProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: React.ReactElement<any>;
  fileName: string;
  title?: string;
};

export function PDFPreview({ document, fileName, title }: PDFPreviewProps) {
  const [blobUrl, setBlobUrl] = React.useState<string | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    setIsGenerating(true);
    setError(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pdf(document as any)
      .toBlob()
      .then((blob) => {
        if (cancelled) return;
        const url = URL.createObjectURL(blob);
        setBlobUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
      })
      .catch(() => {
        if (cancelled) return;
        setError("PDF konnte nicht erstellt werden.");
      })
      .finally(() => {
        if (!cancelled) setIsGenerating(false);
      });

    return () => {
      cancelled = true;
    };
  }, [document]);

  React.useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  const handlePrint = () => {
    if (!blobUrl) return;
    const win = window.open(blobUrl, "_blank");
    if (!win) return;
    win.addEventListener("load", () => win.print());
  };

  return (
    <Card className="border border-border/60 bg-card/80">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {title ?? "PDF Vorschau"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            disabled={!blobUrl || isGenerating}
            onClick={handlePrint}
            variant="secondary"
          >
            Drucken
          </Button>
          <Button asChild disabled={!blobUrl || isGenerating}>
            <a href={blobUrl ?? "#"} download={fileName}>
              PDF herunterladen
            </a>
          </Button>
          {isGenerating ? (
            <span className="text-xs text-muted-foreground">
              PDF wird aktualisiert…
            </span>
          ) : null}
        </div>
        <Separator />
        {error ? (
          <div className="text-sm text-destructive">{error}</div>
        ) : (
          <div className="aspect-[3/4] w-full overflow-hidden rounded-md border border-border/60">
            {blobUrl ? (
              <iframe
                title="PDF Vorschau"
                src={blobUrl}
                className="h-full w-full"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Vorschau wird geladen…
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
