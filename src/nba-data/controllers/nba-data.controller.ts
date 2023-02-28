import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { ApiService } from '../services/api.service';
import { ApiOperation, ApiTags, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { NbaDataService } from '../services/nba-data.service';
import { GamesInfo } from '../interfaces/service/nba-data.service.GameInfo';
import { BoxScore } from '../interfaces/api/api.boxscore.interfaces';
import { ScoresHomeAndAway } from '../interfaces/service/nba-data.service.gamesummary';
import { GameDto, ScheduleDto, TeamDto } from '../dtos/nba-dta.dto';
import { PlayersEntity } from '../interfaces/api/api.teamprofile.interfaces';

@Controller('nba')
@ApiTags('NBA')
export class NbaDataController {
  constructor(
    private readonly nbaDataService: NbaDataService,
    private readonly apiService: ApiService
  ) {}

  @Post('upcoming-games')
  @ApiOperation({ summary: 'Get upcoming games' })
  @ApiBody({ type: ScheduleDto })
  @ApiOkResponse({ description: 'status ok' })
  async getUpcomingGames(
    @Body() scheduleDto: ScheduleDto
  ): Promise<GamesInfo[]> {
    console.log('executing this code');
    const { year, month, day } = scheduleDto;
    return this.nbaDataService.getUpcomingGames(year, month, day);
  }

  @Post('today-games')
  @ApiOperation({ summary: 'Get games scheduled for a specific day' })
  @ApiOkResponse({ description: 'Games retrieved successfully' })
  async getTodayGames(): Promise<GamesInfo[]> {
    return await this.nbaDataService.getTodayGames();
  }

  @Post('passed-games')
  @ApiOperation({ summary: 'Get games that have passed on a specific day' })
  @ApiBody({ type: ScheduleDto })
  @ApiOkResponse({ description: 'Games retrieved successfully' })
  async getPassedGames(@Body() scheduleDto: ScheduleDto): Promise<GamesInfo[]> {
    const { year, month, day } = scheduleDto;
    return this.nbaDataService.getPassedGames(year, month, day);
  }

  @Post('box-score')
  @ApiOperation({ summary: 'Get box score for a specific game' })
  @ApiBody({ type: GameDto })
  @ApiOkResponse({ description: 'Box score retrieved successfully' })
  async getBoxScore(@Body() gameId: GameDto): Promise<BoxScore> {
    return this.nbaDataService.getBoxScore(gameId.gameId);
  }

  @Get('game-summary/:gameId')
  @ApiOperation({ summary: 'Get game summary for a specific game' })
  @ApiOkResponse({ description: 'Game summary retrieved successfully' })
  async getGameSummary(
    @Param('gameId') gameId: string
  ): Promise<ScoresHomeAndAway> {
    return this.nbaDataService.getGameSummary(gameId);
  }

  @Get('team')
  @ApiOperation({ summary: 'Get team profile' })
  @ApiBody({ type: TeamDto })
  async getTeamProfile(@Body() teamDto: TeamDto): Promise<PlayersEntity[]> {
    return this.nbaDataService.getTeamMembers(teamDto.teamId);
  }
}
