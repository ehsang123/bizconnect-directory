import { ReactNode } from "react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

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
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-muted-foreground hover:text-foreground">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-50">
                    <div className="grid gap-1 p-3 md:w-[320px] lg:w-[420px]">
                      <NavigationMenuLink asChild>
                        <NavLink
                          to="/services/managed-service-providers"
                          className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          activeClassName="bg-accent text-accent-foreground font-medium"
                        >
                          Managed Service Provider (MSP)
                        </NavLink>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <NavLink
                          to="/services/managed-security-services"
                          className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          activeClassName="bg-accent text-accent-foreground font-medium"
                        >
                          Managed Security Services Provider (MSSP)
                        </NavLink>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <NavLink
                          to="/services/value-added-resellers"
                          className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          activeClassName="bg-accent text-accent-foreground font-medium"
                        >
                          Value Added Resellers (VARs)
                        </NavLink>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <NavLink
                          to="/services/cloud-service-providers"
                          className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          activeClassName="bg-accent text-accent-foreground font-medium"
                        >
                          Cloud Service Providers
                        </NavLink>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <NavLink
                          to="/services/independent-software-vendors"
                          className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          activeClassName="bg-accent text-accent-foreground font-medium"
                        >
                          Independent Software Vendors (ISVs)
                        </NavLink>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <NavLink
                          to="/services/amazon-web-services"
                          className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          activeClassName="bg-accent text-accent-foreground font-medium"
                        >
                          Amazon Web Services (AWS) Partners
                        </NavLink>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <NavLink
                          to="/services/systems-integrators"
                          className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          activeClassName="bg-accent text-accent-foreground font-medium"
                        >
                          Systems Integrators
                        </NavLink>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
