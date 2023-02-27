import { Injectable } from '@nestjs/common';
import { addDays, startOfWeek, getMonth, isLeapYear } from 'date-fns';

import axios from 'axios';
import * as dotenv from 'dotenv';
//import { ApiCacheService } from './cache.service';
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
import * as schedule from 'node-schedule';
import { GameSummary } from '../interfaces/api/api.gamesummary.interfaces';
dotenv.config();

@Injectable()
export class ApiService {
  private readonly apiUrl: string;

  private readonly API_BASE_URL: string = process.env.API_BASE_URL;
  private readonly API_KEY: string = process.env.NBA_API_KEY;
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

  isLeapYear(year: number): boolean {
    if (year % 4 === 0) {
      if (year % 100 === 0) {
        if (year % 400 === 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  async filterGamesByStatus(
    status: string,
    year: number,
    month: number,
    day: number
  ): Promise<GamesEntity[]> {
    const paddedMonth = month.toString().padStart(2, '0');
    const paddedDay = day.toString().padStart(2, '0');
    const date = new Date(year, month - 1, day);
    console.log('The filter date: ');
    console.log(date);
    const games: Schedule = await this.get<Schedule>(
      `/games/${year}/${paddedMonth}/${paddedDay}/schedule`
    );

    const filterFns = {
      closed: (game) =>
        new Date(game.scheduled) <= date && game.status === 'closed',
      scheduledSinceToday: (game) =>
        new Date(game.scheduled) >= date && game.status === 'scheduled',
      duringThisDay: (game) =>
        game.scheduled.slice(0, 10) === `${year}-${month}-${day}`,
    };

    const filterFn = filterFns[status];
    if (filterFn) {
      const filteredGames = games.games.filter(filterFn);
      return filteredGames;
    } else {
      throw new Error(`Invalid status: ${status}`);
    }
  }

  async UpcomingGames(
    year: number,
    month: number,
    day: number
  ): Promise<GamesEntity[]> {
    console.log('executing the upcoming');
    const ONE_WEEK_IN_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;
    const startDate = new Date(year, month - 1, day);
    const endDate = new Date(startDate.getTime() + ONE_WEEK_IN_MILLISECONDS);
    const games: GamesEntity[] = [];
    let currentDay = startDate.getDate();
    let currentMonth = startDate.getMonth() + 1;
    let currentYear = startDate.getFullYear();
    console.log(
      'Loop conditionals:',
      currentYear,
      endDate.getFullYear(),
      currentMonth,
      endDate.getMonth(),
      currentDay,
      endDate.getDate()
    );
    console.log('Current year is lower', currentYear < endDate.getFullYear());
    console.log(
      'Year is equal than the current year',
      currentYear === endDate.getFullYear()
    );
    console.log('Month is lower', currentMonth <= endDate.getMonth());
    console.log('the day is lower', currentDay <= endDate.getDate());
    while (
      currentYear < endDate.getFullYear() ||
      (currentYear === endDate.getFullYear() &&
        currentMonth <= endDate.getMonth() &&
        currentDay <= endDate.getDate())
    ) {
      console.log('Entered the loop');
      // Make request to API for games on current day
      const gamesForDay = await this.filterGamesByStatus(
        'scheduledSinceToday',
        currentYear,
        currentMonth,
        currentDay
      );
      // Add games to result array
      games.push(...gamesForDay);
      // Increment day by one
      if (
        (currentMonth === 2 &&
          currentDay === 28 &&
          !this.isLeapYear(currentYear)) ||
        (currentMonth === 2 &&
          currentDay === 29 &&
          this.isLeapYear(currentYear)) ||
        ((currentMonth === 4 ||
          currentMonth === 6 ||
          currentMonth === 9 ||
          currentMonth === 11) &&
          currentDay === 30) ||
        ((currentMonth === 1 ||
          currentMonth === 3 ||
          currentMonth === 5 ||
          currentMonth === 7 ||
          currentMonth === 8 ||
          currentMonth === 10) &&
          currentDay === 31)
      ) {
        currentDay = 1;
        currentMonth++;
        if (currentMonth > 12) {
          currentMonth = 1;
          currentYear++;
        }
      } else {
        currentDay++;
      }
    }

    return games;
  }

  async todayGames(): Promise<GamesEntity[]> {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const filteredGames = await this.filterGamesByStatus(
      'duringThisDay',
      year,
      month,
      day
    );
    return filteredGames;
  }

  async PassedGames(
    year: number,
    month: number,
    day: number
  ): Promise<GamesEntity[]> {
    const passedGames = await this.filterGamesByStatus(
      'closed',
      year,
      month,
      day
    );
    return passedGames;
  }

  async BoxScore(gameId: string): Promise<BoxScore> {
    return this.get<BoxScore>(`/games/${gameId}/boxscore`);
  }

  async GameSummary(gameId: string): Promise<GameSummary> {
    return this.get<GameSummary>(`/games/${gameId}/summary`);
  }

  async teamProfile(teamId: string): Promise<TeamProfile> {
    return this.get<TeamProfile>(`/teams/${teamId}/profile`);
  }

  // async getTotalPointsForPassedGames() {
  //   let totalPoints = 0;
  //   const passedGames = await this.PassedGames();
  //   for (const game of passedGames) {
  //     totalPoints += game.home_points + game.away_points;
  //   }
  //   return totalPoints;
  // }

  // async sumPointsAtMidnight(): Promise<number> {
  //   const date = new Date();
  //   const year = date.getFullYear();
  //   const month = date.getMonth() + 1;
  //   const day = date.getDate();

  //   const passedGames = await this.filterGamesByStatus('closed');
  //   const todayGames = passedGames.filter(
  //     (game) => game.scheduled.slice(0, 10) === `${year}-${month}-${day}`
  //   );

  //   let totalPoints = 0;
  //   for (const game of todayGames) {
  //     totalPoints += game.home_points + game.away_points;
  //   }

  //   return totalPoints;
  // }

  // Schedule the task to run at midnight every day
}
