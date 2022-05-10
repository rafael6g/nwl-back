import express from 'express';
import { prisma } from './prisma';

const app = express();

app.use(express.json());

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

return res.status(201).json({ data: feedback });
});

app.listen(3333, () => {
  console.log('Server started on port 3333');
});