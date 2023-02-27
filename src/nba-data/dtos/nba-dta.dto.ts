import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GameDto {
  @ApiProperty()
  @IsNotEmpty()
  gameId: string;
}

export class ScheduleDto {
  @ApiProperty()
  @IsNotEmpty()
  year: number;

  @ApiProperty()
  @IsNotEmpty()
  month: number;

  @ApiProperty()
  @IsNotEmpty()
  day: number;
}

export class TeamDto {
  @ApiProperty()
  @IsNotEmpty()
  teamId: string;
}
