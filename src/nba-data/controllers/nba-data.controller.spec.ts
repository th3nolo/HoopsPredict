import { Test, TestingModule } from '@nestjs/testing';
import { NbaDataController } from './nba-data.controller';

describe('NbaDataController', () => {
  let controller: NbaDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NbaDataController],
    }).compile();

    controller = module.get<NbaDataController>(NbaDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
