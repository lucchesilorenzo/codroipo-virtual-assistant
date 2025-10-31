import { differenceInHours, format, parseISO } from "date-fns";
import fs from "fs/promises";
import cron from "node-cron";

async function checkAppointment() {
  const data = await fs
    .readFile("./src/logs/prenotazione.json", "utf8")
    .catch((error) => {
      if (error.code === "ENOENT") return null;
      throw error;
    });

  if (!data) return;

  const appointment = JSON.parse(data);
  if (!appointment?.start?.dateTime) return;

  const date = parseISO(appointment.start.dateTime);
  const diff = differenceInHours(date, new Date());
  const formattedDate = format(date, "dd/MM/yyyy, HH:mm");

  if (diff >= 23 && diff <= 24) {
    console.log(
      `Promemoria: appuntamento tra 24 ore!\nServizio: ${appointment.summary}\nData: ${formattedDate}`
    );
  }
}

cron.schedule("* * * * *", checkAppointment);
console.log("=> Reminder cron job started");
