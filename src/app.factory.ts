/* eslint-disable prettier/prettier */
// app.factory.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Moralis from 'moralis';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as socketio from 'socket.io';
import * as dotenv from 'dotenv';
dotenv.config();

export const createNestApp = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5000;
  //app.set('port', process.env.PORT || 5000);
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  // Configure Moralis
 
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });
 
  // Connect to MongoDB
  mongoose.connect(process.env.URI);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

  // Create socket server
  const server = app.getHttpServer();
  //const io = socketio(server);

  // Set up socket events here

  await app.listen(app.get('port'));
  console.log(`Node app is running on port ${app.get('port')}`);
};
