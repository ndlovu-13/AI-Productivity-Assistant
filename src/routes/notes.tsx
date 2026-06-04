import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { FileText, Loader2 } from "lucide-react";
import { summarizeMeeting } from "@/lib/ai.functions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MarkdownOutput, AiDisclaimer, PageHeader } from "@/components/ai/Shared";

export const Route = createFileRoute("/notes")({
  head: () => ({ meta: [{ title: "Meeting Notes Summarizer" }] }),
  component: NotesPage,
});

function NotesPage() {
  const fn = useServerFn(summarizeMeeting);
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    if (notes.trim().length < 10) { toast.error("Please paste meeting notes."); return; }
    setLoading(true); setOutput("");
    try { const res = await fn({ data: { notes } }); setOutput(res.text); }
    catch (e) { toast.error("Failed to summarize."); console.error(e); }
    finally { setLoading(false); }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader icon={FileText} title="Meeting Notes Summarizer" description="Turn raw notes into key points, actions, and deadlines." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Paste notes</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Meeting notes or transcript</Label>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={16} placeholder="Paste your raw notes or transcript here..." />
            </div>
            <Button onClick={onSubmit} disabled={loading} className="w-full bg-gradient-primary">
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Summarizing...</> : "Summarize Meeting"}
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
          <CardContent>
            {loading && <div className="space-y-2"><div className="h-4 w-1/2 animate-pulse rounded bg-muted" /><div className="h-4 w-full animate-pulse rounded bg-muted" /><div className="h-4 w-2/3 animate-pulse rounded bg-muted" /></div>}
            {!loading && !output && <p className="text-sm text-muted-foreground">Structured summary will appear here.</p>}
            {output && <MarkdownOutput text={output} />}
            {output && <AiDisclaimer />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
