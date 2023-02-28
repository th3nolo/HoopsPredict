import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { GamesEntity } from '../interfaces/api/api.dailyschedule.interfaces';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/daily-schedule')
  async getDailySchedule(): Promise<GamesEntity[]> {
    return this.userService.getDailySchedule();
  }
  @Get('/box-scores')
  async getBoxScores(): Promise<any> {
    return this.userService.getBoxScoresForTargetGames();
  }
}
