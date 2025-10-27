import { CambioNomeECognome } from "@/types/cambio-nome-e-cognome";
import { createJSON } from "@/utils/create-json";

export async function buildCambioNomeECognomeFAQ(
  cambioNomeECognome: CambioNomeECognome
) {
  const faq = [];

  if (cambioNomeECognome.descrizione) {
    faq.push({
      domanda: `Potresti fornire una breve descrizione del ${cambioNomeECognome.servizio}?`,
      risposta: cambioNomeECognome.descrizione,
    });
  }

  if (cambioNomeECognome.comeFare) {
    faq.push({
      domanda: `Come posso richiedere il ${cambioNomeECognome.servizio}?`,
      risposta: cambioNomeECognome.comeFare,
    });
  }

  if (cambioNomeECognome.quantoCosta) {
    faq.push({
      domanda: `Quanto costa il ${cambioNomeECognome.servizio}?`,
      risposta: cambioNomeECognome.quantoCosta,
    });
  }

  if (cambioNomeECognome.tempiEScadenze) {
    faq.push({
      domanda: `Quali sono i tempi di rilascio del ${cambioNomeECognome.servizio}?`,
      risposta: cambioNomeECognome.tempiEScadenze,
    });
  }

  if (cambioNomeECognome.contatti?.telefono) {
    faq.push({
      domanda: `Qual è il numero di telefono per avere più informazioni sul ${cambioNomeECognome.servizio}?`,
      risposta: cambioNomeECognome.contatti.telefono,
    });
  }

  if (cambioNomeECognome.contatti?.aperturaAlPubblico) {
    faq.push({
      domanda: `Quali sono gli orari di apertura al pubblico per il ${cambioNomeECognome.servizio}?`,
      risposta: cambioNomeECognome.contatti.aperturaAlPubblico,
    });
  }

  if (cambioNomeECognome.contatti?.aperturaSuAppuntamento) {
    faq.push({
      domanda: `Quali sono gli orari su appuntamento per il ${cambioNomeECognome.servizio}?`,
      risposta: cambioNomeECognome.contatti.aperturaSuAppuntamento,
    });
  }

  await createJSON(faq, "./src/data/faq", "cambio-nome-e-cognome");
}
