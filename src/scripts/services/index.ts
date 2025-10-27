import { buildCartaIdentitaElettronicaFAQ } from "@/scripts/faq-builders/build-cie-faq";
import { scrapeCIE } from "./scrape-cie";

export const services = [
  { service: scrapeCIE, buildFaq: buildCartaIdentitaElettronicaFAQ },
];
