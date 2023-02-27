import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import axios from 'axios';

import { User } from '../entities/user.entity';
import { ReceivePredictions } from '../dtos/user.dto';
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
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private readonly API_BASE_URL: string = process.env.API_BASE_URL;
  private readonly API_KEY: string = process.env.NBA_API_KEY;
  private readonly lang: string = process.env.LANG;
  private readonly format: string = process.env.FORMAT;

  async getDailySchedule(): Promise<GamesEntity[]> {
    const date = new Date();
    // To get the year, the month and the day correctly I had to use the slice method instead of the API of Data object as it was giving me the wrong month.
    const year = date.toISOString().slice(0, 4);
    const month = date.toISOString().slice(5, 7);
    const day = date.toISOString().slice(8, 10);
    // set a var response with an axios.get call to API_BASE_URL + options to handle authentication of type API_KEY which its API key the format of the call it's the following `${this.API_BASE_ULR}/:locale/games/:year/:month/:day/schedule.${this.format}`

    const response = await axios.get(
      `${this.API_BASE_URL}/${this.lang}/games/${year}/${month}/${day}/schedule.${this.format}`,
      {
        params: {
          api_key: this.API_KEY,
        },
      }
    );
    const games: Schedule = response.data;

    const upcomingGames = games.games.filter(
      (game) => new Date(game.scheduled) >= date
    );
    return upcomingGames;
  }
}
