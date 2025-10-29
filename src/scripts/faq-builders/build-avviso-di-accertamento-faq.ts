import { AvvisoDiAccertamento } from "@/types/avviso-di-accertamento-types";
import { createJSON } from "@/utils/create-json";

export async function buildAvvisoDiAccertamentoFAQ(
  avvisoDiAccertamento: AvvisoDiAccertamento
) {
  const faq = [];

  if (avvisoDiAccertamento.descrizione) {
    faq.push({
      domanda: `Potresti fornire una breve descrizione sull'${avvisoDiAccertamento.servizio}?`,
      risposta: avvisoDiAccertamento.descrizione,
    });
  }

  if (avvisoDiAccertamento.comeFare) {
    faq.push({
      domanda: `Come posso richiedere l'${avvisoDiAccertamento.servizio}?`,
      risposta: avvisoDiAccertamento.comeFare,
    });
  }

  if (avvisoDiAccertamento.quantoCosta) {
    faq.push({
      domanda: `Quanto costa l'${avvisoDiAccertamento.servizio}?`,
      risposta: avvisoDiAccertamento.quantoCosta,
    });
  }

  if (avvisoDiAccertamento.tempiEScadenze) {
    faq.push({
      domanda: `Quali sono i tempi di rilascio dell'${avvisoDiAccertamento.servizio}?`,
      risposta: avvisoDiAccertamento.tempiEScadenze,
    });
  }

  if (avvisoDiAccertamento.contatti?.telefono) {
    faq.push({
      domanda: `Qual è il numero di telefono per avere più informazioni sull'${avvisoDiAccertamento.servizio}?`,
      risposta: avvisoDiAccertamento.contatti.telefono,
    });
  }

  if (avvisoDiAccertamento.contatti?.aperturaAlPubblico) {
    faq.push({
      domanda: `Quali sono gli orari di apertura al pubblico per l'${avvisoDiAccertamento.servizio}?`,
      risposta: avvisoDiAccertamento.contatti.aperturaAlPubblico,
    });
  }

  if (avvisoDiAccertamento.contatti?.aperturaSuAppuntamento) {
    faq.push({
      domanda: `Quali sono gli orari su appuntamento per l'${avvisoDiAccertamento.servizio}?`,
      risposta: avvisoDiAccertamento.contatti.aperturaSuAppuntamento,
    });
  }

  const output = {
    servizio: avvisoDiAccertamento.servizio,
    faq,
  };

  await createJSON(output, "./src/data/faq", "avviso-di-accertamento");
}
