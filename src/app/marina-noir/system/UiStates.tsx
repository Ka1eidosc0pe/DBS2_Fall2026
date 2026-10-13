"use client";

import { useState } from "react";
import { Button } from "@/components/marina-noir/Button";
import { ExperienceCardSkeleton } from "@/components/marina-noir/Skeleton";
import { EmptyState, ErrorState, NoResults, SuccessState } from "@/components/marina-noir/States";
import { Toast } from "@/components/marina-noir/Toast";

function Frame({ title, note, children, className }: { title: string; note: string; children: React.ReactNode; className?: string }) {
  return (
    <figure className={className}>
      <figcaption className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
        <span className="mn-label text-ink">{title}</span>
        <span className="mn-caption text-ink-subtle">{note}</span>
      </figcaption>
      <div className="mt-4 border border-line bg-surface">{children}</div>
    </figure>
  );
}

export function UiStates() {
  const [retry, setRetry] = useState<"error" | "loading" | "ok">("error");
  const run = () => {
    setRetry("loading");
    window.setTimeout(() => setRetry("ok"), 800);
  };
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-2">
      <Frame title="Empty" note="Your evening, before any request">
        <EmptyState title="Nothing yet" actions={<Button variant="secondary">Browse the collection</Button>}>
          Requests you make will gather here, in the order you made them.
        </EmptyState>
      </Frame>

      <Frame title="No results" note="A filter that matches nothing">
        <NoResults actions={<Button variant="secondary">Clear filters</Button>}>
          No experiences match &ldquo;Stay&rdquo; with Black tie only. Try loosening the filters.
        </NoResults>
      </Frame>

      <Frame title="Loading" note="Skeletons share a card&rsquo;s footprint" className="lg:col-span-2">
        <div className="grid gap-8 p-6 md:grid-cols-3 md:p-8">
          <ExperienceCardSkeleton />
          <ExperienceCardSkeleton className="hidden md:flex" />
          <ExperienceCardSkeleton className="hidden md:flex" />
        </div>
      </Frame>

      <Frame title="Error with retry" note="Click Retry">
        {retry === "ok" ? (
          <SuccessState
            title="Back in touch"
            actions={<Button variant="ghost" onClick={() => setRetry("error")}>Reset demo</Button>}
          >
            The concierge desk answered. Your requests are safe.
          </SuccessState>
        ) : (
          <ErrorState
            actions={
              <Button variant="secondary" loading={retry === "loading"} onClick={run}>
                {retry === "loading" ? "Trying again" : "Retry"}
              </Button>
            }
          >
            We couldn&rsquo;t send your evening. Nothing has been lost; try again in a moment.
          </ErrorState>
        )}
      </Frame>

      <Frame title="Success" note="After a reservation request">
        <SuccessState title="Your concierge will confirm by morning." actions={<Button variant="secondary">View your evening</Button>}>
          Odette has been added to your evening for Friday, 16 October.
        </SuccessState>
        <div className="flex justify-center border-t border-line p-6">
          <Toast tone="success" title="Added to your evening">Your concierge will confirm by morning.</Toast>
        </div>
      </Frame>
    </div>
  );
}
