import { ApiProfilesAdminRepositoryDataAccess } from './api-profiles-admin-repository-data-access';
import { Test, TestingModule } from '@nestjs/testing';
import { AdminDto } from '@grid-watch/api/profiles/admin/api/shared/api-profiles-admin-api-dto';

const adminDtoMock: jest.Mocked<AdminDto> = new AdminDto() as AdminDto;

  describe('ApiProfilesAdminRepositoryDataAccess', () => {
  let provider: ApiProfilesAdminRepositoryDataAccess;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiProfilesAdminRepositoryDataAccess],
    }).compile();

    adminDtoMock.name = "johndoe";
    adminDtoMock.email = "johndoe@gmail.com";
    adminDtoMock.contactNumber = "0829932828";
    adminDtoMock.cities = ["Pretoria,Johannesburg"];
    adminDtoMock.password = "1234Admin#";

    provider = module.get<ApiProfilesAdminRepositoryDataAccess>(
      ApiProfilesAdminRepositoryDataAccess
    );
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  //createAdmin endpoint
  describe('createAdmin',()=>{
    it('should return admin',async ()=>{
      jest
      .spyOn(provider,'createAdmin')
      .mockImplementation(():Promise<AdminDto> => Promise.resolve(adminDtoMock))
      expect(await provider.createAdmin(adminDtoMock)).toEqual(adminDtoMock)
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'createAdmin').mockResolvedValue(null);
      expect(await provider.createAdmin(adminDtoMock)).toEqual(null)
    });
  })

  //getAllAdmins endpoint
  describe('getAllAdmins',()=>{
    const arrayOfAdmins:AdminDto[] = [];
    it('should return all Admins',async ()=>{
      jest
      .spyOn(provider,'getAllAdmins')
      .mockImplementation(():Promise<AdminDto[]>=>Promise.resolve(arrayOfAdmins))
      expect(await provider.getAllAdmins()).toMatchObject(
        expect.arrayContaining(arrayOfAdmins)
      )
    });
    
    it('should return null', async () => {
      jest.spyOn(provider, 'getAllAdmins').mockResolvedValue(null);
      expect(await provider.getAllAdmins()).toEqual(null);
    });
  })
  
  //getAdmin endpoint
  describe('getAdmin',()=>{
    const arrayOfAdmins:AdminDto[] = [];
      it('should return a Admin',async ()=>{
        jest
        .spyOn(provider,'getAdmin')
        .mockImplementation(():Promise<AdminDto[]>=>Promise.resolve(arrayOfAdmins))
        expect(await provider.getAdmin(2)).toMatchObject(
          expect.arrayContaining(arrayOfAdmins)
        )
      });

      it('should return null', async () => {
        jest.spyOn(provider, 'getAdmin').mockResolvedValue(null);
        expect(await provider.getAdmin(2)).toEqual(null);
      });
  })

  //getAdminName endpoint
  describe('getAdminName',()=>{
    const arrayOfAdmins:AdminDto[] = [];
      it('should return a Admin',async ()=>{
        jest
        .spyOn(provider,'getAdminName')
        .mockImplementation(():Promise<AdminDto[]>=>Promise.resolve(arrayOfAdmins))
        expect(await provider.getAdminName(adminDtoMock.name)).toMatchObject(
          expect.arrayContaining(arrayOfAdmins)
        )
      });

      it('should return null', async () => {
        jest.spyOn(provider, 'getAdminName').mockResolvedValue(null); 
        expect(await provider.getAdminName(adminDtoMock.name)).toEqual(null);
      });
  })

  //searchAdminName endpoint
  describe('searchAdminName',()=>{
    const arrayOfAdmins:AdminDto[] = [];
      it('should return a Admin',async ()=>{
        jest
        .spyOn(provider,'searchAdminName')
        .mockImplementation(():Promise<AdminDto[]>=>Promise.resolve(arrayOfAdmins))
        expect(await provider.searchAdminName(adminDtoMock.name)).toMatchObject(
          expect.arrayContaining(arrayOfAdmins)
        )
      });

      it('should return null', async () => {
        jest.spyOn(provider, 'searchAdminName').mockResolvedValue(null); 
        expect(await provider.searchAdminName(adminDtoMock.name)).toEqual(null);
      });
  })

  //getAdminContactNr endpoint
  describe('getAdminContactNr',()=>{
    const arrayOfAdmins:AdminDto[] = [];
      it('should return a Admin',async ()=>{
        jest
        .spyOn(provider,'getAdminContactNr')
        .mockImplementation(():Promise<AdminDto[]>=>Promise.resolve(arrayOfAdmins))
        expect(await provider.getAdminContactNr(adminDtoMock.contactNumber)).toMatchObject(
          expect.arrayContaining(arrayOfAdmins)
        )
      });

      it('should return null', async () => {
        jest.spyOn(provider, 'getAdminContactNr').mockResolvedValue(null); 
        expect(await provider.getAdminContactNr(adminDtoMock.contactNumber)).toEqual(null);
      });
  })

  //getAdminEmail endpoint
  describe('getAdminEmail',()=>{
    const arrayOfAdmins:AdminDto[] = [];
      it('should return a Admin',async ()=>{
        jest
        .spyOn(provider,'getAdminEmail')
        .mockImplementation(():Promise<AdminDto[]>=>Promise.resolve(arrayOfAdmins))
        expect(await provider.getAdminEmail(adminDtoMock.email)).toMatchObject(
          expect.arrayContaining(arrayOfAdmins)
        )
      });

      it('should return null', async () => {
        jest.spyOn(provider, 'getAdminEmail').mockResolvedValue(null); 
        expect(await provider.getAdminEmail(adminDtoMock.email)).toEqual(null);
      });
    })  

  //getAdminCities endpoint
  describe('getAdminCities',()=>{
    const arrayOfAdmins:AdminDto[] = [];
      it('should return Admins',async ()=>{
        jest
        .spyOn(provider,'getAdminCities')
        .mockImplementation(():Promise<AdminDto[]>=>Promise.resolve(arrayOfAdmins))
        expect(await provider.getAdminCities("Pretoria")).toMatchObject(
          expect.arrayContaining(arrayOfAdmins)
        )
      });

      it('should return null', async () => {
        jest.spyOn(provider, 'getAdminCities').mockResolvedValue(null); 
        expect(await provider.getAdminCities("Pretoria")).toEqual(null);
      });
  })

  //AddAdminCity endpoint
  describe('AddAdminCity',()=>{
      it('should return Admins',async ()=>{
        jest
        .spyOn(provider,'AddAdminCity')
        .mockImplementation(():Promise<void>=>Promise.resolve())
        expect(await provider.AddAdminCity(2,"Pretoria")).toBeUndefined()
      });
      it('should return null', async () => {
        jest.spyOn(provider, 'AddAdminCity').mockResolvedValue(null); 
        expect(await provider.AddAdminCity(2,"Pretoria")).toEqual(null);
      });
  })  

  
   describe('verifyPassword',()=>{
     it('should return true',async ()=>{
       jest
       .spyOn(provider,'verifyAdminPassword')
       .mockImplementation(():Promise<boolean> => Promise.resolve(true));
       expect(await provider.verifyAdminPassword("sparky@gmail.com", "123Anru")).toEqual(true)
     })
   })

  //UpdateAdmin
  describe('UpdateAdmin',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateAdmin')
      .mockImplementation(():Promise<AdminDto> => Promise.resolve(adminDtoMock));
      expect(await provider.updateAdmin(2,adminDtoMock)).toEqual(adminDtoMock)
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateAdmin').mockResolvedValue(null);
      expect(await provider.updateAdmin(2,adminDtoMock)).toEqual(null)
    });
  })

    //updateAdminName
    describe('updateAdminName',()=>{
      it('should return void',async ()=>{
        jest
        .spyOn(provider,'updateAdminName')
        .mockImplementation(():Promise<void> => Promise.resolve());
        expect(await provider.updateAdminName(3,adminDtoMock.name)).toBeUndefined()
      });
  
      it('should return null', async () => {
        jest.spyOn(provider, 'updateAdminName').mockResolvedValue(null);
        expect(await provider.updateAdminName(3,adminDtoMock.name)).toEqual(null);
      });
    })

  //updateAdminEmail
  describe('updateAdminEmail',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateAdminEmail')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateAdminEmail(3,adminDtoMock.email)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateAdminEmail').mockResolvedValue(null);
      expect(await provider.updateAdminEmail(3,adminDtoMock.email)).toEqual(null);
    });
  })

  //updateAdminContactNr
  describe('updateAdminContactNr',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateAdminContactNr')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateAdminContactNr(3,"0122238843")).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateAdminContactNr').mockResolvedValue(null);
      expect(await provider.updateAdminContactNr(3,"0122238843")).toEqual(null);
    });
  })

  //updateAdminCities
  describe('updateAdminCities',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'updateAdminCities')
      .mockImplementation(():Promise<void> => Promise.resolve());
      expect(await provider.updateAdminCities(3,adminDtoMock.cities)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'updateAdminCities').mockResolvedValue(null);
      expect(await provider.updateAdminCities(3,adminDtoMock.cities)).toEqual(null);
    });
  })

  //DeleteAdmin
  describe('deleteAdmin',()=>{
    it('should return void',async ()=>{
      jest
      .spyOn(provider,'deleteAdmin')
      .mockImplementation(():Promise<void> => Promise.resolve());

      expect(await provider.deleteAdmin(2)).toBeUndefined()
    });

    it('should return null', async () => {
      jest.spyOn(provider, 'deleteAdmin').mockResolvedValue(null);
      expect(await provider.deleteAdmin(2)).toEqual(null);
    });
  })

});

