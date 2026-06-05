import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, FileText, ListChecks, Search, MessageSquare, Sparkles, ArrowUpRight, Zap, Clock, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AI Workplace Productivity Assistant" },
      { name: "description", content: "Automate emails, meeting notes, planning, research, and more with AI." },
    ],
  }),
  component: Dashboard,
});

const features = [
  { url: "/email", icon: Mail, title: "Email Generator", desc: "Draft polished emails by tone and audience.", accent: "from-emerald-300/30 to-teal-400/10" },
  { url: "/notes", icon: FileText, title: "Meeting Notes", desc: "Extract key points, actions, and deadlines.", accent: "from-cyan-300/30 to-emerald-400/10" },
  { url: "/tasks", icon: ListChecks, title: "Task Planner", desc: "Prioritize and time-block your day.", accent: "from-teal-300/30 to-emerald-400/10" },
  { url: "/research", icon: Search, title: "Research", desc: "Get structured insights on any topic.", accent: "from-emerald-300/30 to-cyan-400/10" },
  { url: "/chat", icon: MessageSquare, title: "AI Chat", desc: "Ask anything about your workday.", accent: "from-lime-300/30 to-teal-400/10" },
];

const stats = [
  { icon: Zap, label: "Avg. response", value: "1.2s" },
  { icon: Clock, label: "Hours saved / wk", value: "8.5" },
  { icon: TrendingUp, label: "Tasks automated", value: "1,240" },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl">
      {/* Hero */}
      <div className="relative mb-10 overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-card md:p-12">
        <div className="absolute inset-0 bg-gradient-aurora opacity-90" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-primary opacity-30 blur-3xl animate-pulse-glow" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-border glass px-3 py-1 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <Sparkles className="h-3 w-3" /> Powered by Lovable AI
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight md:text-6xl">
            Your AI-powered <span className="text-gradient">workday</span>, organized.
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            Automate writing, planning, and research so you can focus on the work that matters most.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3 md:max-w-xl">
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-4">
                <s.icon className="h-4 w-4 text-primary" />
                <div className="mt-2 font-display text-xl font-semibold md:text-2xl">{s.value}</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature grid */}
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold">Tools</h2>
          <p className="text-sm text-muted-foreground">Five focused assistants for everyday work.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Link key={f.url} to={f.url} className="group relative">
            <Card className="relative h-full overflow-hidden border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
              <div className={`pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${f.accent} blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
              <CardHeader>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-gradient-primary text-primary-foreground shadow-elegant">
                  <f.icon className="h-5 w-5" />
                </div>
                <CardTitle className="font-display text-lg">{f.title}</CardTitle>
                <CardDescription>{f.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Open
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <p className="mt-10 text-xs italic text-muted-foreground">
        AI-generated content may require human review.
      </p>
    </div>
  );
}
