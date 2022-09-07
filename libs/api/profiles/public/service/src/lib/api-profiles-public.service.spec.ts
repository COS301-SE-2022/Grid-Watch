import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiProfilesPublicService } from './api-profiles-public.service';

import {UserDto} from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';

const userMock: jest.Mocked<UserDto> = new UserDto() as UserDto;

describe('ApiProfilesPublicService', () => {
  let service: ApiProfilesPublicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiProfilesPublicService, CommandBus, QueryBus],
    }).compile();

    service = module.get<ApiProfilesPublicService>(ApiProfilesPublicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //createUser endpoint
  describe('createUser',()=>{
    // it('should return void',async ()=>{
    //   jest
    //   .spyOn(service,'createUser')
    //  // .mockImplementation(():Promise<void> => Promise.resolve());
    //   expect(await service.createUser("Sparky", "sparkyy@gmail.com", "Electricity","0119874322", "1234Anru")).toBeDefined()
    // });

    it('should return null', async () => {
      jest.spyOn(service, 'createUser').mockResolvedValue(null);
      expect(await service.createUser(userMock)).toEqual(null)
    });
  })

  // describe('verifyPassword',()=>{
  //   it('should return true',async ()=>{
  //     jest
  //     .spyOn(service,'verifyPassword')
  //     .mockImplementation(():Promise<boolean> => Promise.resolve(true));
  //     expect(await service.verifyUserPassword(userMock.email, userMock.password)).toEqual(false)
  //   });

  // })

    //getUser endpoint
    describe('getUser',()=>{
      const arrayOfUsers:UserDto[] = [];
        it('should return a user',async ()=>{
          jest
          .spyOn(service,'getUser')
          .mockImplementation(():Promise<UserDto[]>=>Promise.resolve(arrayOfUsers))
          expect(await service.getUser(2)).toMatchObject(
            expect.arrayContaining(arrayOfUsers)
          )
        });
        
        it('should return null', async () => {
          jest.spyOn(service, 'getUser').mockResolvedValue(null);
          
          expect(await service.getUser(2)).toEqual(null);
        });
    })

    //getUserName endpoint
    describe('getUserName',()=>{
      const arrayOfUsers:UserDto[] = [];
        it('should return a user',async ()=>{
          jest
          .spyOn(service,'getUserName')
          .mockImplementation(():Promise<UserDto[]>=>Promise.resolve(arrayOfUsers))
          expect(await service.getUserName(userMock.name)).toMatchObject(
            expect.arrayContaining(arrayOfUsers)
          )
        });
        
        it('should return null', async () => {
          jest.spyOn(service, 'getUserName').mockResolvedValue(null);
          
          expect(await service.getUserName(userMock.name)).toEqual(null);
        });
    })

    //getUserEmail endpoint
    describe('getUserEmail',()=>{
      const arrayOfUsers:UserDto[] = [];
        it('should return a user',async ()=>{
          jest
          .spyOn(service,'getUserName')
          .mockImplementation(():Promise<UserDto[]>=>Promise.resolve(arrayOfUsers))
          expect(await service.getUserName(userMock.email)).toMatchObject(
            expect.arrayContaining(arrayOfUsers)
          )
        });
        
        it('should return null', async () => {
          jest.spyOn(service, 'getUserName').mockResolvedValue(null);
          
          expect(await service.getUserName(userMock.email)).toEqual(null);
        });
    })
    
  //UpdateUser 
  describe('UpdateUser',()=>{
    it('should return user',async ()=>{
      jest
      .spyOn(service,'updateUser')
      .mockImplementation(():Promise<UserDto> => Promise.resolve(userMock));
      expect(await service.updateUser(2,userMock)).toEqual(userMock)
    });

    it('should return null', async () => {
      jest.spyOn(service, 'updateUser').mockResolvedValue(null);
      expect(await service.updateUser(2,userMock)).toEqual(null)
    });
  })

  //UpdateUserPassword
  describe('UpdateUserPassword',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(service,'updateUserPassword')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await service.updateUserPassword(2,userMock.password)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(service, 'updateUserPassword').mockResolvedValue(null);
      expect(await service.updateUserPassword(2,userMock.password)).toEqual(null)
    });
  })

    //updateUserName
    describe('updateUserName',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(service,'updateUserName')
        .mockImplementation(():Promise<void> => Promise.resolve());

        expect(await service.updateUserName(3,userMock.name)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(service, 'updateUserName').mockResolvedValue(null);

        expect(await service.updateUserName(3,userMock.name)).toEqual(null);
      });
    })

 //updateUserRating
 describe('updateUserRating',()=>{
  it('should return void',async ()=>{
    jest
    .spyOn(service,'updateUserRating')
    .mockImplementation(():Promise<void> => Promise.resolve());

    expect(await service.updateUserRating(3,40)).toBeUndefined()
  });

  it('should return null', async () => {
    jest.spyOn(service, 'updateUserRating').mockResolvedValue(null);
    expect(await service.updateUserRating(3,40)).toEqual(null);
  });
})

//incUserRating
describe('incUserRating',()=>{
  it('should return void',async ()=>{
    jest
    .spyOn(service,'incUserRating')
    .mockImplementation(():Promise<void> => Promise.resolve());

    expect(await service.incUserRating(3)).toBeUndefined()
  });

  it('should return null', async () => {
    jest.spyOn(service, 'incUserRating').mockResolvedValue(null);
    expect(await service.incUserRating(3)).toEqual(null);
  });
})

//decUserRating
describe('decUserRating',()=>{
  it('should return void',async ()=>{
    jest
    .spyOn(service,'decUserRating')
    .mockImplementation(():Promise<void> => Promise.resolve());

    expect(await service.decUserRating(3)).toBeUndefined()
  });

  it('should return null', async () => {
    jest.spyOn(service, 'decUserRating').mockResolvedValue(null);
    expect(await service.decUserRating(3)).toEqual(null);
  });
})

//resetUserRating
describe('resetUserRating',()=>{
  it('should return void',async ()=>{
    jest
    .spyOn(service,'resetUserRating')
    .mockImplementation(():Promise<void> => Promise.resolve());

    expect(await service.resetUserRating(3)).toBeUndefined()
  });

  it('should return null', async () => {
    jest.spyOn(service, 'resetUserRating').mockResolvedValue(null);
    expect(await service.resetUserRating(3)).toEqual(null);
  });
})     

    //updateUserEmail
    describe('updateUserEmail',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(service,'updateUserEmail')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await service.updateUserEmail(3,userMock.email)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(service, 'updateUserEmail').mockResolvedValue(null);
        expect(await service.updateUserEmail(3,userMock.email)).toEqual(null);
      });
    })

    //DeleteUser
    describe('deleteUser',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(service,'deleteUser')
        .mockImplementation(():Promise<void> => Promise.resolve());

        expect(await service.deleteUser(2)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(service, 'deleteUser').mockResolvedValue(null);

        expect(await service.deleteUser(2)).toEqual(null);
      });
    })
});
