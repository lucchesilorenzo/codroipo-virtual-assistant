import { services } from "./scripts/services";

async function main() {
  for (const { service, buildFaq } of services) {
    console.log(`=> Inizio scraping: ${service.name}`);

    const data = await service();
    await buildFaq(data);

    console.log(`=> Completato: ${service.name}`);
  }

  console.log("Tutti gli scraping sono stati completati con successo.");
}

main();
