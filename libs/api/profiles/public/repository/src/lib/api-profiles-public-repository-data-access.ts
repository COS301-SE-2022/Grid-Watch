import {PrismaClient} from '@prisma/client';
import { Injectable } from '@nestjs/common';
@Injectable()

export class ApiProfilesPublicRepositoryDataAccess{
    prisma = new PrismaClient();

    bcrypt = require('bcrypt');

    async createUser(userDto:UserDto){

        if(!userDto.name)
            throw Error("name_falsy");
        if(!userDto.email)
            throw Error("email_falsy");
        if(!userDto.password)
            throw Error("password_falsy");

        const salt = await this.bcrypt.genSalt(6);
        const hash = await this.bcrypt.hash(userDto.password, salt)

        const user = await this.prisma.user.create({
            data:
            {
                name :                  userDto.name,
                email :                 userDto.email,
                password :              hash,
                passwordSalt:           salt,

            },
        });

    return user
    }

    async getUser(userId: number){

        const user = await this.prisma.user.findMany({

            where:{
                id : userId,
            },

        })

        if (user) {
            return user;
        }
        else{
            return "User with ID: " + userId + " not found!";
        }
        
    }

    async getUserName(userName: string){

        const user = await this.prisma.user.findMany({

            where:{
                name : userName,
            },

        })

        if (user) {
            return user;
        }
        else{
            return "Username: " + userName + " not found!";
        }
        
    }

    async getUserEmail(userEmail: string){

        const user = await this.prisma.user.findMany({

            where:{
                email : userEmail,
            },

        })

        if (user) {
            return user;
        }
        else{
            return "User email: " + userEmail + " not found!";
        }
        
    }

    async verifyPassword(email:string, Password:string)
    {
        const user = await this.prisma.user.findFirst({

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

        const hash = await this.bcrypt.hash(Password, user.passwordSalt); 

        return user.password==hash;

    }

    async updatePassword(techTeamId: number, newPassword: string){

        if(!newPassword)
        throw Error("password_falsy");

        const salt = await this.bcrypt.genSalt(6);
        const hash = await this.bcrypt.hash(newPassword, salt)

            await this.prisma.techTeam.update({
                where:{
                    id : techTeamId,
                },
                data:
                {
                    passwordSalt:   salt,
                    password:       hash,
                },
            });
    }
    
    async updateUser(userId:number,userDto:UserDto){
        if(!userDto.name)
            throw Error("name_falsy");
        if(!userDto.email)
            throw Error("email_falsy");
        if(!userDto.password)
            throw Error("password_falsy");

        const salt = await this.bcrypt.genSalt(6);
        const hash = await this.bcrypt.hash(userDto.password, salt)

        const user = await this.prisma.user.update({
            where:
            {
                id : userId,
            },
            data:
            {
                name :                  userDto.name,
                email :                 userDto.email,
                password :              hash,
                passwordSalt:           salt,

            },
        });
        return user
    }


    async updateEmail(userId:number,userEmail:string){

        await this.prisma.user.update({
            where:{
                id : userId,
            },
            data:
            {
                name : userEmail,
            },
        });
    }

    async updateName(userId:number,userName:string){

        await this.prisma.user.update({
            where:{
                id : userId,
            },
            data:
            {
                name : userName,
            },
        });
    }

    async deleteUser(techTeamId: number){

        await this.prisma.techTeam.delete({
            where:
            {
                id : techTeamId,
            },
        })
    }
}
