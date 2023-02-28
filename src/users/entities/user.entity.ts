import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Schedule } from '../interfaces/api/api.dailyschedule.interfaces';

@Schema({ collection: 'users' })
export class User extends Document {
  @Prop({ required: true, unique: true })
  address: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  role: string;
}

@Schema({ collection: 'predictions' })
export class Predictions extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, unique: true })
  address: string;

  @Prop({ type: Types.ObjectId, ref: 'games', required: true })
  lobby: string;

  @Prop({ required: true })
  prediction: string;
}

@Schema({ collection: 'games' })
export class Games extends Document {
  @Prop({ required: true, unique: true })
  id: string;
  games: Schedule[];
  startDate: string;
  endDate: string;
}

export const PredictionsSchema = SchemaFactory.createForClass(Predictions);
export const GamesSchema = SchemaFactory.createForClass(Games);
export const UserSchema = SchemaFactory.createForClass(User);
