import { notFound } from "next/navigation";
import { templates } from "@/lib/templates";
import { TemplatePageClient } from "@/app/vorlagen/[template]/template-page-client";

type PageProps = {
  params: { template: string };
};

export function generateStaticParams() {
  return templates.map((template) => ({ template: template.slug }));
}

export default function TemplatePage({ params }: PageProps) {
  const template = templates.find((item) => item.slug === params.template);
  if (!template) {
    notFound();
  }

  return <TemplatePageClient templateSlug={template.slug} />;
}
