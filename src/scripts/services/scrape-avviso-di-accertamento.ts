import { AvvisoDiAccertamento } from "@/types/avviso-di-accertamento-types";
import { createJSON } from "@/utils/create-json";
import puppeteer from "puppeteer";

export async function scrapeAvvisoDiAccertamento() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url =
    "https://www.comune.codroipo.ud.it/it/servizi-224003/avviso-di-accertamento-tasi-imu-ilia-tari-241582";

  await page.goto(url);

  const avvisoDiAccertamento: AvvisoDiAccertamento = await page.evaluate(() => {
    function cleanText(text?: string | null) {
      if (!text) return null;

      return text
        .replace(/\u00A0/g, " ")
        .replace(/\u2019/g, "'")
        .trim();
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
    const cosaServe = cleanText(
      document.querySelector(
        '[data-element="service-needed"] > div > p:nth-of-type(1)'
      )?.textContent
    );

    // Quanto costa
    const quantoCosta = cleanText(
      document.querySelector("#pr_quantoCosta + div > p")?.textContent
    );

    // Tempi e scadenze
    const tempiEScadenze = cleanText(
      document.querySelector(".calendar-date-description-content > div")
        ?.textContent
    );

    // Contatti
    let contatti = null;

    const telefono = cleanText(
      document.querySelector("#contatti p.text-ellips-custom.mt-0.mb-2 > a")
        ?.textContent
    );

    const aperturaPubblicaEl = Array.from(
      document.querySelectorAll("div.my-1")
    ).find((div) =>
      div.querySelector("strong")?.textContent.includes("Apertura al pubblico")
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
      const spans = Array.from(aperturaAppuntamentoEl.querySelectorAll("span"));
      aperturaSuAppuntamento = spans
        .map((span) => cleanText(span.textContent))
        .join(" ");
    }

    contatti = {
      telefono,
      aperturaAlPubblico,
      aperturaSuAppuntamento,
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
  });

  await createJSON(
    avvisoDiAccertamento,
    "./src/data/services",
    "avviso-di-accertamento"
  );
  await browser.close();

  return avvisoDiAccertamento;
}
