import { Module } from '@nestjs/common';
import { NbaDataController } from './controllers/nba-data.controller';
import { NbaDataService } from './services/nba-data.service';
import { ApiService } from './services/api.service';
import { ApiCacheService } from './services/cache.service';

@Module({
  controllers: [NbaDataController],
  providers: [NbaDataService, ApiService],
  exports: [NbaDataService, ApiService],
})
export class NbaDataModule {}
