import { CentriEstiviPerMinori } from "@/types/centri-estivi-per-minori";
import { createJSON } from "@/utils/create-json";

export async function buildCentriEstiviPerMinoriFAQ(
  centriEstiviPerMinori: CentriEstiviPerMinori
) {
  const faq = [];

  if (centriEstiviPerMinori.descrizione) {
    faq.push({
      domanda: `Che cos'è ${centriEstiviPerMinori.servizio}?`,
      risposta: centriEstiviPerMinori.descrizione,
    });
  }

  if (centriEstiviPerMinori.comeFare) {
    faq.push({
      domanda: `Come si può fare domanda per ${centriEstiviPerMinori.servizio}?`,
      risposta: centriEstiviPerMinori.comeFare,
    });
  }

  if (centriEstiviPerMinori.cosaServe) {
    faq.push({
      domanda: `Cosa serve per accedere a ${centriEstiviPerMinori.servizio}?`,
      risposta: centriEstiviPerMinori.cosaServe,
    });
  }

  if (centriEstiviPerMinori.quantoCosta) {
    faq.push({
      domanda: `Qual è il costo previsto per ${centriEstiviPerMinori.servizio}?`,
      risposta: centriEstiviPerMinori.quantoCosta,
    });
  }

  if (centriEstiviPerMinori.tempiEScadenze) {
    faq.push({
      domanda: `Quali sono i tempi e le scadenze di ${centriEstiviPerMinori.servizio}?`,
      risposta: centriEstiviPerMinori.tempiEScadenze,
    });
  }

  if (centriEstiviPerMinori.contatti?.persona?.nome) {
    faq.push({
      domanda: `Chi è la persona di riferimento per ${centriEstiviPerMinori.servizio}?`,
      risposta: `${centriEstiviPerMinori.contatti.persona.nome} - ${centriEstiviPerMinori.contatti.persona.info}`,
    });
  }

  if (centriEstiviPerMinori.contatti?.unita?.nome) {
    faq.push({
      domanda: `Qual è l'ufficio competente per ${centriEstiviPerMinori.servizio}?`,
      risposta: `${centriEstiviPerMinori.contatti.unita.nome} - ${centriEstiviPerMinori.contatti.unita.info}`,
    });
  }

  await createJSON(faq, "./src/data/faq", "centri-estivi-per-minori");
}
