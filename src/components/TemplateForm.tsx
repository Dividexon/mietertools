"use client";

import * as React from "react";
import { TemplateDefinition, TemplateField } from "@/lib/templates";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignaturePad } from "@/components/SignaturePad";

type TemplateFormProps = {
  template: TemplateDefinition;
  values: Record<string, string>;
  onChange: (values: Record<string, string>) => void;
};

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: TemplateField;
  value: string;
  onChange: (value: string) => void;
}) {
  if (field.type === "signature") {
    return (
      <SignaturePad
        value={value}
        onChange={onChange}
        label={field.label}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholder}
        required={field.required}
        rows={4}
      />
    );
  }

  return (
    <Input
      type={field.type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={field.placeholder}
      required={field.required}
    />
  );
}

export function TemplateForm({ template, values, onChange }: TemplateFormProps) {
  const updateField = React.useCallback(
    (fieldName: string, value: string) => {
      onChange({ ...values, [fieldName]: value });
    },
    [onChange, values]
  );

  return (
    <Card className="border border-border/60 bg-card/80">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Angaben ausfüllen
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {template.fields.map((field) => (
          field.type === "signature" ? (
            <div key={field.name}>
              <FieldInput
                field={field}
                value={values[field.name] ?? ""}
                onChange={(value) => updateField(field.name, value)}
              />
            </div>
          ) : (
            <label key={field.name} className="grid gap-2 text-sm">
              <span className="font-medium">
                {field.label} {field.required ? "*" : ""}
              </span>
              <FieldInput
                field={field}
                value={values[field.name] ?? ""}
                onChange={(value) => updateField(field.name, value)}
              />
              {field.hint ? (
                <span className="text-xs text-muted-foreground">
                  {field.hint}
                </span>
              ) : null}
            </label>
          )
        ))}
      </CardContent>
    </Card>
  );
}
