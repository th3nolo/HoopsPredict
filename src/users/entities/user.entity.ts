import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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

  @Prop({ required: true, unique: true })
  username: string;

  @Prop([{ type: Types.ObjectId, ref: 'lobby' }])
  lobby: string;
}

@Schema({ collection: 'games' })
export class Games extends Document {
  @Prop({ required: true, unique: true })
  id: string;
}

export const PredictionsSchema = SchemaFactory.createForClass(Predictions);
export const GamesSchema = SchemaFactory.createForClass(Games);
export const UserSchema = SchemaFactory.createForClass(User);
