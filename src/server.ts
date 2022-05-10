import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4cf9996e1e5b92",
    pass: "a15f4645764c09"
  }
});

app.post('/feedbacks', async (req, res) => {

  /** CÓDIGO ABAIXO RESUMI O CÓDIGO COMENTADO
   * data: { type: req.body.type, comment: req.body.comment},
   */
  const { type, comment, screenshot } = req.body;
 
  const feedback = await prisma.feedBack.create({
    data: {
      type, 
      comment,
      screenshot,
    }
})

await transport.sendMail({
  from: 'Equipe Feedget <oi@feedget.com>',
  to: 'Rafael Fernandes <rafael.londrina@gmail.com>',
  subject: 'Novo feedback',
   /** Colocar dentro de um array para que nao conte espaço em branco */
  html: [
    `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
    `<p>Tipo de feedback: ${type}</p>`,
    `<p>Comentário: ${comment}</p>`,	
    `</div>`,
  ].join('\n')
});

return res.status(201).json({ data: feedback });
});


app.listen(3333, () => {
  console.log('Server started on port 3333');
});