import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Mail, Loader2, Copy } from "lucide-react";
import { generateEmail } from "@/lib/ai.functions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { MarkdownOutput, AiDisclaimer, PageHeader } from "@/components/ai/Shared";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Smart Email Generator" }] }),
  component: EmailPage,
});

const tones = ["Professional", "Friendly", "Persuasive", "Apologetic", "Direct", "Enthusiastic"];

function EmailPage() {
  const fn = useServerFn(generateEmail);
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("Professional");
  const [topic, setTopic] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    if (!audience.trim() || !topic.trim()) {
      toast.error("Please fill in audience and topic.");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const res = await fn({ data: { audience, tone, topic } });
      setOutput(res.text);
    } catch (e) {
      toast.error("Failed to generate email.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        icon={Mail}
        title="Smart Email Generator"
        description="Draft polished emails tailored to your audience and tone."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Compose</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Audience</Label>
              <Input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g. Hiring manager at a tech company" />
            </div>
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {tones.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>What's the email about?</Label>
              <Textarea value={topic} onChange={(e) => setTopic(e.target.value)} rows={6} placeholder="Briefly describe the goal and any key points..." />
            </div>
            <Button onClick={onSubmit} disabled={loading} className="w-full bg-gradient-primary">
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : "Generate Email"}
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Draft</CardTitle>
            {output && (
              <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied"); }}>
                <Copy className="mr-1 h-4 w-4" /> Copy
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {loading && <div className="space-y-2"><div className="h-4 w-3/4 animate-pulse rounded bg-muted" /><div className="h-4 w-full animate-pulse rounded bg-muted" /><div className="h-4 w-5/6 animate-pulse rounded bg-muted" /></div>}
            {!loading && !output && <p className="text-sm text-muted-foreground">Your generated email will appear here.</p>}
            {output && <MarkdownOutput text={output} />}
            {output && <AiDisclaimer />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
