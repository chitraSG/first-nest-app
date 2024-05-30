import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entity/user.entity'; // import your User entity
import { NotFoundException } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findByName: jest.fn(), // Add this line
    findOne: jest.fn(), // Add this line

  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [UserController],
        providers: [
          UserService,
          {
            provide: getRepositoryToken(User), // use getRepositoryToken to generate the correct provider token
            useValue: mockRepository, // provide a mock implementation of the repository
          },
        ],
      }).compile();

      userService = moduleRef.get<UserService>(UserService);
      userController = moduleRef.get<UserController>(UserController);
  });

    describe('addUser', () => {
        it('should add a user', async () => {
            const body = { name: 'Test User', email: 'test@example.com' };
            const newUser = { ...body, id: 1 };
            const allUsers = [newUser];
          
            mockRepository.findOne.mockResolvedValue(null); // Mock findOne instead of findByName
            mockRepository.create.mockReturnValue(newUser);
            mockRepository.save.mockResolvedValue(undefined);
            mockRepository.find.mockResolvedValue(allUsers);
          
            expect(await userService.addUser(body)).toEqual(allUsers);
            expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { name: body.name } }); // Check findOne instead of findByName
            expect(mockRepository.create).toHaveBeenCalledWith(body);
            expect(mockRepository.save).toHaveBeenCalledWith(newUser);
            expect(mockRepository.find).toHaveBeenCalled();
          });
          
          it('should throw an error if user already exists', async () => {
            const body = { name: 'Test User', email: 'test@example.com' };
          
            mockRepository.findOne.mockResolvedValue(body); // Mock findOne instead of findByName
          
            await expect(userService.addUser(body)).rejects.toThrow(new NotFoundException(`User with name ${body.name} already exist`));
            expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { name: body.name } }); // Check findOne instead of findByName
          });
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const result = ['test'];
            jest.spyOn(userService, 'findAll').mockImplementation(() => Promise.resolve(result));

            expect(await userController.findAllUser()).toBe(result);
        });
    });
});