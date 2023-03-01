import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class ReceivePredictions {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  predictions: string;
}

export class emailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class UpdateUserDto extends PartialType(ReceivePredictions) {}
