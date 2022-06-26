import { HashLocationStrategy } from '@angular/common';
import { Injectable } from '@nestjs/common';
import {PrismaClient} from '@prisma/client';
import { TechTeamDto } from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';
@Injectable()

export class ApiProfilesTechTeamRepositoryDataAccess {

prisma = new PrismaClient();

    bcrypt = require('bcrypt');

    async createTechTeam(techTeamDto:TechTeamDto){

        if(!techTeamDto.name)
            throw Error("name_falsy");
        if(!techTeamDto.email)
            throw Error("email_falsy");
        if(!techTeamDto.specialisation)
            throw Error("specialisation_falsy");
        if(!techTeamDto.contactNumber)
            throw Error("contactnr_falsy");
        if(!techTeamDto.password)
            throw Error("password_falsy");

        const salt = await this.bcrypt.genSalt(6);
        const hash = await this.bcrypt.hash(techTeamDto.password, salt)

        const techTeam = await this.prisma.techTeam.create({
            data:
            {
                name :                  techTeamDto.name,
                email :                 techTeamDto.email,
                specialisation :        techTeamDto.specialisation,
                contactNumber :         techTeamDto.contactNumber,
                ratingOfJobs :          0.0,
                nrJobsCompleted :       0,
                password :              hash,
                passwordSalt:           salt,
                created :               new Date()

            },
        });

        return techTeam

    }

    async verifyPassword(email:string, Password:string)
    {
        const techTeam = await this.prisma.techTeam.findFirst({
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

        const hash = await this.bcrypt.hash(Password, techTeam.passwordSalt); 

        return techTeam.password==hash;

    }

    async getTechTeams(){
        return await this.prisma.techTeam.findMany()
    }

    async getTechTeamId(ID: number){

        const techTeam = await this.prisma.techTeam.findMany({

            where:{
                id : ID,
            },

        })

        if (techTeam) {
            return techTeam;
        }
        else{
            return "Techteam id = " + ID + " not found!";
        }
        
    }

    async getTechTeamName(name: string){

        const techTeam = await this.prisma.techTeam.findMany({

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

    
    async getTechTeamSpecialisation(specs: string){

        const techTeam = await this.prisma.techTeam.findMany({

            where:{
                specialisation: {
                   // search: string
                },
            },

        })

        if (techTeam) {
            return techTeam;
        }
        else{
            return "Techteam with specialisation " + specs + " not found!";
        }

    }

    async updateTechTeam(techTeamId: number, techTeamDto:TechTeamDto){

        await this.prisma.techTeam.update({
            where:{
                id : techTeamId,
            },
            data:
            {
                name :                  techTeamDto.name,
                email :                 techTeamDto.email,
                specialisation :        techTeamDto.specialisation,
                contactNumber :         techTeamDto.contactNumber,
            },
        });
    }
    
    async updateTechTeamName(techTeamId: number, name: string){

        await this.prisma.techTeam.update({
            where:{
                id: techTeamId,
            },
            data:
            {
                name : name,    
            },
        });

    }

    async updateTechTeamEmail(techTeamId: number, email: string){

        await this.prisma.techTeam.update({
            where:{
                id: techTeamId,
            },
            data:
            {
                name : email,    
            },
        });

    }

    async updateTechTeamSpec(techTeamId: number, specialisation: string){

        await this.prisma.techTeam.update({
            where:{
                id: techTeamId,
            },
            data:
            {
                specialisation : specialisation,    
            },
        });

    }

    async updateTechTeamContactNr(techTeamId: number, Contact: string){

        await this.prisma.techTeam.update({
            where:{
                id: techTeamId,
            },
            data:
            {
                contactNumber : Contact,    
            },
        });

    }

    async updateTechTeamNrJobsCompleted(techTeamId: number, NrJobsCompleted: number){

        await this.prisma.techTeam.update({
            where:{
                id: techTeamId,
            },
            data:
            {
                nrJobsCompleted : NrJobsCompleted,    
            },
        });

    }

    async incTechTeamNrJobsCompleted(techTeamId: number){

        await this.prisma.techTeam.update({
            where:{
                id: techTeamId,
            },
            data:
            {
                nrJobsCompleted:{
                    increment: 1,
                } 
            },
        });

    }

    async updateTechTeamRatingJobs(techTeamId: number, RatingJobs: number){

        await this.prisma.techTeam.update({
            where:{
                id: techTeamId,
            },
            data:
            {
                ratingOfJobs : RatingJobs,    
            },
        });

    }

    async deleteTechTeam(techTeamId: number){

        await this.prisma.techTeam.delete({
            where:
            {
                id : techTeamId,
            },
        })
    }

    async createTechTeamTicket(techTeamId: number, ticketID : number ){
        await this.prisma.techTeamTicket.create({
            data:
            {
                techTeamId :   techTeamId,
                ticketId :     ticketID,
            },
        });
    }

    async getTechTeamTickets(techTeamID: number){

        const techTeam = await this.prisma.techTeamTicket.findMany({

            where:{
                techTeamId: techTeamID
            },

        })

        if (techTeam) {
            return techTeam;
        }
        else{
            return "Techteam " + techTeamID + " has no tickets!";
        }
    }

    async getTechTeamFromTicket(ticketID: number){

        const techTeam = await this.prisma.techTeamTicket.findMany({

            where:{
                id : ticketID
            },

        })

        if (techTeam) {
            return techTeam;
        }
        else{
            return " No Techteam with Ticket ID " + ticketID + "!";
        }
    }
    
}

