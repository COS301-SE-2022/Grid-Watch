import { Injectable } from '@nestjs/common';
import {PrismaClient} from '@prisma/client';
@Injectable()

export class ApiProfilesTechTeamRepositoryDataAccess {

prisma = new PrismaClient();

    async createTechTeam(techName: string, techEmail: string, spec: string, contactNr: string ){

            await this.prisma.techTeam.create({
                data:
                {
                    name :                  techName,
                    email :                 techEmail,
                    specialisation :        spec,
                    contactNumber :        contactNr,
                    ratingOfJobs :        0.0,
                    nrJobsCompleted :     0
                },
            });
    }

    async getTechTeams(){
        return await this.prisma.techTeam.findMany()
    }

    async getTechTeamId(ID: number){

        const techteam = await this.prisma.techTeam.findMany({

            where:{
                id : ID,
            },

        })

        if (techteam) {
            return techteam;
        }
        else{
            return "Techteam id = " + ID + " not found!";
        }
        
    }

    async getTechTeamname(name: string){

        const techteam = await this.prisma.techTeam.findMany({

            where:{
                name : name,
            },

        })

        if (techteam) {
            return techteam;
        }
        else{
            return "Techteam " + name + " not found!";
        }
        
    }

    
    async getTechTeamSpecialisation(specs: string){

        const techteam = await this.prisma.techTeam.findMany({

            where:{
                specialisation: {
                   // search: string
                },
            },

        })

        if (techteam) {
            return techteam;
        }
        else{
            return "Techteam with specialisation " + specs + " not found!";
        }

    }

    async updateTechTeam(techTeamId: number, name: string, email: string,specialisation: string, contactNr: string){

        await this.prisma.techTeam.update({
            where:{
                id : techTeamId,
            },
            data:
            {
                name :                  name,
                email :                 email,
                specialisation :        specialisation,
                contactNumber :         contactNr,
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

    async updateTechTeamSpecialisation(techTeamId: number, Specialisation: string){

        await this.prisma.techTeam.update({
            where:{
                id: techTeamId,
            },
            data:
            {
                specialisation : Specialisation,    
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
                techteamId :   techTeamId,
                ticketId :     ticketID,
            },
        });
    }

    async getTechTeamTickets(techTeamId: number){

        const techteam = await this.prisma.techTeamTicket.findMany({

            where:{
                techteamId: techTeamId
            },

        })

        if (techteam) {
            return techteam;
        }
        else{
            return "Techteam " + techTeamId + " has no tickets!";
        }
    }

    async getTechTeamFromTicket(TicketID: number){

        const techteam = await this.prisma.techTeamTicket.findMany({

            where:{
                id : TicketID
            },

        })

        if (techteam) {
            return techteam;
        }
        else{
            return " No Techteam with Ticket ID " + TicketID + "!";
        }
    }
    
}

