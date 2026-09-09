import { cocktail } from "@/sanity/schemaTypes/cocktail";
import { galleryImage } from "@/sanity/schemaTypes/galleryImage";
import { homePage } from "@/sanity/schemaTypes/homePage";
import { managedImage } from "@/sanity/schemaTypes/managedImage";
import { pricingConfig } from "@/sanity/schemaTypes/pricingConfig";
import { service } from "@/sanity/schemaTypes/service";
import { siteSettings } from "@/sanity/schemaTypes/siteSettings";
import { servicesPage } from "@/sanity/schemaTypes/servicesPage";
import { testimonial } from "@/sanity/schemaTypes/testimonial";

export const schemaTypes = [managedImage, siteSettings, homePage, galleryImage, service, cocktail, servicesPage, pricingConfig, testimonial];

