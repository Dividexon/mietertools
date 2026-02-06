"use client";

import * as React from "react";
import { templates } from "@/lib/templates";
import { BundlePdfDocument } from "@/lib/pdf-generator";
import { PDFPreview } from "@/components/PDFPreview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function BewerbungsmappePage() {
  const [applicant, setApplicant] = React.useState<Record<string, string>>({});
  const [selected, setSelected] = React.useState<string[]>(
    templates.map((template) => template.slug)
  );

  const selectedTemplates = templates.filter((template) =>
    selected.includes(template.slug)
  );

  const updateApplicant = (key: string, value: string) => {
    setApplicant((prev) => ({ ...prev, [key]: value }));
  };

  const toggleTemplate = (slug: string) => {
    setSelected((prev) =>
      prev.includes(slug)
        ? prev.filter((item) => item !== slug)
        : [...prev, slug]
    );
  };

  return (
    <div className="space-y-8">
      <Card className="border border-border/60 bg-card/70">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Bewerbungsmappe Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Kombinieren Sie mehrere Dokumente zu einer einzigen PDF-Datei inklusive
          Deckblatt.
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="border border-border/60 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Bewerber:in
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <label className="grid gap-2">
              <span className="font-medium">Vollständiger Name</span>
              <Input
                value={applicant.fullName ?? ""}
                onChange={(event) =>
                  updateApplicant("fullName", event.target.value)
                }
                placeholder="z.B. Lara Hoffmann"
              />
            </label>
            <label className="grid gap-2">
              <span className="font-medium">E-Mail</span>
              <Input
                type="email"
                value={applicant.email ?? ""}
                onChange={(event) => updateApplicant("email", event.target.value)}
                placeholder="name@email.de"
              />
            </label>
            <label className="grid gap-2">
              <span className="font-medium">Telefon</span>
              <Input
                type="tel"
                value={applicant.phone ?? ""}
                onChange={(event) => updateApplicant("phone", event.target.value)}
                placeholder="z.B. 0176 1234567"
              />
            </label>
            <label className="grid gap-2">
              <span className="font-medium">Adresse</span>
              <Textarea
                value={applicant.address ?? ""}
                onChange={(event) =>
                  updateApplicant("address", event.target.value)
                }
                placeholder="Straße, PLZ, Stadt"
                rows={3}
              />
            </label>
            <label className="grid gap-2">
              <span className="font-medium">Gewünschter Einzug</span>
              <Input
                type="date"
                value={applicant.moveInDate ?? ""}
                onChange={(event) =>
                  updateApplicant("moveInDate", event.target.value)
                }
              />
            </label>
          </CardContent>
        </Card>

        <Card className="border border-border/60 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Dokumente auswählen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {templates.map((template) => (
              <label
                key={template.slug}
                className="flex items-center gap-3 rounded-md border border-border/60 px-3 py-2"
              >
                <Checkbox
                  checked={selected.includes(template.slug)}
                  onCheckedChange={() => toggleTemplate(template.slug)}
                />
                <span className="font-medium text-foreground">
                  {template.title}
                </span>
              </label>
            ))}
          </CardContent>
        </Card>
      </div>

      <PDFPreview
        title="Bewerbungsmappe Vorschau"
        fileName="bewerbungsmappe.pdf"
        document={
          <BundlePdfDocument
            applicant={applicant}
            selectedTemplates={selectedTemplates}
          />
        }
      />
    </div>
  );
}
