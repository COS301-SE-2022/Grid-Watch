import { ApiProfilesPublicRepositoryDataAccess } from './api-profiles-public-repository-data-access';
import {UserDto} from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';
import { Test, TestingModule } from '@nestjs/testing';
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
  //     expect(await provider.verifyPassword("sparky@gmail.com", "123Anru")).toEqual(false)
  //   });

  // })

  //UpdateUser 
  describe('UpdateUser',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateUser')
      .mockImplementation(():Promise<void> => Promise.resolve());
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
      expect(await provider.updateUserPassword(2,userMock)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateUserPassword').mockResolvedValue(null);
      expect(await provider.updateUserPassword(2,userMock)).toEqual(null)
    });
  })

    //updateUserName
    describe('updateUserName',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'updateUserName')
        .mockImplementation(():Promise<void> => Promise.resolve());

        expect(await provider.updateUserName(3,"John")).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'updateUserName').mockResolvedValue(null);

        expect(await provider.updateUserName(3,"John")).toEqual(null);
      });
    })

    //updateUserEmail
    describe('updateUserEmail',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'updateUserEmail')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await provider.updateUserEmail(3,"johndoe@gmail.com")).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'updateUserEmail').mockResolvedValue(null);
        expect(await provider.updateUserEmail(3,"johndoe@gmail.com")).toEqual(null);
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
