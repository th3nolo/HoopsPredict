import { Test, TestingModule } from '@nestjs/testing';
import { NbaDataService } from './nba-data.service';
import axios from 'axios';
import { ApiService } from './api.service';

// how to run the test..
// yarn test src/nba-data/services/nba-data.service.spec.ts
// npm run test test src/nba-data/services/nba-data.service.spec.ts

describe('NbaDataService', () => {
  let service: NbaDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NbaDataService, ApiService],
    }).compile();

    service = module.get<NbaDataService>(NbaDataService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get the api key', () => {
    expect(process.env.NBA_API_KEY).toBeDefined();
    //console.log(`API Key: ${process.env.NBA_API_KEY}`);
  });

  //it('should get games from the API', () => {
  //  // don't use mocks use the real thing
  //  const result = service.getTodayGames();
  //  expect(result).toBeDefined();
  //  console.log(`Result: ${JSON.stringify(result)}`);
  //});

  it('should get games from the API', async () => {
    // don't use mocks use the real thing
    const result = await service.UpcomingGamesByDay();
    console.log(`Result: ${result}`);
    expect(result).toBeDefined();
    console.log(`Result: ${JSON.stringify(result)}`);
  });
});
