import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Search, Loader2 } from "lucide-react";
import { researchTopic } from "@/lib/ai.functions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MarkdownOutput, AiDisclaimer, PageHeader } from "@/components/ai/Shared";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "AI Research Assistant" }] }),
  component: ResearchPage,
});

function ResearchPage() {
  const fn = useServerFn(researchTopic);
  const [topic, setTopic] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    if (topic.trim().length < 2) { toast.error("Enter a topic."); return; }
    setLoading(true); setOutput("");
    try { const res = await fn({ data: { topic } }); setOutput(res.text); }
    catch (e) { toast.error("Research failed."); console.error(e); }
    finally { setLoading(false); }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader icon={Search} title="AI Research Assistant" description="Get a structured briefing on any topic." />
      <Card className="mb-6">
        <CardContent className="flex gap-2 pt-6">
          <div className="flex-1 space-y-2">
            <Label className="sr-only">Topic</Label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Trends in B2B SaaS pricing for 2026"
              onKeyDown={(e) => e.key === "Enter" && onSubmit()}
            />
          </div>
          <Button onClick={onSubmit} disabled={loading} className="bg-gradient-primary">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Research"}
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Briefing</CardTitle></CardHeader>
        <CardContent>
          {loading && <div className="space-y-2"><div className="h-4 w-2/3 animate-pulse rounded bg-muted" /><div className="h-4 w-full animate-pulse rounded bg-muted" /><div className="h-4 w-4/5 animate-pulse rounded bg-muted" /></div>}
          {!loading && !output && <p className="text-sm text-muted-foreground">Enter a topic to generate insights.</p>}
          {output && <MarkdownOutput text={output} />}
          {output && <AiDisclaimer />}
        </CardContent>
      </Card>
    </div>
  );
}
