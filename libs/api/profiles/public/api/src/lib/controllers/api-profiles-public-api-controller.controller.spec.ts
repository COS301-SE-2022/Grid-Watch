import { ApiProfilesPublicApiController } from './api-profiles-public-api-controller.controller';
import {ApiProfilesPublicService} from '@grid-watch/api/profiles/public/service'
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import {UserDto} from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';
import { JwtService } from '@nestjs/jwt';

const userMock: jest.Mocked<UserDto> = new UserDto() as UserDto;
describe('ApiProfilesPublicApiController', () => {
  let controller: ApiProfilesPublicApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiProfilesPublicApiController],
      providers:[ApiProfilesPublicService,CommandBus,QueryBus, JwtService]
    }).compile();

    await module.init();

    controller = module.get<ApiProfilesPublicApiController>(ApiProfilesPublicApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //createUser endpoint
  describe('createUser',()=>{
    // it('should return void',async ()=>{
    //   jest
    //   .spyOn(controller,'createUser')
    //  // .mockImplementation(():Promise<void> => Promise.resolve());
    //   expect(await controller.createUser("Sparky", "sparkyy@gmail.com", "Electricity","0119874322", "1234Anru")).toBeDefined()
    // });

    it('should return null', async () => {
      jest.spyOn(controller, 'createUser').mockResolvedValue(null);
      expect(await controller.createUser(userMock)).toEqual(null)
    });
  })

  // describe('verifyPassword',()=>{
  //   it('should return true',async ()=>{
  //     jest
  //     .spyOn(controller,'verifyPassword')
  //     .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  //     expect(await controller.verifyUserPassword(userMock.email, userMock.password)).toEqual(false)
  //   });

  // })

    //getUser endpoint
    describe('getUser',()=>{
      const arrayOfUsers:UserDto[] = [];
        it('should return a user',async ()=>{
          jest
          .spyOn(controller,'getUser')
          .mockImplementation(():Promise<UserDto[]>=>Promise.resolve(arrayOfUsers))
          expect(await controller.getUser(2)).toMatchObject(
            expect.arrayContaining(arrayOfUsers)
          )
        });
        
        it('should return null', async () => {
          jest.spyOn(controller, 'getUser').mockResolvedValue(null);
          
          expect(await controller.getUser(2)).toEqual(null);
        });
    })

    //getUserName endpoint
    describe('getUserName',()=>{
      const arrayOfUsers:UserDto[] = [];
        it('should return a user',async ()=>{
          jest
          .spyOn(controller,'getUserName')
          .mockImplementation(():Promise<UserDto[]>=>Promise.resolve(arrayOfUsers))
          expect(await controller.getUserName(userMock.name)).toMatchObject(
            expect.arrayContaining(arrayOfUsers)
          )
        });
        
        it('should return null', async () => {
          jest.spyOn(controller, 'getUserName').mockResolvedValue(null);
          
          expect(await controller.getUserName(userMock.name)).toEqual(null);
        });
    })

    //getUserEmail endpoint
    describe('getUserEmail',()=>{
      const arrayOfUsers:UserDto[] = [];
        it('should return a user',async ()=>{
          jest
          .spyOn(controller,'getUserName')
          .mockImplementation(():Promise<UserDto[]>=>Promise.resolve(arrayOfUsers))
          expect(await controller.getUserName(userMock.email)).toMatchObject(
            expect.arrayContaining(arrayOfUsers)
          )
        });
        
        it('should return null', async () => {
          jest.spyOn(controller, 'getUserName').mockResolvedValue(null);
          
          expect(await controller.getUserName(userMock.email)).toEqual(null);
        });
    })
    
  //UpdateUser 
  describe('UpdateUser',()=>{
    it('should return user',async ()=>{
      jest
      .spyOn(controller,'updateUser')
      .mockImplementation(():Promise<UserDto> => Promise.resolve(userMock));
      expect(await controller.updateUser(2,userMock)).toEqual(userMock)
    });

    it('should return null', async () => {
      jest.spyOn(controller, 'updateUser').mockResolvedValue(null);
      expect(await controller.updateUser(2,userMock)).toEqual(null)
    });
  })

  //UpdateUserPassword
  describe('UpdateUserPassword',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(controller,'updateUserPassword')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await controller.updateUserPassword(2,userMock.password)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(controller, 'updateUserPassword').mockResolvedValue(null);
      expect(await controller.updateUserPassword(2,userMock.password)).toEqual(null)
    });
  })

    //updateUserName
    describe('updateUserName',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(controller,'updateUserName')
        .mockImplementation(():Promise<void> => Promise.resolve());

        expect(await controller.updateUserName(3,userMock.name)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(controller, 'updateUserName').mockResolvedValue(null);

        expect(await controller.updateUserName(3,userMock.name)).toEqual(null);
      });
    })
    
    //updateUserRating
    describe('updateUserRating',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(controller,'updateUserRating')
        .mockImplementation(():Promise<void> => Promise.resolve());

        expect(await controller.updateUserRating(3,40)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(controller, 'updateUserRating').mockResolvedValue(null);
        expect(await controller.updateUserRating(3,40)).toEqual(null);
      });
    })

    //resetUserRating
    describe('resetUserRating',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(controller,'resetUserRating')
        .mockImplementation(():Promise<void> => Promise.resolve());

        expect(await controller.resetUserRating(3)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(controller, 'resetUserRating').mockResolvedValue(null);
        expect(await controller.resetUserRating(3)).toEqual(null);
      });
    }) 

    //updateUserEmail
    describe('updateUserEmail',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(controller,'updateUserEmail')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await controller.updateUserEmail(3,userMock.email)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(controller, 'updateUserEmail').mockResolvedValue(null);
        expect(await controller.updateUserEmail(3,userMock.email)).toEqual(null);
      });
    })

    //DeleteUser
    describe('deleteUser',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(controller,'deleteUser')
        .mockImplementation(():Promise<void> => Promise.resolve());

        expect(await controller.deleteUser(2)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(controller, 'deleteUser').mockResolvedValue(null);

        expect(await controller.deleteUser(2)).toEqual(null);
      });
    })

})