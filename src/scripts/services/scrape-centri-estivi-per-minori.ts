import { CentriEstiviPerMinori } from "@/types/centri-estivi-per-minori";
import { createJSON } from "@/utils/create-json";
import puppeteer from "puppeteer";

export async function scrapeCentriEstiviPerMinori() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url =
    "https://www.comune.codroipo.ud.it/it/servizi-224003/centri-estivi-per-minori-36-anni-241652";

  await page.goto(url);

  const centriEstiviPerMinori: CentriEstiviPerMinori = await page.evaluate(
    () => {
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
      const comeFare = cleanText(
        document.querySelector(
          '[data-element="service-how-to"] > p:nth-of-type(1)'
        )?.textContent
      );

      // Cosa serve
      const cosaServe = Array.from(
        document.querySelectorAll('[data-element="service-needed"] p')
      )
        .map((p) => cleanText(p.textContent))
        .join("\n");

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
      const nomi = Array.from(
        document.querySelectorAll(
          ".card-title.text-paragraph-regular-medium-semi.mb-3 a"
        )
      ).map((a) => cleanText(a.textContent));

      const info = Array.from(
        document.querySelectorAll(
          ".card-title.text-paragraph-regular-medium-semi.mb-3 + div > p"
        )
      ).map((p) => cleanText(p.textContent));

      const contatti = {
        persona: {
          nome: nomi[0],
          info: info[0],
        },
        unita: {
          nome: nomi[1],
          info: info[1],
        },
      };

      return {
        servizio,
        descrizione,
        comeFare,
        cosaServe,
        quantoCosta,
        tempiEScadenze,
        contatti,
      };
    }
  );

  await createJSON(
    centriEstiviPerMinori,
    "./src/data/services",
    "centri-estivi-per-minori"
  );
  await browser.close();

  return centriEstiviPerMinori;
}
