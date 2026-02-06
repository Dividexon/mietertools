"use client";

import * as React from "react";
import { templates } from "@/lib/templates";
import { TemplateForm } from "@/components/TemplateForm";
import { PDFPreview } from "@/components/PDFPreview";
import { TemplatePdfDocument } from "@/lib/pdf-generator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TemplatePageClient({ templateSlug }: { templateSlug: string }) {
  const template = templates.find((item) => item.slug === templateSlug);
  const [values, setValues] = React.useState<Record<string, string>>({});

  if (!template) {
    return null;
  }

  return (
    <div className="space-y-8">
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
