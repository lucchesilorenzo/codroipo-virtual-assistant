export type CentriEstiviPerMinori = {
  servizio: string | null;
  descrizione: string | null;
  comeFare: string | null;
  cosaServe: string;
  quantoCosta: string | null;
  tempiEScadenze: string | null;
  contatti: {
    persona: {
      nome: string | null;
      info: string | null;
    };
    unita: {
      nome: string | null;
      info: string | null;
    };
  };
};
