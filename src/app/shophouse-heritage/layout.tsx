import { ThemeRoot } from "@/components/ThemeRoot";

export default function Layout({ children }: LayoutProps<"/shophouse-heritage">) {
  return <ThemeRoot theme="shophouse-heritage">{children}</ThemeRoot>;
}
