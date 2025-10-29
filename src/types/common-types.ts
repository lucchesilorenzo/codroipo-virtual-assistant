import { CartaIdentitaElettronica } from "@/types/carta-identita-elettronica-types";
import { CambioNomeEOCognome } from "@/types/cambio-nome-eo-cognome-types";
import { AccessoCivicoSemplice } from "@/types/accesso-civico-semplice-types";
import { AvvisoDiAccertamento } from "@/types/avviso-di-accertamento-types";
import { CentriEstiviPerMinori } from "@/types/centri-estivi-per-minori-types";

export type Service =
  | CartaIdentitaElettronica
  | CambioNomeEOCognome
  | AccessoCivicoSemplice
  | AvvisoDiAccertamento
  | CentriEstiviPerMinori;

export type ServiceDefinition = {
  service: () => Promise<Service>;
  buildFaq: (data: Service) => Promise<void>;
};
