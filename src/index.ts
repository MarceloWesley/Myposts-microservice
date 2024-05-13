import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { Mailer } from "./nodemailer";
import { generateCode } from "./utils/generate-code";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
const email = new Mailer();

app.post("/reset-password/", async (req, res) => {
  const param = req.query.email as string | any;
  const code = generateCode(6);

  try {
    const response = await email.sendEmail(param, code);
    return res.json({ response }).status(200);
  } catch (error) {
    res.status(500).send({ error });
  }
});

export const handler = serverless(app);
