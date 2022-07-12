import { ApiProfilesPublicRepositoryDataAccess } from './api-profiles-public-repository-data-access';
import {UserDto} from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';

const userMock: jest.Mocked<UserDto> = new UserDto() as UserDto;

  describe('ApiTicketRepositoryDataAccess', () => {
  let provider: ApiProfilesPublicRepositoryDataAccess;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiProfilesPublicRepositoryDataAccess],
    }).compile();

  
    userMock.name = "John";
    userMock.email = "johndoe@gmail.com";
    userMock.password = "johndoe1234";

    provider = module.get<ApiProfilesPublicRepositoryDataAccess>(
      ApiProfilesPublicRepositoryDataAccess
    );
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  //createUser endpoint
  describe('createUser',()=>{
    // it('should return void',async ()=>{
    //   jest
    //   .spyOn(provider,'createUser')
    //  // .mockImplementation(():Promise<void> => Promise.resolve());
    //   expect(await provider.createUser("Sparky", "sparkyy@gmail.com", "Electricity","0119874322", "1234Anru")).toBeDefined()
    // });

    it('should return null', async () => {
      jest.spyOn(provider, 'createUser').mockResolvedValue(null);
      expect(await provider.createUser(userMock)).toEqual(null)
    });
  })

  // describe('verifyPassword',()=>{
  //   it('should return true',async ()=>{
  //     jest
  //     .spyOn(provider,'verifyPassword')
  //     .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  //     expect(await provider.verifyUserPassword(userMock.email, userMock.password)).toEqual(false)
  //   });

  // })

    //getUser endpoint
    describe('getUser',()=>{
      const arrayOfUsers:UserDto[] = [];
        it('should return a user',async ()=>{
          jest
          .spyOn(provider,'getUser')
          .mockImplementation(():Promise<UserDto[]>=>Promise.resolve(arrayOfUsers))
          expect(await provider.getUser(2)).toMatchObject(
            expect.arrayContaining(arrayOfUsers)
          )
        });
        
        it('should return null', async () => {
          jest.spyOn(provider, 'getUser').mockResolvedValue(null);
          
          expect(await provider.getUser(2)).toEqual(null);
        });
    })

    //getUserName endpoint
    describe('getUserName',()=>{
      const arrayOfUsers:UserDto[] = [];
        it('should return a user',async ()=>{
          jest
          .spyOn(provider,'getUserName')
          .mockImplementation(():Promise<UserDto[]>=>Promise.resolve(arrayOfUsers))
          expect(await provider.getUserName(userMock.name)).toMatchObject(
            expect.arrayContaining(arrayOfUsers)
          )
        });
        
        it('should return null', async () => {
          jest.spyOn(provider, 'getUserName').mockResolvedValue(null);
          
          expect(await provider.getUserName(userMock.name)).toEqual(null);
        });
    })

    //getUserEmail endpoint
    describe('getUserEmail',()=>{
      const arrayOfUsers:UserDto[] = [];
        it('should return a user',async ()=>{
          jest
          .spyOn(provider,'getUserName')
          .mockImplementation(():Promise<UserDto[]>=>Promise.resolve(arrayOfUsers))
          expect(await provider.getUserName(userMock.email)).toMatchObject(
            expect.arrayContaining(arrayOfUsers)
          )
        });
        
        it('should return null', async () => {
          jest.spyOn(provider, 'getUserName').mockResolvedValue(null);
          
          expect(await provider.getUserName(userMock.email)).toEqual(null);
        });
    })
    
  //UpdateUser 
  describe('UpdateUser',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateUser')
      .mockImplementation(():Promise<UserDto> => Promise.resolve(userMock));
      expect(await provider.updateUser(2,userMock)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateUser').mockResolvedValue(null);
      expect(await provider.updateUser(2,userMock)).toEqual(null)
    });
  })

  //UpdateUserPassword
  describe('UpdateUserPassword',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateUserPassword')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateUserPassword(2,userMock.password)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateUserPassword').mockResolvedValue(null);
      expect(await provider.updateUserPassword(2,userMock.password)).toEqual(null)
    });
  })

    //updateUserName
    describe('updateUserName',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'updateUserName')
        .mockImplementation(():Promise<void> => Promise.resolve());

        expect(await provider.updateUserName(3,userMock.name)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'updateUserName').mockResolvedValue(null);

        expect(await provider.updateUserName(3,userMock.name)).toEqual(null);
      });
    })

    //updateUserEmail
    describe('updateUserEmail',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'updateUserEmail')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await provider.updateUserEmail(3,userMock.email)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'updateUserEmail').mockResolvedValue(null);
        expect(await provider.updateUserEmail(3,userMock.email)).toEqual(null);
      });
    })

    //DeleteUser
    describe('deleteUser',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'deleteUser')
        .mockImplementation(():Promise<void> => Promise.resolve());

        expect(await provider.deleteUser(2)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'deleteUser').mockResolvedValue(null);

        expect(await provider.deleteUser(2)).toEqual(null);
      });
    })

});
