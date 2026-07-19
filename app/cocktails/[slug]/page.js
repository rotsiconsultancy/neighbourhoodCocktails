import { notFound } from "next/navigation";
import { CocktailDetailClient } from "@/components/CocktailDetailClient";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getCocktail, getCocktails } from "@/sanity/lib/content";

export async function generateStaticParams() {
  const cocktails = await getCocktails();
  return cocktails.map((cocktail) => ({ slug: cocktail.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cocktail = await getCocktail(slug);
  if (!cocktail) return {};
  return {
    title: cocktail.name,
    description: cocktail.description,
    alternates: { canonical: `/cocktails/${cocktail.id}` },
  };
}

export default async function CocktailDetailPage({ params }) {
  const { slug } = await params;
  const [cocktail, cocktails] = await Promise.all([getCocktail(slug), getCocktails()]);
  if (!cocktail) notFound();
  const related = cocktails.filter((item) => item.id !== slug).slice(0, 3);

  return <><SiteHeader /><CocktailDetailClient cocktail={cocktail} related={related} /><SiteFooter /></>;
}
