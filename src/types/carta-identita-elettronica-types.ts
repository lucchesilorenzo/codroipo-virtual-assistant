export type CartaIdentitaElettronica = {
  servizio: string | null;
  descrizione: string | null;
  comeFare: string | null;
  cosaServe: {
    requisiti: (string | null)[];
    infoAggiuntive: string | null;
    validita: (string | null)[];
  } | null;
  quantoCosta: string | null;
  tempiEScadenze: string | null;
  contatti: {
    sportello: string | null;
    telefono: string | null;
    pec: string | null;
    aperturaAlPubblico: string | null;
    aperturaSuAppuntamento: string | null;
  } | null;
};
