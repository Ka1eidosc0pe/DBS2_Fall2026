import type { Metadata } from "next";
import { Concierge } from "@/components/marina-noir/Concierge";

export const metadata: Metadata = { title: "The Concierge: Singapore after dark" };

export default function Page() {
  return <Concierge />;
}
