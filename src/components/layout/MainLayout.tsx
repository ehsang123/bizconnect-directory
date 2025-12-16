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
      <header className="sticky top-0 z-40 border-b bg-gradient-to-b from-background/95 via-background/90 to-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between gap-4 transition-all">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-primary">
              VAR Directory
            </span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink
              to="/"
              className="text-muted-foreground transition-colors hover:text-foreground hover:opacity-90"
              activeClassName="text-foreground font-medium"
            >
              Home
            </NavLink>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-muted-foreground hover:text-foreground">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
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
               className="text-muted-foreground transition-colors hover:text-foreground hover:opacity-90"
               activeClassName="text-foreground font-medium"
             >
               Blog
             </NavLink>
             <NavLink
               to="/about"
               className="text-muted-foreground transition-colors hover:text-foreground hover:opacity-90"
               activeClassName="text-foreground font-medium"
             >
               About us
             </NavLink>
             <Button asChild size="sm" className="ml-2 shadow-sm transition hover:shadow-md">
               <NavLink to="/submit-company">List your company</NavLink>
             </Button>
           </nav>
         </div>
       </header>
        <main>{children}</main>
        <footer className="mt-12 border-t bg-muted/60">
          <div className="container grid gap-6 py-8 text-sm text-muted-foreground md:grid-cols-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                VAR Directory
              </span>
              <p className="text-xs">
                Curated directory of VARs, MSPs, MSSPs, CSPs and more channel partners.
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide">Navigate</p>
              <ul className="space-y-1 text-xs">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/blog">Blog</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About us</NavLink>
                </li>
                <li>
                  <NavLink to="/submit-company">List your company</NavLink>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide">Services</p>
              <ul className="space-y-1 text-xs">
                <li>
                  <NavLink to="/services/managed-service-providers">Managed Service Providers</NavLink>
                </li>
                <li>
                  <NavLink to="/services/managed-security-services">Managed Security Services</NavLink>
                </li>
                <li>
                  <NavLink to="/services/value-added-resellers">Value Added Resellers</NavLink>
                </li>
                <li>
                  <NavLink to="/services/cloud-service-providers">Cloud Service Providers</NavLink>
                </li>
                <li>
                  <NavLink to="/services/independent-software-vendors">Independent Software Vendors</NavLink>
                </li>
                <li>
                  <NavLink to="/services/amazon-web-services">Amazon Web Services</NavLink>
                </li>
                <li>
                  <NavLink to="/services/systems-integrators">Systems Integrators</NavLink>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-between text-xs">
              <div>
                <p className="mb-2 font-semibold uppercase tracking-wide">Compliance</p>
                <p>Only admin-approved companies are listed publicly.</p>
              </div>
              <p className="mt-4 text-[11px]">
                © {new Date().getFullYear()} B2B Value Added Reseller Directory. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  };
