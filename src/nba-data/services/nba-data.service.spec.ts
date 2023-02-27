import { Test, TestingModule } from '@nestjs/testing';
import { NbaDataService } from './nba-data.service';
import axios from 'axios';
import { apiservice } from './api.service';

// how to run the test..
// yarn test src/nba-data/services/nba-data.service.spec.ts
// npm run test test src/nba-data/services/nba-data.service.spec.ts

describe('NbaDataService', () => {
  let service: NbaDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NbaDataService, apiservice],
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

  //it('should get past and upcoming games', async () => {
  //  const mockData = [
  //    {
  //      DateTime: '2023-02-13T10:30:00.000+01:00',
  //      Status: 'Final',
  //    },
  //    {
  //      DateTime: '2023-02-14T15:00:00.000+01:00',
  //      Status: 'In Progress',
  //    },
  //    {
  //      DateTime: '2023-02-15T12:00:00.000+01:00',
  //      Status: 'Scheduled',
  //    },
  //  ];
  //  //mock the axios.get method to return a promise that resolves to the mock data
  //  jest.spyOn(axios, 'get').mockResolvedValue({ data: mockData });
  //  const result = await service.getupcomingGames();
  //  const currentDate = new Date();
  //  //const pastGames = mockData.filter(
  //  //  (game) => new Date(game.DateTime) < currentDate && game.Status === 'Final'
  //  //);
  //
  //  const upcomingGames = mockData.filter(
  //    (game) =>
  //      new Date(game.DateTime) >= currentDate && game.Status !== 'Final'
  //  );
  //  const expected = { pastGames: [], upcomingGames };
  //  //const expected = { pastGames, upcomingGames };
  //  expect(result).toEqual(expected);
  //
  //  // if you like console.log, you can also use the following
  //  console.log(
  //    `Result: ${JSON.stringify(result)}, Expected: ${JSON.stringify(expected)}`
  //  );
  //});

  it('should get games from the API', () => {
    // don't use mocks use the real thing
    const result = service.getupcomingGames();
    expect(result).toBeDefined();
    console.log(`Result: ${JSON.stringify(result)}`);
  });
});
