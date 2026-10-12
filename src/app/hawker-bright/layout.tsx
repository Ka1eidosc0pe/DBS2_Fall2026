import { ThemeRoot } from "@/components/ThemeRoot";

export default function Layout({ children }: LayoutProps<"/hawker-bright">) {
  return <ThemeRoot theme="hawker-bright">{children}</ThemeRoot>;
}
