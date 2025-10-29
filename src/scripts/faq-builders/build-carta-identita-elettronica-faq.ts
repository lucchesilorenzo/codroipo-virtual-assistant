import { CartaIdentitaElettronica } from "@/types/carta-identita-elettronica-types";
import { createJSON } from "@/utils/create-json";

export async function buildCartaIdentitaElettronicaFAQ(
  cartaIdentitaElettronica: CartaIdentitaElettronica
) {
  const faq = [];

  if (cartaIdentitaElettronica.descrizione) {
    faq.push({
      domanda: `Potresti fornire una breve descrizione della ${cartaIdentitaElettronica.servizio}?`,
      risposta: cartaIdentitaElettronica.descrizione,
    });
  }

  if (cartaIdentitaElettronica.comeFare) {
    faq.push({
      domanda: `Come posso richiedere la ${cartaIdentitaElettronica.servizio}?`,
      risposta: cartaIdentitaElettronica.comeFare,
    });
  }

  if (cartaIdentitaElettronica.cosaServe?.requisiti) {
    faq.push({
      domanda: `Cosa serve per richiedere la ${cartaIdentitaElettronica.servizio}?`,
      risposta: cartaIdentitaElettronica.cosaServe.requisiti.join(" "),
    });
  }

  if (cartaIdentitaElettronica.cosaServe?.infoAggiuntive) {
    faq.push({
      domanda: `Ci sono informazioni aggiuntive per la ${cartaIdentitaElettronica.servizio}?`,
      risposta: cartaIdentitaElettronica.cosaServe.infoAggiuntive,
    });
  }

  if (cartaIdentitaElettronica.cosaServe?.validita) {
    faq.push({
      domanda: `Qual è la validità della ${cartaIdentitaElettronica.servizio}?`,
      risposta: cartaIdentitaElettronica.cosaServe.validita.join(" "),
    });
  }

  if (cartaIdentitaElettronica.quantoCosta) {
    faq.push({
      domanda: `Quanto costa la ${cartaIdentitaElettronica.servizio}?`,
      risposta: cartaIdentitaElettronica.quantoCosta,
    });
  }

  if (cartaIdentitaElettronica.tempiEScadenze) {
    faq.push({
      domanda: `Quali sono i tempi di rilascio per la ${cartaIdentitaElettronica.servizio}?`,
      risposta: cartaIdentitaElettronica.tempiEScadenze,
    });
  }

  if (cartaIdentitaElettronica.contatti?.sportello) {
    faq.push({
      domanda: `Dove si trova lo sportello per la ${cartaIdentitaElettronica.servizio}?`,
      risposta: cartaIdentitaElettronica.contatti.sportello,
    });
  }

  if (cartaIdentitaElettronica.contatti?.telefono) {
    faq.push({
      domanda: `Qual è il numero di telefono per avere piu' informazioni sulla ${cartaIdentitaElettronica.servizio}?`,
      risposta: cartaIdentitaElettronica.contatti.telefono,
    });
  }

  if (cartaIdentitaElettronica.contatti?.pec) {
    faq.push({
      domanda: `Qual è l'indirizzo PEC del Comune per la ${cartaIdentitaElettronica.servizio}?`,
      risposta: cartaIdentitaElettronica.contatti.pec,
    });
  }

  if (cartaIdentitaElettronica.contatti?.aperturaAlPubblico) {
    faq.push({
      domanda: `Quali sono gli orari di apertura al pubblico per la ${cartaIdentitaElettronica.servizio}?`,
      risposta: cartaIdentitaElettronica.contatti.aperturaAlPubblico,
    });
  }

  if (cartaIdentitaElettronica.contatti?.aperturaSuAppuntamento) {
    faq.push({
      domanda: `Quali sono gli orari su appuntamento per la ${cartaIdentitaElettronica.servizio}?`,
      risposta: cartaIdentitaElettronica.contatti.aperturaSuAppuntamento,
    });
  }

  const output = {
    servizio: cartaIdentitaElettronica.servizio,
    faq,
  };

  await createJSON(output, "./src/data/faq", "carta-identita-elettronica");
}
