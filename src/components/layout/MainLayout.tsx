import { ReactNode } from "react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-card/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-primary">
              VAR Directory
            </span>
          </div>
          <nav className="flex items-center gap-3 text-sm">
            <NavLink
              to="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
              activeClassName="text-foreground font-medium"
            >
              Directory
            </NavLink>
            <NavLink
              to="/blog"
              className="text-muted-foreground transition-colors hover:text-foreground"
              activeClassName="text-foreground font-medium"
            >
              Blog
            </NavLink>
            <Button asChild size="sm" className="ml-2">
              <NavLink to="/submit-company">List your company</NavLink>
            </Button>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t bg-muted/40">
        <div className="container flex h-12 items-center justify-between text-xs text-muted-foreground">
          <span>B2B Value Added Reseller Directory</span>
          <span>Only admin-approved companies are listed publicly.</span>
        </div>
      </footer>
    </div>
  );
};
