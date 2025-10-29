import { CartaIdentitaElettronica } from "@/types/carta-identita-elettronica-types";
import { createJSON } from "@/utils/create-json";
import puppeteer from "puppeteer";

export async function scrapeCIE() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url =
    "https://www.comune.codroipo.ud.it/it/servizi-224003/carta-identita-elettronica-cie-cie-241620";

  await page.goto(url);

  const cie: CartaIdentitaElettronica = await page.evaluate(() => {
    function cleanText(text?: string | null) {
      if (!text) return null;

      return text.replace(/\u00A0/g, " ").trim();
    }

    // Servizio
    const servizio = cleanText(
      document.querySelector('[data-element="service-title"]')?.textContent
    );

    // Descrizione
    const descrizione = cleanText(
      document.querySelector('[data-element="service-description"]')
        ?.textContent
    );

    // Come fare
    const comeFareEl = document.querySelector(
      '[data-element="service-how-to"]'
    );

    let comeFare = null;
    if (comeFareEl) {
      const parts = Array.from(comeFareEl.querySelectorAll("p")).map((p) =>
        cleanText(p.textContent)
      );
      comeFare = parts.join("\n");
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

      const infoAggiuntive = cleanText(
        cosaServeEl.querySelector("div > p:nth-of-type(2)")?.textContent
      );

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
    const quantoCosta = cleanText(
      document.querySelector("#pr_quantoCosta + div")?.textContent
    );

    // Tempi e scadenze
    const tempiEScadenze = cleanText(
      document.querySelector(".calendar-date-description-content > div")
        ?.textContent
    );

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
          pec = cleanText(pecSpan.querySelector("a")?.textContent);
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

  await createJSON(cie, "./src/data/services", "carta-identita-elettronica");
  await browser.close();

  return cie;
}
