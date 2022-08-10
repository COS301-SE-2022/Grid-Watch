import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiProfilesAdminService } from './api-profiles-admin-service.service';
import {AdminDto} from '@grid-watch/api/profiles/admin/api/shared/api-profiles-admin-api-dto';

const adminDtoMock: jest.Mocked<AdminDto> = new AdminDto() as AdminDto;

describe('ApiProfilesAdminService', () => {
  let service: ApiProfilesAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiProfilesAdminService, CommandBus, QueryBus],
    }).compile();

    service = module.get<ApiProfilesAdminService>(
      ApiProfilesAdminService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //createAdmin endpoint
  describe('createAdmin',()=>{
    it('should return admin',async ()=>{
      jest
      .spyOn(service,'createAdmin')
      .mockImplementation(():Promise<AdminDto> => Promise.resolve(adminDtoMock))
      expect(await service.createAdmin(adminDtoMock)).toEqual(adminDtoMock)
    });

    it('should return null', async () => {
      jest.spyOn(service, 'createAdmin').mockResolvedValue(null);
      expect(await service.createAdmin(adminDtoMock)).toEqual(null)
    });
  })

  //getAllAdmins endpoint
  describe('getAllAdmins',()=>{
    const arrayOfAdmins:AdminDto[] = [];
    it('should return all Admins',async ()=>{
      jest
      .spyOn(service,'getAllAdmins')
      .mockImplementation(():Promise<AdminDto[]>=>Promise.resolve(arrayOfAdmins))
      expect(await service.getAllAdmins()).toMatchObject(
        expect.arrayContaining(arrayOfAdmins)
      )
    });
    
    it('should return null', async () => {
      jest.spyOn(service, 'getAllAdmins').mockResolvedValue(null);
      expect(await service.getAllAdmins()).toEqual(null);
    });
  })
  
  //getAdmin endpoint
  describe('getAdmin',()=>{
    const arrayOfAdmins:AdminDto[] = [];
      it('should return a Admin',async ()=>{
        jest
        .spyOn(service,'getAdmin')
        .mockImplementation(():Promise<AdminDto[]>=>Promise.resolve(arrayOfAdmins))
        expect(await service.getAdmin(2)).toMatchObject(
          expect.arrayContaining(arrayOfAdmins)
        )
      });

      it('should return null', async () => {
        jest.spyOn(service, 'getAdmin').mockResolvedValue(null);
        expect(await service.getAdmin(2)).toEqual(null);
      });
  })

  //getAdminName endpoint
  describe('getAdminName',()=>{
    const arrayOfAdmins:AdminDto[] = [];
      it('should return a Admin',async ()=>{
        jest
        .spyOn(service,'getAdminName')
        .mockImplementation(():Promise<AdminDto[]>=>Promise.resolve(arrayOfAdmins))
        expect(await service.getAdminName(adminDtoMock.name)).toMatchObject(
          expect.arrayContaining(arrayOfAdmins)
        )
      });

      it('should return null', async () => {
        jest.spyOn(service, 'getAdminName').mockResolvedValue(null); 
        expect(await service.getAdminName(adminDtoMock.name)).toEqual(null);
      });
  })

  //searchAdminName endpoint
  describe('searchAdminName',()=>{
    const arrayOfAdmins:AdminDto[] = [];
      it('should return a Admin',async ()=>{
        jest
        .spyOn(service,'searchAdminName')
        .mockImplementation(():Promise<AdminDto[]>=>Promise.resolve(arrayOfAdmins))
        expect(await service.searchAdminName(adminDtoMock.name)).toMatchObject(
          expect.arrayContaining(arrayOfAdmins)
        )
      });

      it('should return null', async () => {
        jest.spyOn(service, 'searchAdminName').mockResolvedValue(null); 
        expect(await service.searchAdminName(adminDtoMock.name)).toEqual(null);
      });
  })

  //getAdminContactNr endpoint
  describe('getAdminContactNr',()=>{
    const arrayOfAdmins:AdminDto[] = [];
      it('should return a Admin',async ()=>{
        jest
        .spyOn(service,'getAdminCellNr')
        .mockImplementation(():Promise<AdminDto[]>=>Promise.resolve(arrayOfAdmins))
        expect(await service.getAdminCellNr(adminDtoMock.contactNumber)).toMatchObject(
          expect.arrayContaining(arrayOfAdmins)
        )
      });

      it('should return null', async () => {
        jest.spyOn(service, 'getAdminCellNr').mockResolvedValue(null); 
        expect(await service.getAdminCellNr(adminDtoMock.contactNumber)).toEqual(null);
      });
  })

  //getAdminEmail endpoint
  describe('getAdminEmail',()=>{
    const arrayOfAdmins:AdminDto[] = [];
      it('should return a Admin',async ()=>{
        jest
        .spyOn(service,'getAdminEmail')
        .mockImplementation(():Promise<AdminDto[]>=>Promise.resolve(arrayOfAdmins))
        expect(await service.getAdminEmail(adminDtoMock.email)).toMatchObject(
          expect.arrayContaining(arrayOfAdmins)
        )
      });

      it('should return null', async () => {
        jest.spyOn(service, 'getAdminEmail').mockResolvedValue(null); 
        expect(await service.getAdminEmail(adminDtoMock.email)).toEqual(null);
      });
    })  

  //getAdminCities endpoint
  describe('getAdminCities',()=>{
    const arrayOfAdmins:AdminDto[] = [];
      it('should return Admins',async ()=>{
        jest
        .spyOn(service,'getAdminCities')
        .mockImplementation(():Promise<AdminDto[]>=>Promise.resolve(arrayOfAdmins))
        expect(await service.getAdminCities("Pretoria")).toMatchObject(
          expect.arrayContaining(arrayOfAdmins)
        )
      });

      it('should return null', async () => {
        jest.spyOn(service, 'getAdminCities').mockResolvedValue(null); 
        expect(await service.getAdminCities("Pretoria")).toEqual(null);
      });
  })

  //AddAdminCity endpoint
  describe('AddAdminCity',()=>{
      it('should return Admins',async ()=>{
        jest
        .spyOn(service,'addAdminCity')
        .mockImplementation(():Promise<void>=>Promise.resolve())
        expect(await service.addAdminCity(2,"Pretoria")).toBeUndefined()
      });
      it('should return null', async () => {
        jest.spyOn(service, 'addAdminCity').mockResolvedValue(null); 
        expect(await service.addAdminCity(2,"Pretoria")).toEqual(null);
      });
  })  

  
   describe('verifyPassword',()=>{
     it('should return true',async ()=>{
       jest
       .spyOn(service,'verifyAdminPassword')
       .mockImplementation(():Promise<boolean> => Promise.resolve(true));
       expect(await service.verifyAdminPassword(adminDtoMock.email,adminDtoMock.password)).toEqual(true)
     })
   })

  //UpdateAdmin
  describe('UpdateAdmin',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(service,'updateAdmin')
      .mockImplementation(():Promise<AdminDto> => Promise.resolve(adminDtoMock));
      expect(await service.updateAdmin(2,adminDtoMock)).toEqual(adminDtoMock)
    });

    it('should return null', async () => {
      jest.spyOn(service, 'updateAdmin').mockResolvedValue(null);
      expect(await service.updateAdmin(2,adminDtoMock)).toEqual(null)
    });
  })

    //updateAdminName
    describe('updateAdminName',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(service,'updateAdminName')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await service.updateAdminName(3,adminDtoMock.name)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(service, 'updateAdminName').mockResolvedValue(null);
        expect(await service.updateAdminName(3,adminDtoMock.name)).toEqual(null);
      });
    })

  //updateAdminEmail
  describe('updateAdminEmail',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(service,'updateAdminEmail')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await service.updateAdminEmail(3,adminDtoMock.email)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(service, 'updateAdminEmail').mockResolvedValue(null);
      expect(await service.updateAdminEmail(3,adminDtoMock.email)).toEqual(null);
    });
  })

  //updateAdminContactNr
  describe('updateAdminContactNr',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(service,'updateAdminContactNr')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await service.updateAdminContactNr(3,"0122238843")).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(service, 'updateAdminContactNr').mockResolvedValue(null);
      expect(await service.updateAdminContactNr(3,"0122238843")).toEqual(null);
    });
  })

  //updateAdminCities
  describe('updateAdminCities',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(service,'updateAdminCities')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await service.updateAdminCities(3,adminDtoMock.cities)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(service, 'updateAdminCities').mockResolvedValue(null);
      expect(await service.updateAdminCities(3,adminDtoMock.cities)).toEqual(null);
    });
  })

  //DeleteAdmin
  describe('deleteAdmin',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(service,'deleteAdmin')
      .mockImplementation(():Promise<void> => Promise.resolve());

      expect(await service.deleteAdmin(2)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(service, 'deleteAdmin').mockResolvedValue(null);
      expect(await service.deleteAdmin(2)).toEqual(null);
    });
  })
});
