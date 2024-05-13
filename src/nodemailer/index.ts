import * as nodemailer from "nodemailer";
require("dotenv").config();

type SmtpConfigProps = {
  host: string;
  port: number;
  secure: boolean;
  auth: { user: string; pass: string };
};

type UserProps = {
  email: string;
  code: number;
};
export class Mailer {
  smtpConfig: SmtpConfigProps;
  transporter: nodemailer.Transporter;

  constructor() {
    this.smtpConfig = {
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER ?? "",
        pass: process.env.EMAIL_PASSWORD ?? "",
      },
    };
    this.transporter = nodemailer.createTransport(this.smtpConfig);
  }

  async sendEmail(user: UserProps) {
    const html = `
    <div>
    <h3>Olá!, Recebemos sua solicitação para recuperar a senha no Myposts</h3>
    <br/>
    <p>Aqui está o código de recuperação: <b>${user.code}</b></p>
    <br/>
    <p>Atenciosamente Equipe de suporte do Mypost</p>
    </div>
    `;
    return this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Myposts-Support: Password Recovery",
      text: `Olá!\n\nRecebemos sua solicitação para recuperar a senha no Myposts-Support.\n\nAqui está o código de recuperação: ${user.code}\n\nPor favor, use este código para redefinir sua senha.\n\nAtenciosamente,\nEquipe de Suporte do Myposts`,
      html,
    });
  }
}
