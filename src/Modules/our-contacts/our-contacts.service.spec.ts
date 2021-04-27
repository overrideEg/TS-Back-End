import { Test, TestingModule } from '@nestjs/testing';
import { OurContactsService } from './our-contacts.service';

describe('OurContactsService', () => {
  let service: OurContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OurContactsService],
    }).compile();

    service = module.get<OurContactsService>(OurContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
