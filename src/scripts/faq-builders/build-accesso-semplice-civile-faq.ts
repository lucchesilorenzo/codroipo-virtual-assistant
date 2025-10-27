import { AccessoSempliceCivile } from "@/types/accesso-semplice-civile";
import { createJSON } from "@/utils/create-json";

export async function buildAccessoSempliceCivileFAQ(
  accessoSempliceCivile: AccessoSempliceCivile
) {
  const faq = [];

  if (accessoSempliceCivile.descrizione) {
    faq.push({
      domanda: `Potresti fornire una breve descrizione sull'${accessoSempliceCivile.servizio}?`,
      risposta: accessoSempliceCivile.descrizione,
    });
  }

  if (accessoSempliceCivile.comeFare) {
    faq.push({
      domanda: `Come posso richiedere l'${accessoSempliceCivile.servizio}?`,
      risposta: accessoSempliceCivile.comeFare,
    });
  }

  if (accessoSempliceCivile.quantoCosta) {
    faq.push({
      domanda: `Quanto costa l'${accessoSempliceCivile.servizio}?`,
      risposta: accessoSempliceCivile.quantoCosta,
    });
  }

  if (accessoSempliceCivile.tempiEScadenze) {
    faq.push({
      domanda: `Quali sono i tempi di rilascio dell'${accessoSempliceCivile.servizio}?`,
      risposta: accessoSempliceCivile.tempiEScadenze,
    });
  }

  if (accessoSempliceCivile.contatti?.telefono) {
    faq.push({
      domanda: `Qual è il numero di telefono per avere più informazioni sull'${accessoSempliceCivile.servizio}?`,
      risposta: accessoSempliceCivile.contatti.telefono,
    });
  }

  if (accessoSempliceCivile.contatti?.aperturaAlPubblico) {
    faq.push({
      domanda: `Quali sono gli orari di apertura al pubblico per l'${accessoSempliceCivile.servizio}?`,
      risposta: accessoSempliceCivile.contatti.aperturaAlPubblico,
    });
  }

  if (accessoSempliceCivile.contatti?.aperturaSuAppuntamento) {
    faq.push({
      domanda: `Quali sono gli orari su appuntamento per l'${accessoSempliceCivile.servizio}?`,
      risposta: accessoSempliceCivile.contatti.aperturaSuAppuntamento,
    });
  }

  await createJSON(faq, "./src/data/faq", "accesso-semplice-civile");
}
