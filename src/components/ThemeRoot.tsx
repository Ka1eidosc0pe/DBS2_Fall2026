import { fontVars } from "@/lib/fonts";

type Theme = keyof typeof fontVars;

/** Wraps a page in a style's tokens and typefaces. Everything inside uses that style's semantic utilities. */
export function ThemeRoot({
  theme,
  className = "",
  children,
  ...rest
}: {
  theme: Theme;
  className?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "children">) {
  return (
    <div data-theme={theme} className={`${fontVars[theme]} ${className}`} {...rest}>
      {children}
    </div>
  );
}
