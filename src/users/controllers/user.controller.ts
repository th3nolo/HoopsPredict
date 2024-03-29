import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { GamesEntity } from '../interfaces/api/api.dailyschedule.interfaces';
import { PredictionRequest } from '../interfaces/controller/controller.get-prediction.interface';
import { ApiOperation, ApiTags, ApiBody, ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/daily-schedule')
  async getDailySchedule(): Promise<GamesEntity[]> {
    return this.userService.getDailySchedule();
  }

  @Post('/get-prediction')
  @ApiOperation({
    summary:
      'Saves the prediction of the user, needs email: string, address:string, prediction:string',
  })
  async getPrediction(@Body() body: PredictionRequest): Promise<any> {
    return this.userService.getPrediction(body);
  }

  @Get('/box-scores')
  async getBoxScores(): Promise<any> {
    return this.userService.getBoxScoresForTargetGames();
  }

  @Get('/get-round')
  async getRound(): Promise<any> {
    return this.userService.getRound();
  }

  @Get('/get-user-predictions')
  @ApiOperation({ summary: 'Gets the user predictions' })
  async getUserPrediction(@Query('email') email: string): Promise<any> {
    return this.userService.getUserPrediction(email);
  }
}
