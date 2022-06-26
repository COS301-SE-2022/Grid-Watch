import { Injectable } from '@nestjs/common';
import {PrismaClient} from '@prisma/client';
@Injectable()

export class ApiProfilesTechTeamRepositoryDataAccess {

prisma = new PrismaClient();

    async createTechTeam(name: string, email: string,specialisation: string, contactNr: string ){

            await this.prisma.techTeam.create({
                data:
                {
                    name :                  name,
                    email :                 email,
                    specialisation :        specialisation,
                    contactNumber :         contactNr,
                    ratingOfJobs :          0.0,
                    nrJobsCompleted :     0
                },
            });
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

    
    async getTechTeamspecialisation(specs: string){

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

    async updateTechTeam(techTeamId: number, name: string, email: string, specialisation: string, contactNr: string){

        await this.prisma.techTeam.update({
            where:{
                id : techTeamId,
            },
            data:
            {
                name :                  name,
                email :                 email,
                specialisation :        specialisation,
                contactNumber :        contactNr,
            },
        });
    }
    
    async updateTechTeamName(TechTeamId: number, name: string){

        await this.prisma.techTeam.update({
            where:{
                id: TechTeamId,
            },
            data:
            {
                name : name,    
            },
        });

    }

    async updateTechTeamEmail(TechTeamId: number, email: string){

        await this.prisma.techTeam.update({
            where:{
                id: TechTeamId,
            },
            data:
            {
                name : email,    
            },
        });

    }

    async updateTechTeamSpecialisation(TechTeamId: number, specialisation: string){

        await this.prisma.techTeam.update({
            where:{
                id: TechTeamId,
            },
            data:
            {
                specialisation : specialisation,    
            },
        });

    }

    async updateTechTeamContactNr(TechTeamId: number, Contact: string){

        await this.prisma.techTeam.update({
            where:{
                id: TechTeamId,
            },
            data:
            {
                contactNumber : Contact,    
            },
        });

    }

    async updateTechTeamNrJobsCompleted(techTeamId: number, nrJobsCompleted: number){

        await this.prisma.techTeam.update({
            where:{
                id: techTeamId,
            },
            data:
            {
                nrJobsCompleted : nrJobsCompleted,    
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

    async updateTechTeamRatingJobs(techTeamID: number, ratingJobs: number){

        await this.prisma.techTeam.update({
            where:{
                id: techTeamID,
            },
            data:
            {
                ratingOfJobs : ratingJobs,    
            },
        });

    }

    async deleteTechTeam(techTeamID: number){

        await this.prisma.techTeam.delete({
            where:
            {
                id : techTeamID,
            },
        })
    }

    async createTechTeamTicket(techTeamID: number, TicketID : number ){
        await this.prisma.techTeamTicket.create({
            data:
            {
                techTeamId :   techTeamID,
                ticketId :     TicketID,
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

