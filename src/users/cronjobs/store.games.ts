import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UserService } from '../services/user.service';

@Injectable()
export class StoreGamesCron {
  constructor(private readonly userService: UserService) {}

  // Define a cronjob that runs once per day at midnight
  @Cron('0 0 1 * * *')
  async dailyJob() {
    console.log('running daily job');
    //     // Call the getDailySchedule method to retrieve the day's games
    //     const games = await this.userService.getDailySchedule();

    //     // Extract the game IDs from the games array
    //     const gameIds = games.map((game) => game.id);

    //     // Call the storeGames method to save the game IDs to the database
    //     await this.userService.storeGames(gameIds);
  }
}
