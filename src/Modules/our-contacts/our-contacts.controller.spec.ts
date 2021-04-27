import { Test, TestingModule } from '@nestjs/testing';
import { OurContactsController } from './our-contacts.controller';
import { OurContactsService } from './our-contacts.service';

describe('OurContactsController', () => {
  let controller: OurContactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OurContactsController],
      providers: [OurContactsService],
    }).compile();

    controller = module.get<OurContactsController>(OurContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
