import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';
import { nanoid } from 'nanoid';

@Injectable()
export class QuestionService {
  constructor(@InjectModel(Question.name) private questionModel) {}

  async create(author: string) {
    const question = new this.questionModel({
      title: '问卷标题' + Date.now(),
      description: '问卷描述',
      author,
      componentList: [
        {
          fe_id: nanoid(),
          type: 'questionInfo',
          title: '问卷信息',
          props: {
            title: '问卷标题',
            description: '问卷描述',
          },
        },
      ],
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

  async findAllList({
    keyword = '',
    page = 1,
    pageSize = 10,
    isDeleted = false,
    isStar,
    author = '',
  }) {
    const whereOpt = {
      isDeleted,
      author,
    };
    if (isStar != null) {
      whereOpt['isStar'] = isStar;
    }
    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      whereOpt['title'] = { $regex: reg }; //模糊搜索
    }
    return await this.questionModel
      .find(whereOpt)
      .sort({ _id: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
  }

  async findAllCount({ keyword = '', isDeleted = false, isStar, author = '' }) {
    const whereOpt = {
      isDeleted,
      author,
    };
    if (isStar != null) {
      whereOpt['isStar'] = isStar;
    }
    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      whereOpt['title'] = { $regex: reg }; //模糊搜索
    }
    return await this.questionModel.countDocuments(whereOpt);
  }
}
