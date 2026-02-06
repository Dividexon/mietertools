import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { TemplateDefinition, fillTemplateText } from "@/lib/templates";

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 11,
    lineHeight: 1.6,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 11,
    color: "#4B5563",
  },
  section: {
    marginTop: 12,
  },
  paragraph: {
    marginBottom: 8,
  },
  divider: {
    marginTop: 16,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  coverTitle: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    marginBottom: 10,
  },
  coverLine: {
    marginBottom: 6,
  },
  signatureSection: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 16,
  },
  signatureLabel: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 4,
  },
  signatureImage: {
    width: 150,
    height: 60,
    objectFit: "contain",
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    width: 200,
    marginTop: 8,
  },
});

function TemplateBody({
  template,
  values,
}: {
  template: TemplateDefinition;
  values: Record<string, string | number | undefined>;
}) {
  const content = fillTemplateText(template.legalText, values);
  const signatureDataUrl = values.signature as string | undefined;
  
  // Remove the "Unterschrift: ______" line from content if we have a real signature
  const contentWithoutSignaturePlaceholder = signatureDataUrl 
    ? content.replace(/Unterschrift[^:]*:\s*_+/g, "Unterschrift:")
    : content;

  return (
    <View style={styles.section}>
      <Text style={styles.paragraph}>{contentWithoutSignaturePlaceholder}</Text>
      
      {/* Signature Image */}
      {signatureDataUrl && signatureDataUrl.startsWith("data:image") && (
        <View style={styles.signatureSection}>
          <View>
            <Text style={styles.signatureLabel}>Unterschrift:</Text>
            <Image src={signatureDataUrl} style={styles.signatureImage} />
            <View style={styles.signatureLine} />
          </View>
        </View>
      )}
    </View>
  );
}

export function TemplatePdfDocument({
  template,
  values,
}: {
  template: TemplateDefinition;
  values: Record<string, string | number | undefined>;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{template.title}</Text>
          <Text style={styles.subtitle}>
            Mietertools · Dokumentenvorlage
          </Text>
        </View>
        <TemplateBody template={template} values={values} />
      </Page>
    </Document>
  );
}

export function BundlePdfDocument({
  applicant,
  selectedTemplates,
}: {
  applicant: Record<string, string | number | undefined>;
  selectedTemplates: TemplateDefinition[];
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.coverTitle}>Bewerbungsmappe</Text>
        <Text style={styles.coverLine}>Bewerber:in: {applicant.fullName ?? "—"}</Text>
        <Text style={styles.coverLine}>E-Mail: {applicant.email ?? "—"}</Text>
        <Text style={styles.coverLine}>Telefon: {applicant.phone ?? "—"}</Text>
        <Text style={styles.coverLine}>Adresse: {applicant.address ?? "—"}</Text>
        <Text style={styles.coverLine}>Einzug: {applicant.moveInDate ?? "—"}</Text>
        <View style={styles.divider} />
        <Text style={{ marginTop: 12 }}>
          Enthaltene Dokumente:
        </Text>
        {selectedTemplates.length === 0 ? (
          <Text style={styles.paragraph}>Keine Vorlagen ausgewählt.</Text>
        ) : (
          selectedTemplates.map((template) => (
            <Text key={template.slug} style={styles.paragraph}>
              • {template.title}
            </Text>
          ))
        )}
      </Page>
      {selectedTemplates.map((template) => (
        <Page key={template.slug} size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>{template.title}</Text>
            <Text style={styles.subtitle}>Bewerbungsmappe</Text>
          </View>
          <TemplateBody template={template} values={applicant} />
        </Page>
      ))}
    </Document>
  );
}
