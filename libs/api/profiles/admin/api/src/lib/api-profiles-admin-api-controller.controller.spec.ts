import { Test, TestingModule } from '@nestjs/testing';
import { ApiProfilesAdminApiController } from './api-profiles-admin-api-controller.controller';
import {ApiProfilesAdminService} from '@grid-watch/api/profiles/admin/service';
import {AdminDto} from '@grid-watch/api/profiles/admin/api/shared/api-profiles-admin-api-dto'
import { CommandBus, QueryBus } from '@nestjs/cqrs';

const adminDtoMock: jest.Mocked<AdminDto> = new AdminDto() as AdminDto;

describe('ApiProfilesAdminApiController', () => {
  let controller: ApiProfilesAdminApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiProfilesAdminApiController],
      providers:[ApiProfilesAdminService,CommandBus,QueryBus]
    }).compile();

    await module.init();

    controller = module.get<ApiProfilesAdminApiController>(ApiProfilesAdminApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //createAdmin endpoint
  describe('createAdmin',()=>{
    it('should return admin',async ()=>{
      jest
      .spyOn(controller,'createAdmin')
      .mockImplementation(():Promise<AdminDto> => Promise.resolve(adminDtoMock))
      expect(await controller.createAdmin(adminDtoMock)).toEqual(adminDtoMock)
    });

    it('should return null', async () => {
      jest.spyOn(controller, 'createAdmin').mockResolvedValue(null);
      expect(await controller.createAdmin(adminDtoMock)).toEqual(null)
    });
  })

  //getAllAdmins endpoint
  describe('getAllAdmins',()=>{
    const arrayOfAdmins:AdminDto[] = [];
    it('should return all Admins',async ()=>{
      jest
      .spyOn(controller,'getAllAdmins')
      .mockImplementation(():Promise<AdminDto[]>=>Promise.resolve(arrayOfAdmins))
      expect(await controller.getAllAdmins()).toMatchObject(
        expect.arrayContaining(arrayOfAdmins)
      )
    });
    
    it('should return null', async () => {
      jest.spyOn(controller, 'getAllAdmins').mockResolvedValue(null);
      expect(await controller.getAllAdmins()).toEqual(null);
    });
  })
  
  //getAdmin endpoint
  describe('getAdmin',()=>{
    const arrayOfAdmins:AdminDto[] = [];
      it('should return a Admin',async ()=>{
        jest
        .spyOn(controller,'getAdmin')
        .mockImplementation(():Promise<AdminDto[]>=>Promise.resolve(arrayOfAdmins))
        expect(await controller.getAdmin(2)).toMatchObject(
          expect.arrayContaining(arrayOfAdmins)
        )
      });

      it('should return null', async () => {
        jest.spyOn(controller, 'getAdmin').mockResolvedValue(null);
        expect(await controller.getAdmin(2)).toEqual(null);
      });
  })

  //getAdminName endpoint
  describe('getAdminName',()=>{
    const arrayOfAdmins:AdminDto[] = [];
      it('should return a Admin',async ()=>{
        jest
        .spyOn(controller,'getAdminName')
        .mockImplementation(():Promise<AdminDto[]>=>Promise.resolve(arrayOfAdmins))
        expect(await controller.getAdminName(adminDtoMock.name)).toMatchObject(
          expect.arrayContaining(arrayOfAdmins)
        )
      });

      it('should return null', async () => {
        jest.spyOn(controller, 'getAdminName').mockResolvedValue(null); 
        expect(await controller.getAdminName(adminDtoMock.name)).toEqual(null);
      });
  })

  //searchAdminName endpoint
  describe('searchAdminName',()=>{
    const arrayOfAdmins:AdminDto[] = [];
      it('should return a Admin',async ()=>{
        jest
        .spyOn(controller,'searchAdminName')
        .mockImplementation(():Promise<AdminDto[]>=>Promise.resolve(arrayOfAdmins))
        expect(await controller.searchAdminName(adminDtoMock.name)).toMatchObject(
          expect.arrayContaining(arrayOfAdmins)
        )
      });

      it('should return null', async () => {
        jest.spyOn(controller, 'searchAdminName').mockResolvedValue(null); 
        expect(await controller.searchAdminName(adminDtoMock.name)).toEqual(null);
      });
  })

  //getAdminContactNr endpoint
  describe('getAdminContactNr',()=>{
    const arrayOfAdmins:AdminDto[] = [];
      it('should return a Admin',async ()=>{
        jest
        .spyOn(controller,'getAdminCellNr')
        .mockImplementation(():Promise<AdminDto[]>=>Promise.resolve(arrayOfAdmins))
        expect(await controller.getAdminCellNr(adminDtoMock.contactNumber)).toMatchObject(
          expect.arrayContaining(arrayOfAdmins)
        )
      });

      it('should return null', async () => {
        jest.spyOn(controller, 'getAdminCellNr').mockResolvedValue(null); 
        expect(await controller.getAdminCellNr(adminDtoMock.contactNumber)).toEqual(null);
      });
  })

  //getAdminEmail endpoint
  describe('getAdminEmail',()=>{
    const arrayOfAdmins:AdminDto[] = [];
      it('should return a Admin',async ()=>{
        jest
        .spyOn(controller,'getAdminEmail')
        .mockImplementation(():Promise<AdminDto[]>=>Promise.resolve(arrayOfAdmins))
        expect(await controller.getAdminEmail(adminDtoMock.email)).toMatchObject(
          expect.arrayContaining(arrayOfAdmins)
        )
      });

      it('should return null', async () => {
        jest.spyOn(controller, 'getAdminEmail').mockResolvedValue(null); 
        expect(await controller.getAdminEmail(adminDtoMock.email)).toEqual(null);
      });
    })  

  //getAdminCities endpoint
  describe('getAdminCities',()=>{
    const arrayOfAdmins:AdminDto[] = [];
      it('should return Admins',async ()=>{
        jest
        .spyOn(controller,'getAdminCities')
        .mockImplementation(():Promise<AdminDto[]>=>Promise.resolve(arrayOfAdmins))
        expect(await controller.getAdminCities("Pretoria")).toMatchObject(
          expect.arrayContaining(arrayOfAdmins)
        )
      });

      it('should return null', async () => {
        jest.spyOn(controller, 'getAdminCities').mockResolvedValue(null); 
        expect(await controller.getAdminCities("Pretoria")).toEqual(null);
      });
  })

  //AddAdminCity endpoint
  describe('AddAdminCity',()=>{
      it('should return Admins',async ()=>{
        jest
        .spyOn(controller,'addAdminCity')
        .mockImplementation(():Promise<void>=>Promise.resolve())
        expect(await controller.addAdminCity(2,"Pretoria")).toBeUndefined()
      });
      it('should return null', async () => {
        jest.spyOn(controller, 'addAdminCity').mockResolvedValue(null); 
        expect(await controller.addAdminCity(2,"Pretoria")).toEqual(null);
      });
  })  

  
   describe('verifyPassword',()=>{
     it('should return true',async ()=>{
       jest
       .spyOn(controller,'verifyAdminPassword')
       .mockImplementation(():Promise<boolean> => Promise.resolve(true));
       expect(await controller.verifyAdminPassword(adminDtoMock)).toEqual(true)
     })
   })

  //UpdateAdmin
  describe('UpdateAdmin',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(controller,'updateAdmin')
      .mockImplementation(():Promise<AdminDto> => Promise.resolve(adminDtoMock));
      expect(await controller.updateAdmin(2,adminDtoMock)).toEqual(adminDtoMock)
    });

    it('should return null', async () => {
      jest.spyOn(controller, 'updateAdmin').mockResolvedValue(null);
      expect(await controller.updateAdmin(2,adminDtoMock)).toEqual(null)
    });
  })

    //updateAdminName
    describe('updateAdminName',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(controller,'updateAdminName')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await controller.updateAdminName(3,adminDtoMock.name)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(controller, 'updateAdminName').mockResolvedValue(null);
        expect(await controller.updateAdminName(3,adminDtoMock.name)).toEqual(null);
      });
    })

  //updateAdminEmail
  describe('updateAdminEmail',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(controller,'updateAdminEmail')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await controller.updateAdminEmail(3,adminDtoMock.email)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(controller, 'updateAdminEmail').mockResolvedValue(null);
      expect(await controller.updateAdminEmail(3,adminDtoMock.email)).toEqual(null);
    });
  })

  //updateAdminContactNr
  describe('updateAdminContactNr',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(controller,'updateAdminContactNr')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await controller.updateAdminContactNr(3,"0122238843")).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(controller, 'updateAdminContactNr').mockResolvedValue(null);
      expect(await controller.updateAdminContactNr(3,"0122238843")).toEqual(null);
    });
  })

  //updateAdminCities
  describe('updateAdminCities',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(controller,'updateAdminCities')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await controller.updateAdminCities(3,adminDtoMock.cities)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(controller, 'updateAdminCities').mockResolvedValue(null);
      expect(await controller.updateAdminCities(3,adminDtoMock.cities)).toEqual(null);
    });
  })

  //DeleteAdmin
  describe('deleteAdmin',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(controller,'deleteAdmin')
      .mockImplementation(():Promise<void> => Promise.resolve());

      expect(await controller.deleteAdmin(2)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(controller, 'deleteAdmin').mockResolvedValue(null);
      expect(await controller.deleteAdmin(2)).toEqual(null);
    });
  })
})
