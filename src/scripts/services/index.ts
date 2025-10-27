import { buildCartaIdentitaElettronicaFAQ } from "@/scripts/faq-builders/build-cie-faq";
import { buildCambioNomeECognomeFAQ } from "../faq-builders/build-cambio-nome-e-cognome-faq";
import { scrapeCambioNomeECognome } from "./scrape-cambio-nome-e-cognome";
import { scrapeCIE } from "./scrape-cie";

export const services = [
  {
    service: scrapeCIE,
    buildFaq: buildCartaIdentitaElettronicaFAQ,
  },
  {
    service: scrapeCambioNomeECognome,
    buildFaq: buildCambioNomeECognomeFAQ,
  },
];
