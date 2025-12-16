import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SubmitCompany from "./pages/SubmitCompany";
import CompanyDetail from "./pages/CompanyDetail";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import AdminDashboard from "./pages/AdminDashboard";
import BlogEditor from "./pages/BlogEditor";
import WpAdmin from "./pages/WpAdmin";
import ManagedServiceProviders from "./pages/ManagedServiceProviders";
import ValueAddedResellers from "./pages/ValueAddedResellers";
import ManagedSecurityServices from "./pages/ManagedSecurityServices";
import CloudServiceProviders from "./pages/CloudServiceProviders";
import IndependentSoftwareVendors from "./pages/IndependentSoftwareVendors";
import AmazonWebServices from "./pages/AmazonWebServices";
import SystemsIntegrators from "./pages/SystemsIntegrators";
import AboutUs from "./pages/AboutUs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/submit-company" element={<SubmitCompany />} />
          <Route path="/companies/:id" element={<CompanyDetail />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/blog-editor" element={<BlogEditor />} />
          <Route path="/wpadmin" element={<WpAdmin />} />
          <Route path="/services/managed-service-providers" element={<ManagedServiceProviders />} />
          <Route path="/services/value-added-resellers" element={<ValueAddedResellers />} />
          <Route path="/services/managed-security-services" element={<ManagedSecurityServices />} />
          <Route path="/services/cloud-service-providers" element={<CloudServiceProviders />} />
          <Route
            path="/services/independent-software-vendors"
            element={<IndependentSoftwareVendors />}
          />
          <Route path="/services/amazon-web-services" element={<AmazonWebServices />} />
          <Route path="/services/systems-integrators" element={<SystemsIntegrators />} />
          <Route path="/about" element={<AboutUs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
