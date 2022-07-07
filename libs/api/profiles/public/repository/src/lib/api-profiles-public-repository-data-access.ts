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
            created :               new Date()

        },
    });

    return user
    }

    async getUserName(userId: number){

        const user = await this.prisma.techTeam.findMany({

            where:{
                name : name,
            },

        })

        if (techTeam) {
            return techTeam;
        }
        else{
            return "Techteam " + name + " not found!";
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
}