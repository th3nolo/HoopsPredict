import { Model } from 'mongoose';
import { User } from '../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ISearchStrategy } from "./search.interface";

@Injectable()
export class AddressSearch implements ISearchStrategy {
    constructor(@InjectModel(User.name) private userModel: Model<User> ){}
    async search(filter: any): Promise<any> {
      return await this.userModel.findOne({ address: filter.address }).exec();
}}
