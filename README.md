# Codroipo Virtual Assistant

Prototipo di un assistente virtuale per il Comune di Codroipo.

## Funzionalità

- **Estrazione automatica dei servizi comunali:** lo script raccoglie e struttura i dati pubblici dal sito del Comune di Codroipo.
- **Generazione e gestione delle FAQ:** mappatura automatica di domande e risposte relative a ciascun servizio, in formato JSON.
- **Gestione delle prenotazioni:** integrazione con Google Calendar per verificare la disponibilità di date e orari e creare eventi in modo automatico.
- **Conferma e promemoria:** simulazione dell’invio di un messaggio di conferma e di un promemoria dopo aver effettuato la prenotazione.

## Servizi supportati

Attualmente vengono estratti e gestiti i seguenti servizi del Comune di Codroipo:

- [Carta Identità Elettronica (C.I.E. - CIE)](https://www.comune.codroipo.ud.it/it/servizi-224003/carta-identita-elettronica-cie-cie-241620)
- [Cambio di nome e/o cognome](https://www.comune.codroipo.ud.it/it/servizi-224003/cambio-di-nome-eo-cognome-241628)
- [Accesso civico semplice](https://www.comune.codroipo.ud.it/it/servizi-224003/accesso-civico-semplice-241660)
- [Avviso di accertamento (TASI, IMU, ILIA, TARI)](https://www.comune.codroipo.ud.it/it/servizi-224003/avviso-di-accertamento-tasi-imu-ilia-tari-241582)
- [Centri estivi per minori (3/6 anni)](https://www.comune.codroipo.ud.it/it/servizi-224003/centri-estivi-per-minori-36-anni-241652)

## Tecnologie

- [Node.js](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [Puppeteer](https://pptr.dev/) per lo scraping
- [Node Cron](https://nodecron.com/) per la gestione dei cron job
- [date-fns](https://date-fns.org/) per la gestione delle date
- [Vapi](https://vapi.ai/) per la parte vocale / AI

## Prerequisiti

- [Node.js (24+)](https://nodejs.org/en)
- [Git](https://git-scm.com/)
- [ngrok](https://ngrok.com/)

## Installazione

1. **Clona il repository:**

```bash
git clone https://github.com/lucchesilorenzo/codroipo-virtual-assistant.git
cd codroipo-virtual-assistant
code .
```

2. **Installa le dipendenze:**

```bash
npm install
```

## Comandi disponibili

**Esegui lo scraping dei servizi comunali:**

```bash
npm run scrape
```

**Avvia il cron job per i promemoria:**

```bash
npm run cron
```

**Avvia il server di sviluppo:**

```bash
npm run dev
```
