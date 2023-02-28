import { PlayersEntitySummary } from '../interfaces/api/api.gamesummary.interfaces';
import { PlayersEntity } from '../interfaces/api/api.teamprofile.interfaces';
import { ScoresHomeAndAway } from '../interfaces/service/nba-data.service.gamesummary';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ApiService } from './api.service';
import { GamesInfo } from '../interfaces/service/nba-data.service.GameInfo';
import { BoxScore } from '../interfaces/api/api.boxscore.interfaces';

dotenv.config();

@Injectable()
export class NbaDataService {
  constructor(private readonly apiService: ApiService) {}

  async getTodayGames(): Promise<GamesInfo[]> {
    const games = await this.apiService.todayGames();
    return games.map((game) => this.mapGameToInfo(game));
  }

  async UpcomingGamesByDay(): Promise<GamesInfo[]> {
    const games = await this.apiService.UpcomingGamesByDay();
    //console.log(`games: ${JSON.stringify(games)}`);
    const gamesInfo = games.map((game) => this.mapGameToInfo(game));
    //console.log(gamesInfo);
    return gamesInfo;
  }

  async getUpcomingGames(
    year: number,
    month: number,
    day: number
  ): Promise<GamesInfo[]> {
    console.log(year, month, day);

    const games = await this.apiService.UpcomingGames(year, month, day);
    return games.map((game) => this.mapGameToInfo(game));
  }

  async getPassedGames(
    year: number,
    month: number,
    day: number
  ): Promise<GamesInfo[]> {
    const games = await this.apiService.PassedGames(year, month, day);
    return games.map((game) => this.mapGameToInfo(game));
  }

  async getBoxScore(gameId: string): Promise<BoxScore> {
    return this.apiService.BoxScore(gameId);
  }

  async getGameSummary(gameId: string): Promise<ScoresHomeAndAway> {
    const gameSummary = await this.apiService.GameSummary(gameId);
    const homeScores: PlayersEntitySummary[] = gameSummary.home.players;
    const awayScores: PlayersEntitySummary[] = gameSummary.away.players;
    return { homeScores, awayScores };
  }

  async getTeamMembers(teamId: string): Promise<PlayersEntity[]> {
    const teamProfile = await this.apiService.teamProfile(teamId);
    const members: PlayersEntity[] = teamProfile.players;
    return members;
  }

  private mapGameToInfo(game: any): GamesInfo {
    return {
      id: game.id,
      status: game.status,
      scheduled: game.scheduled,
      home: game.home,
      away: game.away,
      timeZones: game.time_zones,
    };
  }
}
