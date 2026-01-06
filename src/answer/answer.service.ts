import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer } from './schemas/answer.schema';

@Injectable()
export class AnswerService {
  constructor(@InjectModel(Answer.name) private answerModel) {}

  async createAnswer(answerInfo) {
    if (answerInfo.questionId == null) {
      throw new HttpException('QuestionId is required', HttpStatus.BAD_REQUEST);
    }
    const newAnswer = new this.answerModel(answerInfo);
    return await newAnswer.save();
  }
}
