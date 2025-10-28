import { CambioNomeEOCognome } from "@/types/cambio-nome-eo-cognome";
import { createJSON } from "@/utils/create-json";

export async function buildCambioNomeEOCognomeFAQ(
  cambioNomeEOCognome: CambioNomeEOCognome
) {
  const faq = [];

  if (cambioNomeEOCognome.descrizione) {
    faq.push({
      domanda: `Potresti fornire una breve descrizione del ${cambioNomeEOCognome.servizio}?`,
      risposta: cambioNomeEOCognome.descrizione,
    });
  }

  if (cambioNomeEOCognome.comeFare) {
    faq.push({
      domanda: `Come posso richiedere il ${cambioNomeEOCognome.servizio}?`,
      risposta: cambioNomeEOCognome.comeFare,
    });
  }

  if (cambioNomeEOCognome.quantoCosta) {
    faq.push({
      domanda: `Quanto costa il ${cambioNomeEOCognome.servizio}?`,
      risposta: cambioNomeEOCognome.quantoCosta,
    });
  }

  if (cambioNomeEOCognome.tempiEScadenze) {
    faq.push({
      domanda: `Quali sono i tempi di rilascio del ${cambioNomeEOCognome.servizio}?`,
      risposta: cambioNomeEOCognome.tempiEScadenze,
    });
  }

  if (cambioNomeEOCognome.contatti?.telefono) {
    faq.push({
      domanda: `Qual è il numero di telefono per avere più informazioni sul ${cambioNomeEOCognome.servizio}?`,
      risposta: cambioNomeEOCognome.contatti.telefono,
    });
  }

  if (cambioNomeEOCognome.contatti?.aperturaAlPubblico) {
    faq.push({
      domanda: `Quali sono gli orari di apertura al pubblico per il ${cambioNomeEOCognome.servizio}?`,
      risposta: cambioNomeEOCognome.contatti.aperturaAlPubblico,
    });
  }

  if (cambioNomeEOCognome.contatti?.aperturaSuAppuntamento) {
    faq.push({
      domanda: `Quali sono gli orari su appuntamento per il ${cambioNomeEOCognome.servizio}?`,
      risposta: cambioNomeEOCognome.contatti.aperturaSuAppuntamento,
    });
  }

  const output = {
    servizio: cambioNomeEOCognome.servizio,
    faq,
  };

  await createJSON(output, "./src/data/faq", "cambio-nome-eo-cognome");
}
