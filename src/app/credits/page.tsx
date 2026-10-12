import Link from "next/link";
import type { Metadata } from "next";
import { ThemeRoot } from "@/components/ThemeRoot";
import { CREDITS } from "@/lib/credits";
import { STYLES } from "@/lib/styles";

export const metadata: Metadata = { title: "Photo credits" };

export default function Credits() {
  return (
    <ThemeRoot theme="hub">
      <main className="mx-auto max-w-[900px] px-5 py-12 md:px-10 md:py-20">
        <Link href="/" className="text-sm text-ink-muted hover:text-ink">
          ← Hub
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">Photo credits</h1>
        <p className="mt-3 max-w-prose text-ink-muted">
          Photos are used under their stated licences and served from this site. Many have been cropped.
        </p>
        {STYLES.map((s) => (
          <section key={s.slug} className="mt-12">
            <h2 className="border-b border-line pb-2 font-semibold">{s.name}</h2>
            {CREDITS[s.slug].length === 0 ? (
              <p className="mt-4 text-sm text-ink-subtle">No photos yet.</p>
            ) : (
              <ul className="mt-2 divide-y divide-line text-sm">
                {CREDITS[s.slug].map((c) => (
                  <li key={c.file} className="grid gap-1 py-3 md:grid-cols-[1fr_auto] md:gap-6">
                    <a href={c.source} className="font-medium underline decoration-line underline-offset-4 hover:decoration-ink">
                      {c.title}
                    </a>
                    <span className="text-ink-muted">
                      {c.author} ·{" "}
                      {c.licenseUrl ? (
                        <a href={c.licenseUrl} className="underline decoration-line underline-offset-4">
                          {c.license}
                        </a>
                      ) : (
                        c.license
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </main>
    </ThemeRoot>
  );
}
