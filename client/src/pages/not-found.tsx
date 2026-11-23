import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return <><Helmet><title>Page not found | Fasih ur Rehman</title><meta name="robots" content="noindex" /></Helmet>
    <Navigation /><main className="folio story min-h-screen"><div className="folio-width">
    <p className="eyebrow">404</p><h1>Page not found.</h1><p>This address doesn’t lead to a published page.</p>
    <a className="folio-link" href="/#portfolio">Explore selected work ↗</a></div></main><Footer /></>;
}
