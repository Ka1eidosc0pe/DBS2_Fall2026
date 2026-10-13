import { CalendarCheck, CircleAlert, GlassWater, SearchX } from "lucide-react";
import { DoubleRule } from "./Ornament";
import { cx } from "./cx";

function Shell({ icon: Icon, title, children, actions, className, tone = "text-ink-muted" }: {
  icon: React.ComponentType<{ strokeWidth?: number; className?: string; "aria-hidden"?: boolean }>;
  title: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  tone?: string;
}) {
  return (
    <div className={cx("mx-auto flex max-w-md flex-col items-center px-6 py-14 text-center", className)}>
      <Icon aria-hidden strokeWidth={1} className={cx("size-9", tone)} />
      <DoubleRule className="mt-6 w-12" />
      <h3 className="mn-title mt-6">{title}</h3>
      {children && <p className="mn-body mt-3 text-ink-muted">{children}</p>}
      {actions && <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{actions}</div>}
    </div>
  );
}

export function EmptyState({ title, children, actions, className }: { title: string; children?: React.ReactNode; actions?: React.ReactNode; className?: string }) {
  return (
    <Shell icon={GlassWater} title={title} actions={actions} className={className}>
      {children}
    </Shell>
  );
}

export function NoResults({ title = "Nothing fits that evening", children, actions, className }: { title?: string; children?: React.ReactNode; actions?: React.ReactNode; className?: string }) {
  return (
    <Shell icon={SearchX} title={title} actions={actions} className={className}>
      {children}
    </Shell>
  );
}

export function ErrorState({ title = "The concierge desk is unreachable", children, actions, className }: { title?: string; children?: React.ReactNode; actions?: React.ReactNode; className?: string }) {
  return (
    <Shell icon={CircleAlert} title={title} actions={actions} className={className} tone="text-danger">
      {children}
    </Shell>
  );
}

export function SuccessState({ title, children, actions, className }: { title: string; children?: React.ReactNode; actions?: React.ReactNode; className?: string }) {
  return (
    <Shell icon={CalendarCheck} title={title} actions={actions} className={className} tone="text-success">
      {children}
    </Shell>
  );
}
