import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { enviroments } from './environments';
import config from './config';
import * as dotenv from 'dotenv';
import { NbaDataModule } from './nba-data/nba-data.module';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    UsersModule,
    MongooseModule.forRoot(process.env.URI),
    NbaDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
