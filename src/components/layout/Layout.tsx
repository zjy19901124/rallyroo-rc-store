import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Helmet } from "react-helmet-async";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  ogImage?: string;
}

export function Layout({
  children,
  title = "RallyRoo - Australian RC Trucks",
  description = "Australia's home for quality RC trucks. Off-road, drift, stunt, and DIY kits. Fast AU shipping, secure checkout.",
  ogImage = "/og-image.jpg",
}: LayoutProps) {
  const fullTitle = title.includes("RallyRoo") ? title : `${title} | RallyRoo`;

  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
