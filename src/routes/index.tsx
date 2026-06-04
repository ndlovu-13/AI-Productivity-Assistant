import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, FileText, ListChecks, Search, MessageSquare, Sparkles, ArrowRight } from "lucide-react";

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
  { url: "/email", icon: Mail, title: "Smart Email Generator", desc: "Draft polished emails by tone and audience." },
  { url: "/notes", icon: FileText, title: "Meeting Notes Summarizer", desc: "Extract key points, actions, and deadlines." },
  { url: "/tasks", icon: ListChecks, title: "AI Task Planner", desc: "Prioritize and time-block your day." },
  { url: "/research", icon: Search, title: "AI Research Assistant", desc: "Get structured insights on any topic." },
  { url: "/chat", icon: MessageSquare, title: "AI Chatbot", desc: "Ask anything about your workday." },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-10 rounded-2xl bg-gradient-primary p-8 text-primary-foreground shadow-elegant md:p-12">
        <div className="flex items-center gap-2 text-sm opacity-90">
          <Sparkles className="h-4 w-4" /> Powered by Lovable AI
        </div>
        <h1 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
          Your AI-powered workday, organized.
        </h1>
        <p className="mt-2 max-w-2xl text-sm opacity-90 md:text-base">
          Automate writing, planning, and research so you can focus on the work that matters.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Link key={f.url} to={f.url} className="group">
            <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-elegant">
              <CardHeader>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <f.icon className="h-5 w-5" />
                </div>
                <CardTitle className="font-display">{f.title}</CardTitle>
                <CardDescription>{f.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <p className="mt-10 text-xs text-muted-foreground italic">
        AI-generated content may require human review.
      </p>
    </div>
  );
}
