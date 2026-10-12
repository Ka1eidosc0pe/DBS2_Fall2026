import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Singapore, Three Ways", template: "%s · Singapore, Three Ways" },
  description: "A travel guide to Singapore designed in three visual styles, each with a mood board, a design system, and a site.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
