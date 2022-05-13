import express from 'express';
import nodemailer from 'nodemailer';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { prisma } from './prisma';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedbacks-use-cases';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {

  /** CÓDIGO ABAIXO RESUMI O CÓDIGO COMENTADO
   * data: { type: req.body.type, comment: req.body.comment},
   */
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailAdapter
  )
 
  await submitFeedbackUseCase.execute({ type, comment, screenshot });



return res.status(201).send();
});