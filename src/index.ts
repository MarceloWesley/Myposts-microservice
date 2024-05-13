import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { Mailer } from "./nodemailer";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
const email = new Mailer();

app.post("/reset-password/", async (req, res) => {
  const body = { email: req.body.email, code: req.body.code } as object | any;

  try {
    const response = await email.sendEmail(body);
    return res.json({ response }).status(200);
  } catch (error) {
    res.status(500).send({ error });
  }
});

export const handler = serverless(app);
