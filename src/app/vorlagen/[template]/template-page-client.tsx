"use client";

import * as React from "react";
import Link from "next/link";
import { templates } from "@/lib/templates";
import { TemplateForm } from "@/components/TemplateForm";
import { PDFPreview } from "@/components/PDFPreview";
import { TemplatePdfDocument } from "@/lib/pdf-generator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export function TemplatePageClient({ templateSlug }: { templateSlug: string }) {
  const template = templates.find((item) => item.slug === templateSlug);
  const [values, setValues] = React.useState<Record<string, string>>({});

  if (!template) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/vorlagen">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Vorlagen
          </Link>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link href="/">
            <Home className="h-4 w-4 mr-1" />
            Dashboard
          </Link>
        </Button>
      </div>

      <Card className="border border-border/60 bg-card/70">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {template.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {template.summary}
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <TemplateForm
          template={template}
          values={values}
          onChange={setValues}
        />
        <PDFPreview
          title="PDF Vorschau"
          fileName={`${template.slug}.pdf`}
          document={<TemplatePdfDocument template={template} values={values} />}
        />
      </div>
    </div>
  );
}
