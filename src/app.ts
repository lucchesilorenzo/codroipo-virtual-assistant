import express, { Request, Response } from "express";
import { createLog } from "./utils/create-log";

const app = express();

app.use(express.json());

app.post("/webhook", async (req: Request, res: Response) => {
  const message = req.body.message;

  if (message.type === "end-of-call-report") {
    const messages = message.artifact?.messages || [];

    for (const msg of messages) {
      if (
        msg.role === "tool_call_result" &&
        msg.name === "schedule_appointment"
      ) {
        const appointment = JSON.parse(msg.result);
        const formattedDate = new Intl.DateTimeFormat("it-IT", {
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          year: "numeric",
          month: "2-digit",
        }).format(new Date(appointment.start.dateTime));

        await createLog(
          `\nPrenotazione effettuata con successo!\nServizio: ${appointment.summary}\nData/Ora: ${formattedDate}\nLink: ${appointment.htmlLink}\n---------------------------`,
          "./src/logs",
          "prenotazioni"
        );
      }
    }
  }

  res.sendStatus(200);
});

export default app;
