import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbackRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) { 
    await prisma.feedBack.create({
      data: {
        type, 
        comment,
        screenshot,
      }
  })
}}