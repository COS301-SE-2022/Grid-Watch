import {PrismaClient} from '@prisma/client';
import { Injectable } from '@nestjs/common';
import {AdminDto} from '@grid-watch/api/profiles/admin/api/shared/api-profiles-admin-api-dto'

//authorizedofficials = admin
@Injectable()

export class ApiProfilesAdminRepositoryDataAccess {  
    
    prisma = new PrismaClient();

    bcrypt = require('bcrypt');

    async createAdmin(adminDto:AdminDto){

        if(!adminDto.name)
            throw Error("name_falsy");
        if(!adminDto.email)
            throw Error("name_falsy");
        if(!adminDto.contactNr)
            throw Error("name_falsy");
        if(!adminDto.cities)
            throw Error("email_falsy");
        if(!adminDto.password)
            throw Error("password_falsy");

        const salt = await this.bcrypt.genSalt(6);
        const hash = await this.bcrypt.hash(adminDto.password, salt)

        const admin = await this.prisma.authorizedOfficials.create({
            data:
            {
                name :                  adminDto.name,
                email :                 adminDto.email,
                contactNumber :         adminDto.contactNr,
                cities :                adminDto.cities,
                password :              hash,
                passwordSalt :          salt,

            },
        });

    return admin
    }

    async getAllAdmins(){
        return await this.prisma.authorizedOfficials.findMany()
    }

    async getAdmin(adminId: number){

        const admin = await this.prisma.authorizedOfficials.findMany({

            where:{
                id : adminId,
            },

        })

        if (admin) {
            return admin;
        }
        else{
            return "Admin with ID: " + adminId + " not found!";
        }
        
    }

    async getAdminName(adminName: string){

        const admin = await this.prisma.authorizedOfficials.findMany({

            where:{
                name : adminName,
            },

        })

        if (admin) {
            return admin;
        }
        else{
            return "Admin name: " + adminName + " not found!";
        }
        
    }

    async getAdminCellNr(adminCellNr: string){

        const admin = await this.prisma.authorizedOfficials.findMany({

            where:{
                contactNumber : adminCellNr,
            },

        })

        if (admin) {
            return admin;
        }
        else{
            return "Admin contact number: " + adminCellNr + " not found!";
        }
        
    }

    async getAdminEmail(adminEmail: string){

        const admin = await this.prisma.authorizedOfficials.findMany({

            where:{
                email : adminEmail,
            },

        })

        if (admin) {
            return admin;
        }
        else{
            return "Admin email: " + adminEmail + " not found!";
        }
        
    }

    async getAdminCities(adminCity: string){

        const admin = await this.prisma.authorizedOfficials.findMany({
            //string may contain more than one city example "Pretoria, Centurion"
            where:{
                cities:{
                    hasEvery: [adminCity],
                },
            },

        })

        if (admin) {
            return admin;
        }
        else{
            return "Admin representing city " + adminCity + " not found!";
        }

    }

    async AddAdminCity(adminId : number, city : string){

        await this.prisma.authorizedOfficials.update({
            where: 
            { 
                id: adminId 
            },
            data: 
            {
                cities: 
                {
                    push: city,
                },
            },
        });
    }

    async verifyAdminPassword(email:string, Password:string)
    {
        const admin = await this.prisma.authorizedOfficials.findFirst({

            where:
            {
                email : email,
            },
            select:
            {
                password:true,
                passwordSalt:true
            },
        });

        const hash = await this.bcrypt.hash(Password, admin.passwordSalt); 

        return admin.password==hash;

    }

    async updateAdminPassword(adminId: number, newPassword: string){

        if(!newPassword)
        throw Error("password_falsy");

        const salt = await this.bcrypt.genSalt(6);
        const hash = await this.bcrypt.hash(newPassword, salt)

            await this.prisma.authorizedOfficials.update({
                where:{
                    id : adminId,
                },
                data:
                {
                    passwordSalt:   salt,
                    password:       hash,
                },
            });
    }
    
    async updateAdmin(adminId:number,adminDto:AdminDto){
        if(!adminDto.name)
            throw Error("name_falsy");
        if(!adminDto.email)
            throw Error("email_falsy");
        if(!adminDto.password)
            throw Error("password_falsy");

        const salt = await this.bcrypt.genSalt(6);
        const hash = await this.bcrypt.hash(adminDto.password, salt)

        const admin = await this.prisma.authorizedOfficials.update({
            where:
            {
                id : adminId,
            },
            data:
            {
                name :                  adminDto.name,
                email :                 adminDto.email,
                password :              hash,
                passwordSalt :          salt,

            },
        });
        return admin
    }

    async updateAdminName(adminId:number,adminName:string){

        await this.prisma.authorizedOfficials.update({
            where:{
                id : adminId,
            },
            data:
            {
                name : adminName,
            },
        });
    }

    
    async updateAdminEmail(adminId:number,adminEmail:string){

        await this.prisma.authorizedOfficials.update({
            where:{
                id : adminId,
            },
            data:
            {
                name : adminEmail,
            },
        });
    }

    async updateAdminContactNr(adminId:number,adminCellNr:string){

        await this.prisma.authorizedOfficials.update({
            where:{
                id : adminId,
            },
            data:
            {
                contactNumber : adminCellNr,
            },
        });
    }

    async updateAdminCities(adminId:number,adminCities:string[]){

        await this.prisma.authorizedOfficials.update({
            where:{
                id : adminId,
            },
            data:
            {
                cities : adminCities,
            },
        });
    }

    async deleteAdmin(adminId: number){

        await this.prisma.authorizedOfficials.delete({
            where:
            {
                id : adminId,
            },
        })
    }}
