import { format } from "date-fns";
import express, { Request, Response } from "express";
import { createJSON } from "./utils/create-json";
import { createLog } from "./utils/create-log";

const app = express();

app.use(express.json());

app.post("/webhook", async (req: Request, res: Response) => {
  const message = req.body.message;

  if (message.type === "end-of-call-report") {
    const messages = message.artifact?.messages || [];

    for (const message of messages) {
      if (
        message.role === "tool_call_result" &&
        message.name === "schedule_appointment"
      ) {
        const parsedAppointment = JSON.parse(message.result);

        const formattedDate = format(
          new Date(parsedAppointment.start.dateTime),
          "dd/MM/yyyy, HH:mm"
        );

        const appointment = {
          summary: parsedAppointment.summary,
          htmlLink: parsedAppointment.htmlLink,
          start: {
            dateTime: parsedAppointment.start.dateTime,
            timeZone: parsedAppointment.start.timeZone,
          },
        };

        await createLog(
          `Prenotazione effettuata con successo!\nServizio: ${appointment.summary}\nData/Ora: ${formattedDate}\nLink: ${appointment.htmlLink}\n-----------------\n`,
          "./src/logs",
          "prenotazione"
        );

        await createJSON(appointment, "./src/logs", "prenotazione");
      }
    }
  }

  res.sendStatus(200);
});

export default app;
