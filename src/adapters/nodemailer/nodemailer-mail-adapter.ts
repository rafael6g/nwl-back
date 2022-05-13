import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData }from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4cf9996e1e5b92",
    pass: "a15f4645764c09"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData): Promise<void> {
    await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Rafael Fernandes <rafael.londrina@gmail.com>',
    subject,
     /** Colocar dentro de um array para que nao conte espaço em branco */
    html: body,

    // html: [
    //   `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
    //   `<p>Tipo de feedback: ${type}</p>`,
    //   `<p>Comentário: ${comment}</p>`,	
    //   `</div>`,
    // ].join('\n')
  });
}}