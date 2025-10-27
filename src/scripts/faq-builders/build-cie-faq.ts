import { CartaIdentitaElettronica } from "@/types/carta-identita-elettronica";
import { createJSON } from "@/utils/create-json";

export async function buildCartaIdentitaElettronicaFAQ(
  cie: CartaIdentitaElettronica
) {
  const faq = [];

  if (cie.descrizione) {
    faq.push({
      domanda: `Potresti fornire una breve descrizione della ${cie.servizio}?`,
      risposta: cie.descrizione,
    });
  }

  if (cie.comeFare) {
    faq.push({
      domanda: `Come posso richiedere la ${cie.servizio}?`,
      risposta: cie.comeFare,
    });
  }

  if (cie.cosaServe?.requisiti) {
    faq.push({
      domanda: `Cosa serve per richiedere la ${cie.servizio}?`,
      risposta: cie.cosaServe.requisiti.join(" "),
    });
  }

  if (cie.cosaServe?.infoAggiuntive) {
    faq.push({
      domanda: `Ci sono informazioni aggiuntive per la ${cie.servizio}?`,
      risposta: cie.cosaServe.infoAggiuntive,
    });
  }

  if (cie.cosaServe?.validita) {
    faq.push({
      domanda: `Qual è la validità della ${cie.servizio}?`,
      risposta: cie.cosaServe.validita.join(" "),
    });
  }

  if (cie.quantoCosta) {
    faq.push({
      domanda: `Quanto costa la ${cie.servizio}?`,
      risposta: cie.quantoCosta,
    });
  }

  if (cie.tempiEScadenze) {
    faq.push({
      domanda: `Quali sono i tempi di rilascio per la ${cie.servizio}?`,
      risposta: cie.tempiEScadenze,
    });
  }

  if (cie.contatti?.sportello) {
    faq.push({
      domanda: `Dove si trova lo sportello per la ${cie.servizio}?`,
      risposta: cie.contatti.sportello,
    });
  }

  if (cie.contatti?.telefono) {
    faq.push({
      domanda: `Qual è il numero di telefono per avere piu' informazioni sulla ${cie.servizio}?`,
      risposta: cie.contatti.telefono,
    });
  }

  if (cie.contatti?.pec) {
    faq.push({
      domanda: `Qual è l'indirizzo PEC del Comune per la ${cie.servizio}?`,
      risposta: cie.contatti.pec,
    });
  }

  if (cie.contatti?.aperturaAlPubblico) {
    faq.push({
      domanda: `Quali sono gli orari di apertura al pubblico per la ${cie.servizio}?`,
      risposta: cie.contatti.aperturaAlPubblico,
    });
  }

  if (cie.contatti?.aperturaSuAppuntamento) {
    faq.push({
      domanda: `Quali sono gli orari su appuntamento per la ${cie.servizio}?`,
      risposta: cie.contatti.aperturaSuAppuntamento,
    });
  }

  await createJSON(faq, "./src/data/faq", "carta-identita-elettronica");
}
