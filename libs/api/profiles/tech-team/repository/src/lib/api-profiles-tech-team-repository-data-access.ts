import { Injectable } from '@nestjs/common';
import {PrismaClient} from '@prisma/client';

@Injectable()

export class ApiProfilesTechTeamRepositoryDataAccess {

prisma = new PrismaClient();

    async createTechTeam(Name: string, Email: string,Specialisation: string, ContactNr: string ){

            await this.prisma.techTeam.create({
                data:
                {
                    name :                  Name,
                    email :                 Email,
                    specialisation :        Specialisation,
                    contact_number :        ContactNr,
                },
            });
    }

    async DeleteTechTeam(TechTeamId: number){

        await this.prisma.techTeam.delete({
            where:
            {
                id : TechTeamId,
            },
        })
    }

    async UpdateTechTeam(TechTeamId: number, Name: string, Email: string,Specialisation: string, ContactNr: string){

        await this.prisma.techTeam.update({
            where:{
                id : TechTeamId,
            },
            data:
            {
                name :                  Name,
                email :                 Email,
                specialisation :        Specialisation,
                contact_number :        ContactNr,
            },
        });
    }
    
    async UpdateTechTeamName(TechTeamId: number, Name: string){

        await this.prisma.techTeam.update({
            where:{
                id: TechTeamId,
            },
            data:
            {
                name : Name,    
            },
        });

    }

    async UpdateTechTeamEmail(TechTeamId: number, Email: string){

        await this.prisma.techTeam.update({
            where:{
                id: TechTeamId,
            },
            data:
            {
                name : Email,    
            },
        });

    }

    async UpdateTechTeamSpecialisation(TechTeamId: number, Specialisation: string){

        await this.prisma.techTeam.update({
            where:{
                id: TechTeamId,
            },
            data:
            {
                specialisation : Specialisation,    
            },
        });

    }

    async UpdateTechTeamContactNr(TechTeamId: number, Contact: string){

        await this.prisma.techTeam.update({
            where:{
                id: TechTeamId,
            },
            data:
            {
                contact_number : Contact,    
            },
        });

    }

    async UpdateTechTeamNrJobsCompleted(TechTeamId: number, NrJobsCompleted: number){

        await this.prisma.techTeam.update({
            where:{
                id: TechTeamId,
            },
            data:
            {
                nr_jobs_completed : NrJobsCompleted,    
            },
        });

    }

    async IncTechTeamNrJobsCompleted(TechTeamId: number){

        await this.prisma.techTeam.update({
            where:{
                id: TechTeamId,
            },
            data:
            {
                nr_jobs_completed:{
                    increment: 1,
                } 
            },
        });

    }

    async UpdateTechTeamRatingJobs(TechTeamId: number, RatingJobs: number){

        await this.prisma.techTeam.update({
            where:{
                id: TechTeamId,
            },
            data:
            {
                rating_of_jobs : RatingJobs,    
            },
        });

    }
}

