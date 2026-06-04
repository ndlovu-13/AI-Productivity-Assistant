import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ListChecks, Loader2 } from "lucide-react";
import { planTasks } from "@/lib/ai.functions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MarkdownOutput, AiDisclaimer, PageHeader } from "@/components/ai/Shared";

export const Route = createFileRoute("/tasks")({
  head: () => ({ meta: [{ title: "AI Task Planner" }] }),
  component: TasksPage,
});

function TasksPage() {
  const fn = useServerFn(planTasks);
  const [tasks, setTasks] = useState("");
  const [hours, setHours] = useState(8);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    if (!tasks.trim()) { toast.error("Add your tasks first."); return; }
    setLoading(true); setOutput("");
    try { const res = await fn({ data: { tasks, hoursAvailable: hours } }); setOutput(res.text); }
    catch (e) { toast.error("Failed to plan."); console.error(e); }
    finally { setLoading(false); }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader icon={ListChecks} title="AI Task Planner" description="Prioritize and time-block your day." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Your tasks</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tasks (one per line)</Label>
              <Textarea value={tasks} onChange={(e) => setTasks(e.target.value)} rows={12} placeholder={"Finish Q3 report\nReply to client emails\nPrep for 3pm demo\n..."} />
            </div>
            <div className="space-y-2">
              <Label>Hours available today</Label>
              <Input type="number" min={1} max={24} value={hours} onChange={(e) => setHours(Number(e.target.value) || 8)} />
            </div>
            <Button onClick={onSubmit} disabled={loading} className="w-full bg-gradient-primary">
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Planning...</> : "Plan My Day"}
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Your plan</CardTitle></CardHeader>
          <CardContent>
            {loading && <div className="space-y-2"><div className="h-4 w-1/2 animate-pulse rounded bg-muted" /><div className="h-4 w-full animate-pulse rounded bg-muted" /></div>}
            {!loading && !output && <p className="text-sm text-muted-foreground">Your prioritized schedule will appear here.</p>}
            {output && <MarkdownOutput text={output} />}
            {output && <AiDisclaimer />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
