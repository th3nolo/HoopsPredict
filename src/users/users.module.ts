import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Games,
  GamesSchema,
  User,
  UserSchema,
  PredictionsSchema,
  Predictions,
} from './entities/user.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { StoreGamesCron } from './cronjobs/store.games';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Games.name, schema: GamesSchema }]),
    MongooseModule.forFeature([
      { name: Predictions.name, schema: PredictionsSchema },
    ]),
    ScheduleModule.forRoot(),
  ],
  providers: [UserService, StoreGamesCron],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
