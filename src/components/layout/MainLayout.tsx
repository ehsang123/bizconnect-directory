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
       <footer className="border-t bg-muted/60">
         <div className="container flex h-14 items-center justify-between text-[11px] text-muted-foreground">
           <span>B2B Value Added Reseller Directory</span>
           <span>Only admin-approved companies are listed publicly.</span>
         </div>
       </footer>
     </div>
   );
 };
