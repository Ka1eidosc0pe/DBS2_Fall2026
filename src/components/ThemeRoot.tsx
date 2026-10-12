import { fontVars } from "@/lib/fonts";

type Theme = keyof typeof fontVars;

/** Wraps a page in a style's tokens and typefaces. Everything inside uses that style's semantic utilities. */
export function ThemeRoot({
  theme,
  className = "",
  children,
}: {
  theme: Theme;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div data-theme={theme} className={`${fontVars[theme]} ${className}`}>
      {children}
    </div>
  );
}
