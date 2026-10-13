import type { Metadata } from "next";
import { MakanMap } from "@/components/hawker-bright/MakanMap";

export const metadata: Metadata = { title: "Makan Map · Hawker Bright" };

export default function Page() {
  return <MakanMap />;
}
