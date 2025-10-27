import fs from "fs/promises";
import puppeteer from "puppeteer";

async function scrape() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url =
    "https://www.comune.codroipo.ud.it/it/servizi-224003/carta-identita-elettronica-cie-cie-241620";

  await page.goto(url);

  const cie = await page.evaluate(() => {
    function cleanText(text?: string | null) {
      if (!text) return null;

      return text.replace(/\u00A0/g, " ").trim();
    }

    // Servizio
    const servizio =
      cleanText(
        document.querySelector('[data-element="service-title"]')?.textContent
      ) || null;

    // Descrizione
    const descrizione =
      cleanText(
        document.querySelector('[data-element="service-description"]')
          ?.textContent
      ) || null;

    // Come fare
    const comeFareEl = document.querySelector(
      '[data-element="service-how-to"]'
    );

    let comeFare = null;
    if (comeFareEl) {
      const parti = Array.from(comeFareEl.querySelectorAll("p")).map((p) =>
        cleanText(p.textContent)
      );
      comeFare = parti.join("\n");
    }

    // Cosa serve
    const cosaServeEl = document.querySelector(
      '[data-element="service-needed"]'
    );

    let cosaServe = null;
    if (cosaServeEl) {
      const requisiti = Array.from(
        cosaServeEl.querySelectorAll("div > ol > li")
      ).map((li) => cleanText(li.textContent));

      const infoAggiuntive =
        cleanText(
          cosaServeEl.querySelector("div > p:nth-of-type(2)")?.textContent
        ) || null;

      const validita = Array.from(
        cosaServeEl.querySelectorAll("div:nth-of-type(2) > ul > li")
      ).map((li) => cleanText(li.textContent));

      cosaServe = {
        requisiti,
        infoAggiuntive,
        validita,
      };
    }

    // Quanto costa
    const costoDiv = Array.from(document.querySelectorAll("div")).find(
      (div) =>
        div.textContent.startsWith("Euro") &&
        div.textContent.endsWith("cartacea")
    );

    const quantoCosta = costoDiv ? cleanText(costoDiv.textContent) : null;

    // Tempi e scadenze
    const tempiEScadenze =
      cleanText(
        document.querySelector(".calendar-date-description-content > div")
          ?.textContent
      ) || null;

    // Contatti
    const areaServizioEl = document.querySelector(
      '[data-element="service-area"]'
    );
    let contatti = null;

    if (areaServizioEl) {
      const sportelloSpan = areaServizioEl.querySelector("span");
      const sportello = sportelloSpan
        ? cleanText(sportelloSpan.textContent)
        : null;

      const cardContattiEl = document.querySelector("#contatti");

      let telefono = null;
      let pec = null;

      if (cardContattiEl) {
        const spans = Array.from(cardContattiEl.querySelectorAll("span"));

        const telefonoSpan = spans.find((span) =>
          span.textContent.includes("Telefono")
        );
        if (telefonoSpan) {
          telefono = cleanText(
            telefonoSpan.textContent.replace("Telefono", "")
          );
        }

        const pecSpan = spans.find((span) => span.textContent.includes("PEC"));
        if (pecSpan) {
          pec = cleanText(pecSpan.querySelector("a")?.textContent) || null;
        }
      }

      const aperturaPubblicaEl = Array.from(
        document.querySelectorAll("div.my-1")
      ).find((div) =>
        div
          .querySelector("strong")
          ?.textContent.includes("Apertura al pubblico")
      );

      let aperturaAlPubblico = null;
      if (aperturaPubblicaEl) {
        const spans = Array.from(aperturaPubblicaEl.querySelectorAll("span"));
        aperturaAlPubblico = spans
          .map((span) => cleanText(span.textContent))
          .join(" ");
      }

      const aperturaAppuntamentoEl = Array.from(
        document.querySelectorAll("div.my-1")
      ).find((div) =>
        div.querySelector("strong")?.textContent.includes("Su appuntamento")
      );

      let aperturaSuAppuntamento = null;
      if (aperturaAppuntamentoEl) {
        const spans = Array.from(
          aperturaAppuntamentoEl.querySelectorAll("span")
        );
        aperturaSuAppuntamento = spans
          .map((span) => cleanText(span.textContent))
          .join(" ");
      }

      contatti = {
        sportello,
        telefono,
        pec,
        aperturaAlPubblico,
        aperturaSuAppuntamento,
      };
    }

    return {
      servizio,
      descrizione,
      comeFare,
      cosaServe,
      quantoCosta,
      tempiEScadenze,
      contatti,
    };
  });

  await fs.writeFile(
    "./src/data/carta-identita-elettronica.json",
    JSON.stringify(cie, null, 2)
  );

  const faq = [];

  if (cie.descrizione)
    faq.push({
      domanda:
        "Potresti fornire una breve descrizione della Carta Identità Elettronica (C.I.E. - CIE)?",
      risposta: cie.descrizione,
    });

  if (cie.comeFare)
    faq.push({
      domanda: `Come posso richiedere la ${cie.servizio}?`,
      risposta: cie.comeFare,
    });

  if (cie.cosaServe?.requisiti)
    faq.push({
      domanda: "Cosa serve per richiederla?",
      risposta: cie.cosaServe.requisiti.join(" "),
    });

  if (cie.cosaServe?.infoAggiuntive)
    faq.push({
      domanda: "Ci sono informazioni aggiuntive?",
      risposta: cie.cosaServe.infoAggiuntive,
    });

  if (cie.cosaServe?.validita)
    faq.push({
      domanda: `Qual è la validità della ${cie.servizio}?`,
      risposta: cie.cosaServe.validita.join(" "),
    });

  if (cie.quantoCosta)
    faq.push({
      domanda: "Quanto costa?",
      risposta: cie.quantoCosta,
    });

  if (cie.tempiEScadenze)
    faq.push({
      domanda: "Quali sono i tempi di rilascio?",
      risposta: cie.tempiEScadenze,
    });

  if (cie.contatti?.sportello)
    faq.push({
      domanda: "Dove si trova lo sportello?",
      risposta: cie.contatti.sportello,
    });

  if (cie.contatti?.telefono)
    faq.push({
      domanda: "Qual è il numero di telefono per informazioni?",
      risposta: cie.contatti.telefono,
    });

  if (cie.contatti?.pec)
    faq.push({
      domanda: "Qual è l'indirizzo PEC del Comune?",
      risposta: cie.contatti.pec,
    });

  if (cie.contatti?.aperturaAlPubblico)
    faq.push({
      domanda: "Quali sono gli orari di apertura al pubblico?",
      risposta: cie.contatti.aperturaAlPubblico,
    });

  if (cie.contatti?.aperturaSuAppuntamento)
    faq.push({
      domanda: "Quali sono gli orari su appuntamento?",
      risposta: cie.contatti.aperturaSuAppuntamento,
    });

  await fs.writeFile(
    "./src/data/carta-identita-elettronica-faq.json",
    JSON.stringify(faq, null, 2)
  );

  await browser.close();
}

scrape();
