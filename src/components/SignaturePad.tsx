"use client";

import * as React from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Upload, Pen } from "lucide-react";

type SignaturePadProps = {
  value: string;
  onChange: (dataUrl: string) => void;
  label?: string;
};

export function SignaturePad({ value, onChange, label }: SignaturePadProps) {
  const sigCanvas = React.useRef<SignatureCanvas>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = React.useState<string>("draw");

  const clear = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
    onChange("");
  };

  const save = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
      onChange(dataUrl);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Bitte nur Bilddateien hochladen (PNG, JPG, etc.)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Die Datei ist zu groß. Maximal 5MB erlaubt.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      onChange(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="border border-border/60 bg-card/80">
      <CardContent className="pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{label || "Unterschrift"}</span>
          {value && (
            <Button variant="ghost" size="sm" onClick={clear} className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4 mr-1" />
              Löschen
            </Button>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="draw" className="text-xs">
              <Pen className="h-3 w-3 mr-1" />
              Zeichnen
            </TabsTrigger>
            <TabsTrigger value="upload" className="text-xs">
              <Upload className="h-3 w-3 mr-1" />
              Hochladen
            </TabsTrigger>
          </TabsList>

          <TabsContent value="draw" className="space-y-3">
            {value && activeTab === "draw" ? (
              <div className="border border-border rounded-md bg-white p-2">
                <img 
                  src={value} 
                  alt="Unterschrift" 
                  className="max-h-32 mx-auto"
                />
              </div>
            ) : (
              <>
                <div className="border border-border rounded-md bg-white overflow-hidden">
                  <SignatureCanvas
                    ref={sigCanvas}
                    canvasProps={{
                      className: "w-full h-32 cursor-crosshair",
                      style: { width: "100%", height: "128px" },
                    }}
                    backgroundColor="white"
                    penColor="black"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={clear}
                    className="flex-1"
                  >
                    Neu zeichnen
                  </Button>
                  <Button 
                    type="button" 
                    size="sm" 
                    onClick={save}
                    className="flex-1 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-700 hover:to-violet-700 text-white"
                  >
                    Übernehmen
                  </Button>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="upload" className="space-y-3">
            {value ? (
              <div className="border border-border rounded-md bg-white p-2">
                <img 
                  src={value} 
                  alt="Hochgeladene Unterschrift" 
                  className="max-h-32 mx-auto"
                />
              </div>
            ) : (
              <div 
                className="border-2 border-dashed border-border rounded-md p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Klicken oder Datei hierher ziehen
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG bis 5MB
                </p>
              </div>
            )}
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            {!value && (
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Bild auswählen
              </Button>
            )}
          </TabsContent>
        </Tabs>

        <p className="text-xs text-muted-foreground">
          Mit Ihrer Unterschrift bestätigen Sie die Richtigkeit der Angaben.
        </p>
      </CardContent>
    </Card>
  );
}
