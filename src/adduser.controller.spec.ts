import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

describe('UserService (integration)', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should add a user', async () => {
    const testUser = { id: 2, name: 'Test User', password: 'test@example.com' };

    // Mock the findOne and create methods
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
    jest.spyOn(userRepository, 'create').mockReturnValue(testUser);
    jest.spyOn(userRepository, 'save').mockReturnValue(undefined);
    jest.spyOn(userRepository, 'find').mockResolvedValue([testUser]);

    // Call the addUser function
    await userService.addUser(testUser);

    // Verify that findOne and create were called with the correct arguments
    expect(userRepository.findOne).toHaveBeenCalledWith({ where: { name: testUser.name } });
    expect(userRepository.create).toHaveBeenCalledWith(testUser);
  });
});