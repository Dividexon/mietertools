export type TemplateFieldType =
  | "text"
  | "textarea"
  | "email"
  | "tel"
  | "date"
  | "number";

export type TemplateField = {
  name: string;
  label: string;
  type: TemplateFieldType;
  placeholder?: string;
  required?: boolean;
  hint?: string;
};

export type TemplateDefinition = {
  slug: string;
  title: string;
  summary: string;
  legalText: string;
  fields: TemplateField[];
};

const commonFields: TemplateField[] = [
  {
    name: "place",
    label: "Ort",
    type: "text",
    placeholder: "z.B. Berlin",
    required: true,
  },
  {
    name: "date",
    label: "Datum",
    type: "date",
    required: true,
  },
];

export const templates: TemplateDefinition[] = [
  {
    slug: "mieterselbstauskunft",
    title: "Mieterselbstauskunft",
    summary:
      "Persönliche Angaben, Beschäftigung und Vorvermieter als strukturierte Selbstauskunft.",
    legalText: `Mieterselbstauskunft

Ich, {{fullName}}, geboren am {{birthDate}}, wohnhaft in {{address}}, erkläre die nachfolgenden Angaben wahrheitsgemäß.

Kontakt:
E-Mail: {{email}}
Telefon: {{phone}}

Beschäftigung:
Arbeitgeber: {{employer}}
Position: {{jobTitle}}
Nettohaushaltseinkommen: {{income}} EUR

Vorvermieter:
{{previousLandlord}}

Geplanter Einzug: {{moveInDate}}

Ich versichere, dass keine Mietrückstände bestehen und ich meine Mietzahlungen stets fristgerecht geleistet habe.

Ort, Datum: {{place}}, {{date}}

Unterschrift: ______________________________`,
    fields: [
      { name: "fullName", label: "Vollständiger Name", type: "text", required: true },
      { name: "birthDate", label: "Geburtsdatum", type: "date", required: true },
      { name: "address", label: "Aktuelle Adresse", type: "textarea", required: true },
      { name: "email", label: "E-Mail", type: "email", required: true },
      { name: "phone", label: "Telefon", type: "tel", required: true },
      { name: "employer", label: "Arbeitgeber", type: "text", required: true },
      { name: "jobTitle", label: "Position / Beruf", type: "text", required: true },
      {
        name: "income",
        label: "Nettohaushaltseinkommen (monatlich)",
        type: "number",
        placeholder: "z.B. 3200",
        required: true,
      },
      {
        name: "previousLandlord",
        label: "Vorvermieter (Name, Kontakt)",
        type: "textarea",
      },
      { name: "moveInDate", label: "Gewünschter Einzugstermin", type: "date" },
      ...commonFields,
    ],
  },
  {
    slug: "vermieterbescheinigung",
    title: "Vermieterbescheinigung",
    summary:
      "Bestätigung des bisherigen Vermieters über das Mietverhältnis und das Zahlungsverhalten.",
    legalText: `Vermieterbescheinigung

Hiermit bestätige ich, {{landlordName}}, als Vermieter der Wohnung {{propertyAddress}}, dass {{tenantName}} dort im Zeitraum {{tenancyPeriod}} wohnhaft war.

Während des Mietverhältnisses wurden die Mietzahlungen regelmäßig und vollständig geleistet. Beanstandungen wegen vertragswidrigen Verhaltens lagen nicht vor.

Ort, Datum: {{place}}, {{date}}

Unterschrift Vermieter: ______________________________`,
    fields: [
      { name: "landlordName", label: "Name Vermieter:in", type: "text", required: true },
      { name: "tenantName", label: "Name Mieter:in", type: "text", required: true },
      {
        name: "propertyAddress",
        label: "Adresse der Wohnung",
        type: "textarea",
        required: true,
      },
      {
        name: "tenancyPeriod",
        label: "Mietzeitraum",
        type: "text",
        placeholder: "z.B. 01.02.2022 – 31.01.2026",
        required: true,
      },
      ...commonFields,
    ],
  },
  {
    slug: "wohnungsgeberbestaetigung",
    title: "Wohnungsgeberbestätigung",
    summary:
      "Bestätigung für das Einwohnermeldeamt gemäß Bundesmeldegesetz.",
    legalText: `Wohnungsgeberbestätigung nach § 19 Bundesmeldegesetz (BMG)

Wohnungsgeber: {{landlordName}}
Anschrift der Wohnung: {{propertyAddress}}

Einziehende Person(en):
{{tenantNames}}

Einzugsdatum: {{moveInDate}}

Ort, Datum: {{place}}, {{date}}

Unterschrift Wohnungsgeber: ______________________________`,
    fields: [
      { name: "landlordName", label: "Wohnungsgeber (Name)", type: "text", required: true },
      {
        name: "propertyAddress",
        label: "Adresse der Wohnung",
        type: "textarea",
        required: true,
      },
      {
        name: "tenantNames",
        label: "Einziehende Person(en)",
        type: "textarea",
        placeholder: "Mehrere Personen in einer Zeile",
        required: true,
      },
      { name: "moveInDate", label: "Einzugsdatum", type: "date", required: true },
      ...commonFields,
    ],
  },
  {
    slug: "mietschuldenfreiheitsbescheinigung",
    title: "Mietschuldenfreiheitsbescheinigung",
    summary:
      "Bestätigung, dass keine Mietrückstände bestehen und die Miete regelmäßig gezahlt wurde.",
    legalText: `Mietschuldenfreiheitsbescheinigung

Hiermit bestätige ich, {{landlordName}}, dass {{tenantName}} für die Wohnung {{propertyAddress}} im Zeitraum {{tenancyPeriod}} keinerlei Mietrückstände hatte.

Die Mieten wurden vollständig und pünktlich gezahlt. Es bestehen keine offenen Forderungen aus dem Mietverhältnis.

Ort, Datum: {{place}}, {{date}}

Unterschrift Vermieter: ______________________________`,
    fields: [
      { name: "landlordName", label: "Name Vermieter:in", type: "text", required: true },
      { name: "tenantName", label: "Name Mieter:in", type: "text", required: true },
      {
        name: "propertyAddress",
        label: "Adresse der Wohnung",
        type: "textarea",
        required: true,
      },
      {
        name: "tenancyPeriod",
        label: "Mietzeitraum",
        type: "text",
        placeholder: "z.B. 01.02.2022 – 31.01.2026",
        required: true,
      },
      ...commonFields,
    ],
  },
  {
    slug: "buergschaftserklaerung",
    title: "Bürgschaftserklärung",
    summary:
      "Erklärung einer bürgenden Person zur Übernahme von Mietverpflichtungen.",
    legalText: `Bürgschaftserklärung

Ich, {{guarantorName}}, wohnhaft in {{guarantorAddress}}, erkläre mich bereit, für die Mietverpflichtungen von {{tenantName}} aus dem Mietverhältnis über die Wohnung {{propertyAddress}} einzustehen.

Beziehung zur/m Mieter: {{relationship}}
Nettoeinkommen des Bürgen: {{guarantorIncome}} EUR

Die Bürgschaft gilt bis zu einem Höchstbetrag von {{guaranteeAmount}} EUR.

Ort, Datum: {{place}}, {{date}}

Unterschrift Bürge: ______________________________`,
    fields: [
      { name: "guarantorName", label: "Name Bürge:in", type: "text", required: true },
      {
        name: "guarantorAddress",
        label: "Adresse Bürge:in",
        type: "textarea",
        required: true,
      },
      { name: "tenantName", label: "Name Mieter:in", type: "text", required: true },
      {
        name: "propertyAddress",
        label: "Adresse der Wohnung",
        type: "textarea",
        required: true,
      },
      {
        name: "relationship",
        label: "Beziehung zum/zur Mieter:in",
        type: "text",
        placeholder: "z.B. Vater, Freundin, Arbeitgeber",
      },
      {
        name: "guarantorIncome",
        label: "Nettoeinkommen Bürge:in (monatlich)",
        type: "number",
        required: true,
      },
      {
        name: "guaranteeAmount",
        label: "Höchstbetrag der Bürgschaft",
        type: "number",
        required: true,
      },
      ...commonFields,
    ],
  },
];

export const tips = [
  {
    slug: "schufa",
    title: "Kostenlose SCHUFA-Selbstauskunft",
    summary:
      "So beantragen Sie die kostenlose Datenkopie nach Art. 15 DSGVO.",
    content: [
      "Jede Person in Deutschland kann einmal pro Jahr eine kostenlose Datenkopie nach Art. 15 DSGVO bei der SCHUFA anfordern.",
      "Die Datenkopie ist nicht identisch mit der kostenpflichtigen Bonitätsauskunft. Für Vermieter reicht die kostenlose Variante in vielen Fällen aus, sofern keine Score-Übersicht verlangt wird.",
      "Nutzen Sie das Online-Formular, laden Sie Ausweis- und Adressnachweis hoch und rechnen Sie mit einigen Tagen Bearbeitungszeit.",
      "Planen Sie die Anfrage frühzeitig, damit die Unterlagen rechtzeitig zur Bewerbung vorliegen.",
    ],
  },
  {
    slug: "bewerbung",
    title: "Bewerbungstipps",
    summary: "Darauf achten Vermieter bei der Auswahl der Mieter:innen.",
    content: [
      "Unterlagen vollständig vorbereiten: Selbstauskunft, Einkommensnachweis, SCHUFA, Ausweiskopie.",
      "Anschreiben kurz, freundlich und konkret: Wer zieht ein? Ab wann? Warum passt die Wohnung?",
      "Zuverlässigkeit zeigen: pünktlich sein, Nachfragen zügig beantworten, alle Dokumente geordnet einreichen.",
      "Bei Unsicherheiten ergänzende Dokumente anbieten, etwa eine Bürgschaft oder Mietschuldenfreiheitsbescheinigung.",
    ],
  },
  {
    slug: "besichtigung",
    title: "Checkliste für die Wohnungsbesichtigung",
    summary: "Schnell prüfen, ob Wohnung und Umgebung passen.",
    content: [
      "Zustand prüfen: Fenster, Heizung, Sanitär, Steckdosen, Feuchtigkeit.",
      "Lärm und Nachbarschaft einschätzen: Tageszeit, Straßenlage, Treppenhaus.",
      "Nebenkosten klären: Heizart, Vorauszahlungen, vergangene Abrechnungen.",
      "Fragen stellen: Kündigungsfristen, Staffelmiete, Renovierungspflichten.",
    ],
  },
];

export function fillTemplateText(
  text: string,
  values: Record<string, string | number | undefined>
) {
  return text.replace(/{{\s*([\w]+)\s*}}/g, (_, key) => {
    const value = values[key];
    if (value === undefined || value === null || value === "") {
      return "—";
    }
    return String(value);
  });
}
