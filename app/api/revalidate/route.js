import { revalidatePath, revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";

const tagsByType = {
  siteSettings: ["site-settings"],
  homePage: ["home-page"],
  galleryImage: ["gallery"],
  service: ["services"],
  cocktail: ["cocktails"],
};

export async function POST(request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return Response.json({ message: "Missing webhook secret" }, { status: 500 });

  const { body, isValidSignature } = await parseBody(request, secret);
  if (!isValidSignature) return Response.json({ message: "Invalid signature" }, { status: 401 });

  for (const tag of tagsByType[body?._type] || []) revalidateTag(tag);
  if (body?._type === "service" && body?.slug) revalidateTag(`service-${body.slug}`);
  if (body?._type === "cocktail" && body?.slug) revalidateTag(`cocktail-${body.slug}`);
  revalidatePath("/", "layout");

  return Response.json({ revalidated: true });
}
