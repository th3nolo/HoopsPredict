import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

import { Games, User, Predictions } from '../entities/user.entity';
import { PredictionRequest } from '../interfaces/controller/controller.get-prediction.interface';
import {
  Schedule,
  League,
  GamesEntity,
  TimeZones,
  Venue,
  BroadcastsEntity,
  HomeOrAway,
} from '../interfaces/api/api.dailyschedule.interfaces';
import {
  BoxScore,
  ScoringEntity,
  Leaders,
  PointsEntityOrReboundsEntityOrAssistsEntity,
  Statistics,
} from '../interfaces/api/api.boxscore.interfaces';
import {
  TeamProfile,
  LeagueOrConferenceOrDivision,
  CoachesEntity,
  PlayersEntity,
  Draft,
  InjuriesEntity,
} from '../interfaces/api/api.teamprofile.interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Games.name) private Games: Model<Games>,
    @InjectModel(Predictions.name) private Predictions: Model<Predictions>
  ) {}

  private readonly API_BASE_URL: string = process.env.API_BASE_URL;
  private readonly API_KEY: string = process.env.API_KEY;
  private readonly lang: string = process.env.LANG;
  private readonly format: string = process.env.FORMAT;

  private async get<T>(endpoint: string): Promise<T> {
    console.log(
      `making a request for this endpoint: ${this.API_BASE_URL}/en${endpoint}.${this.format}`
    );
    const response = await axios.get(
      `${this.API_BASE_URL}/en${endpoint}.${this.format}`,
      {
        params: { api_key: this.API_KEY },
      }
    );
    return response.data as T;
  }

  async getDailySchedule(): Promise<GamesEntity[]> {
    const date = new Date();
    const year = date.toISOString().slice(0, 4);
    const month = date.toISOString().slice(5, 7);
    const day = date.getDate();

    const games: Schedule = await this.get<Schedule>(
      `/games/${year}/${month}/${day}/schedule`
    );
    const upcomingGames = games.games.filter((game) => {
      const gameDate = new Date(game.scheduled);
      console.log(gameDate.getFullYear() === date.getFullYear());
      console.log(gameDate.getMonth() === date.getMonth());
      console.log(gameDate.getDate() === day, `${gameDate.getDate()}===${day}`);
      console.log('this is the game date', gameDate);
      return (
        gameDate.getFullYear() === date.getFullYear() &&
        gameDate.getMonth() === date.getMonth() &&
        gameDate.getDate() === day
      );
    });
    return upcomingGames;
  }

  async storeGames(gameids: any[]) {
    for (let i = 0; i < gameids.length; i++) {
      const game = new this.Games({ gameid: gameids[i] });
      await game.save();
    }
  }

  async BoxScore(gameId: string): Promise<BoxScore> {
    return this.get<BoxScore>(`/games/${gameId}/boxscore`);
  }

  async getPrediction(body: PredictionRequest): Promise<any> {
    const { email, address, prediction } = body;
    const lobby = this.Games.find({});
    const newPredictionInstance = new this.Predictions({
      email,
      address,
      lobby,
      prediction,
    });
    await newPredictionInstance.save();
  }
}
