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
        responseType: 'json',
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

  // async BoxScore(gameId: string): Promise<any> {
  //   return this.get<any>(`/games/${gameId}/summary`);
  // }
  async BoxScore(gameId: string): Promise<any> {
    console.log(
      'this is the game',
      `${this.API_BASE_URL}/en/games/${gameId}/summary.${this.format}`
    );
    const response = await axios.get(
      `${this.API_BASE_URL}/en/games/${gameId}/summary.${this.format}`,
      {
        params: { api_key: this.API_KEY },
      }
    );
    return response.data;
  }

  // async getBoxScoresForTargetGames() {
  //   const target_games_27 = [
  //     'd42699b1-a858-4e4e-8dc3-19bee6d46a60',
  //     'efb11f9b-ac96-4810-ad0f-794f07aa0394',
  //     // 'b0dc082b-c9bb-44db-a201-df84ae2fae7d',
  //     // '35dcfa81-38a2-4bfa-aee1-1e9983534720',
  //   ];

  //   const summaries = {};

  //   for (const gameId of target_games_27) {
  //     const boxScore = await this.BoxScore(gameId);
  //     summaries[gameId] = boxScore;
  //   }

  //   return summaries;
  // }

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

  async getBoxScoresForTargetGames() {
    const target_games_27 = [
      'd42699b1-a858-4e4e-8dc3-19bee6d46a60',
      'efb11f9b-ac96-4810-ad0f-794f07aa0394',
      'b0dc082b-c9bb-44db-a201-df84ae2fae7d',
      '35dcfa81-38a2-4bfa-aee1-1e9983534720',
    ];

    const summaries = {};
    let totalPoints = 0;
    const pointsByGame = {};

    for (const gameId of target_games_27) {
      const boxScore = await this.BoxScore(gameId);
      summaries[gameId] = boxScore;
      const gameSummary = summaries[gameId];
      const points = gameSummary.home.points + gameSummary.away.points;
      pointsByGame[gameId] = points;
      totalPoints += points;
    }

    console.log(summaries);

    const result = {
      pointsByGame,
      totalPoints,
      gameInfo: {},
    };

    for (const gameId in summaries) {
      const gameSummary = summaries[gameId];
      result.gameInfo[gameId] = {
        homeTeamName: gameSummary.home.name,
        awayTeamName: gameSummary.away.name,
      };
    }

    console.log(result.totalPoints);
    console.log(result.pointsByGame);
    console.log(result.gameInfo);
    return result;
  }
}
