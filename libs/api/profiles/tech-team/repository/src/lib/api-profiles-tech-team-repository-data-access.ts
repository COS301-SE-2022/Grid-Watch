import { HashLocationStrategy } from '@angular/common';
import { Injectable } from '@nestjs/common';
import {PrismaClient} from '@prisma/client';
@Injectable()

export class ApiProfilesTechTeamRepositoryDataAccess {

prisma = new PrismaClient();

    bcrypt = require('bcrypt');

    async createTechTeam(Name: string, Email: string, Specialisation: string, ContactNr: string, Password : string){

        if(!Name)
            throw Error("name_falsy");
        if(!Email)
            throw Error("email_falsy");
        if(!Specialisation)
            throw Error("specialisation_falsy");
        if(!ContactNr)
            throw Error("contactnr_falsy");
        if(!Password)
            throw Error("password_falsy");

        const salt = await this.bcrypt.genSalt(6);
        const hash = await this.bcrypt.hash(Password, salt)

        const techTeam = await this.prisma.techTeam.create({
            data:
            {
                name :                  Name,
                email :                 Email,
                specialisation :        Specialisation,
                contact_number :        ContactNr,
                rating_of_jobs :        0.0,
                nr_jobs_completed :     0,
                password :              hash,
                passwordSalt:           salt,
                created :               new Date()

            },
        });

        return techTeam

    }

    async assignTicket(ticketID : number, techTeamID : number)
    {
        // const ticket = await this.prisma.ticket.findUnique({
        //     where:
        //     {
        //         ticket_id : ticketID,
        //     },
        // })

        await this.prisma.ticket.update({
            where:
            {
                ticket_id : ticketID,
            },
            data:{
                assigned_TechTeam : techTeamID,
            },
        })
    }

    async getAllAssignedTickets( techTeamID : number)
    {
        await this.prisma.techTeam.findUnique({
            where:
            {
                id : techTeamID,
            },
            include:{
                assigned_tickets: true
            },
        })
    }

    async verifyPassword(Email:string, password:string)
    {
        const techTeam = await this.prisma.techTeam.findFirst({
            where:
            {
                email : Email,
            },
            select:
            {
                password:true,
                passwordSalt:true
            },
        });

        const hash = await this.bcrypt.hash(password, techTeam.passwordSalt); 

        return techTeam.password==hash;

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

    async getTechTeamName(Name: string){

        const techteam = await this.prisma.techTeam.findMany({

            where:{
                name : Name,
            },

        })

        if (techteam) {
            return techteam;
        }
        else{
            return "Techteam " + Name + " not found!";
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

    async DeleteTechTeam(TechTeamId: number){

        await this.prisma.techTeam.delete({
            where:
            {
                id : TechTeamId,
            },
        })
    }

    async createTechTeamTicket(TechTeamID: number, TicketID : number ){
        await this.prisma.techTeamTicket.create({
            data:
            {
                techteam_ID :   TechTeamID,
                ticket_ID :     TicketID,
            },
        });
    }

    async getTechTeamTickets(TechTeamID: number){

        const techteam = await this.prisma.techTeamTicket.findMany({

            where:{
                techteam_ID: TechTeamID
            },

        })

        if (techteam) {
            return techteam;
        }
        else{
            return "Techteam " + TechTeamID + " has no tickets!";
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

