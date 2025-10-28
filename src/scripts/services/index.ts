import { buildCartaIdentitaElettronicaFAQ } from "@/scripts/faq-builders/build-cie-faq";

import { buildAvvisoDiAccertamentoFAQ } from "../faq-builders/build-avviso-di-accertamento-faq";
import { buildCambioNomeEOCognomeFAQ } from "../faq-builders/build-cambio-nome-eo-cognome-faq";
import { buildCentriEstiviPerMinoriFAQ } from "../faq-builders/build-centri-estivi-per-minori-faq";

import { buildAccessoCivicoSempliceFAQ } from "../faq-builders/build-accesso-civico-semplice-faq";
import { scrapeAccessoCivicoSemplice } from "./scrape-accesso-civico-semplice";
import { scrapeAvvisoDiAccertamento } from "./scrape-avviso-di-accertamento";
import { scrapeCambioNomeEOCognome } from "./scrape-cambio-nome-eo-cognome";
import { scrapeCentriEstiviPerMinori } from "./scrape-centri-estivi-per-minori";
import { scrapeCIE } from "./scrape-cie";

export const services = [
  {
    service: scrapeCIE,
    buildFaq: buildCartaIdentitaElettronicaFAQ,
  },
  {
    service: scrapeCambioNomeEOCognome,
    buildFaq: buildCambioNomeEOCognomeFAQ,
  },
  {
    service: scrapeAccessoCivicoSemplice,
    buildFaq: buildAccessoCivicoSempliceFAQ,
  },
  {
    service: scrapeAvvisoDiAccertamento,
    buildFaq: buildAvvisoDiAccertamentoFAQ,
  },
  {
    service: scrapeCentriEstiviPerMinori,
    buildFaq: buildCentriEstiviPerMinoriFAQ,
  },
];
