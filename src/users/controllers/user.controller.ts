import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { GamesEntity } from '../interfaces/api/api.dailyschedule.interfaces';
import { PredictionRequest } from '../interfaces/controller/controller.get-prediction.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/daily-schedule')
  async getDailySchedule(): Promise<GamesEntity[]> {
    return this.userService.getDailySchedule();
  }

  @Post('/get-prediction')
  async getPrediction(@Body() body: any): Promise<any> {
    return this.userService.getPrediction(body);
  }
  @Get('/box-scores')
  async getBoxScores(): Promise<any> {
    return this.userService.getBoxScoresForTargetGames();
  }
}
