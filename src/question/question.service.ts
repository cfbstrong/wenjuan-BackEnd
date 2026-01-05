import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';

@Injectable()
export class QuestionService {
  constructor(@InjectModel(Question.name) private questionModel) {}

  async create() {
    const question = new this.questionModel({
      title: 'What is the capital of France?' + Math.random(),
      description: 'This is a question about geography',
    });
    return await question.save();
  }

  async deleteOne(id: string) {
    return await this.questionModel.findByIdAndDelete(id);
  }

  async update(id: string, updateData) {
    return await this.questionModel.updateOne({ _id: id }, updateData);
  }

  async findOne(id: string) {
    return await this.questionModel.findById(id);
  }
}
