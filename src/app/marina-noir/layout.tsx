import { ThemeRoot } from "@/components/ThemeRoot";

export default function Layout({ children }: LayoutProps<"/marina-noir">) {
  return <ThemeRoot theme="marina-noir">{children}</ThemeRoot>;
}
