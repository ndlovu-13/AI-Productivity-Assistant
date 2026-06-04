import ReactMarkdown from "react-markdown";

export function MarkdownOutput({ text }: { text: string }) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-p:leading-relaxed prose-pre:bg-muted prose-pre:text-foreground">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}

export function AiDisclaimer() {
  return (
    <p className="mt-4 text-xs text-muted-foreground italic">
      AI-generated content may require human review.
    </p>
  );
}

export function PageHeader({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="mb-8 flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant">
        <Icon className="h-6 w-6 text-primary-foreground" />
      </div>
      <div>
        <h1 className="font-display text-3xl font-semibold">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
