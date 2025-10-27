export type CambioNomeECognome = {
  servizio: string | null;
  descrizione: string | null;
  comeFare: string | null;
  cosaServe: string | null;
  quantoCosta: string | null;
  tempiEScadenze: string | null;
  contatti: {
    telefono: string | null;
    aperturaAlPubblico: string | null;
    aperturaSuAppuntamento: string | null;
  };
};
