import { Test, TestingModule } from '@nestjs/testing';
import { CarModificationController } from './car-modification.controller';

describe('CarModificationController', () => {
  let controller: CarModificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarModificationController],
    }).compile();

    controller = module.get<CarModificationController>(CarModificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
