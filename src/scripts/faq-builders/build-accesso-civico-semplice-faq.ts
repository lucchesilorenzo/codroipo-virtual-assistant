import { AccessoCivicoSemplice } from "@/types/accesso-civico-semplice";
import { createJSON } from "@/utils/create-json";

export async function buildAccessoCivicoSempliceFAQ(
  AccessoCivicoSemplice: AccessoCivicoSemplice
) {
  const faq = [];

  if (AccessoCivicoSemplice.descrizione) {
    faq.push({
      domanda: `Potresti fornire una breve descrizione sull'${AccessoCivicoSemplice.servizio}?`,
      risposta: AccessoCivicoSemplice.descrizione,
    });
  }

  if (AccessoCivicoSemplice.comeFare) {
    faq.push({
      domanda: `Come posso richiedere l'${AccessoCivicoSemplice.servizio}?`,
      risposta: AccessoCivicoSemplice.comeFare,
    });
  }

  if (AccessoCivicoSemplice.quantoCosta) {
    faq.push({
      domanda: `Quanto costa l'${AccessoCivicoSemplice.servizio}?`,
      risposta: AccessoCivicoSemplice.quantoCosta,
    });
  }

  if (AccessoCivicoSemplice.tempiEScadenze) {
    faq.push({
      domanda: `Quali sono i tempi di rilascio dell'${AccessoCivicoSemplice.servizio}?`,
      risposta: AccessoCivicoSemplice.tempiEScadenze,
    });
  }

  if (AccessoCivicoSemplice.contatti?.telefono) {
    faq.push({
      domanda: `Qual è il numero di telefono per avere più informazioni sull'${AccessoCivicoSemplice.servizio}?`,
      risposta: AccessoCivicoSemplice.contatti.telefono,
    });
  }

  if (AccessoCivicoSemplice.contatti?.aperturaAlPubblico) {
    faq.push({
      domanda: `Quali sono gli orari di apertura al pubblico per l'${AccessoCivicoSemplice.servizio}?`,
      risposta: AccessoCivicoSemplice.contatti.aperturaAlPubblico,
    });
  }

  if (AccessoCivicoSemplice.contatti?.aperturaSuAppuntamento) {
    faq.push({
      domanda: `Quali sono gli orari su appuntamento per l'${AccessoCivicoSemplice.servizio}?`,
      risposta: AccessoCivicoSemplice.contatti.aperturaSuAppuntamento,
    });
  }

  await createJSON(faq, "./src/data/faq", "accesso-civico-semplice");
}
