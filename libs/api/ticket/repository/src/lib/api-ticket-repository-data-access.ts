import { Injectable } from '@nestjs/common';
import {PrismaClient} from '@prisma/client';

@Injectable()
export class ApiTicketRepositoryDataAccess {
    prisma = new PrismaClient();

    async createTicket(Status: string, createDate: Date, closeDate: Date, Type: string, City: string, Location: string, Cost: number, Description: string, RepairTime: number, Upvotes: number){

            await this.prisma.ticket.create({
                data:
                {
                    ticket_status :         Status,    
                    ticket_create_date :    createDate, 
                    ticket_close_date :     closeDate,
                    ticket_type :           Type,    
                    ticket_city :           City,   
                    ticket_location :       Location,   
                    ticket_cost :           Cost,
                    ticket_description :    Description,
                    ticket_repair_time :    RepairTime, 
                    ticket_upvotes :        Upvotes,
                },
            });
           // return "The ticket with id: " + ticket_id + " has been created."
    }

    async UpdateTicket(TicketId: number, Status: string, createDate: Date, closeDate: Date, Type: string, City: string, Location: string, Cost: number, Description: string, RepairTime: number, Upvotes: number){

        await this.prisma.ticket.update({
            where:{
                ticket_id : TicketId,
            },
            data:
            {
                ticket_status :         Status,    
                ticket_create_date :    createDate, 
                ticket_close_date :     closeDate,
                ticket_type :           Type,    
                ticket_city :           City,   
                ticket_location :       Location,   
                ticket_cost :           Cost,
                ticket_description :    Description,
                ticket_repair_time :    RepairTime, 
                ticket_upvotes :        Upvotes,
            },
        });
       // return "The ticket with id: " + ticket_id + " has been created."
}
    
    async UpdateStatus(TicketId: number, TicketStatus: string){

        await this.prisma.ticket.update({
            where:{
                ticket_id: TicketId,
            },
            data:
            {
                ticket_status : TicketStatus,    
            },
        });
       // return "The ticket with id: " + TicketId + "'s status changed from " + prev_ticket_status + " to " + TicketStatus + "."
    }

    async UpdateCreateDate(TicketId: number, CreateDate: Date){

        await this.prisma.ticket.update({
            where:{
                ticket_id: TicketId,
            },
            data:
            {
                ticket_create_date : CreateDate,    
            },
        });
       // return "The ticket with id: " + TicketId + "'s status changed from " + prev_ticket_status + " to " + TicketStatus + "."
    }

    async UpdateCloseDate(TicketId: number, CloseDate: Date){

        await this.prisma.ticket.update({
            where:{
                ticket_id: TicketId,
            },
            data:
            {
                ticket_close_date : CloseDate,     
            },
        });
       // return "The ticket with id: " + TicketId + "'s status changed from " + prev_ticket_status + " to " + TicketStatus + "."
    }

    async UpdateType(TicketId: number, Type: string){

        await this.prisma.ticket.update({
            where:{
                ticket_id: TicketId,
            },
            data:
            {
                ticket_type : Type,    
            },
        });
       // return "The ticket with id: " + TicketId + "'s status changed from " + prev_ticket_status + " to " + TicketStatus + "."
    }

    async UpdateLocation(TicketId: number, Location: string){

        await this.prisma.ticket.update({
            where:{
                ticket_id: TicketId,
            },
            data:
            {
                ticket_location : Location,  
            },
        });
       // return "The ticket with id: " + TicketId + "'s status changed from " + prev_ticket_status + " to " + TicketStatus + "."
    }

    async UpdateCost(TicketId: number, Cost: number){

        await this.prisma.ticket.update({
            where:{
                ticket_id: TicketId,
            },
            data:
            {
                ticket_cost : Cost,
            },
        });
       // return "The ticket with id: " + TicketId + "'s status changed from " + prev_ticket_status + " to " + TicketStatus + "."
    }

    async UpdateDescription(TicketId: number, Description: string){

        await this.prisma.ticket.update({
            where:{
                ticket_id: TicketId,
            },
            data:
            {
                ticket_description : Description, 
            },
        });
       // return "The ticket with id: " + TicketId + "'s status changed from " + prev_ticket_status + " to " + TicketStatus + "."
    }

    async UpdateRepairTime(TicketId: number, RepairTime: number){

        await this.prisma.ticket.update({
            where:{
                ticket_id: TicketId,
            },
            data:
            {
                ticket_repair_time : RepairTime,   
            },
        });
       // return "The ticket with id: " + TicketId + "'s status changed from " + prev_ticket_status + " to " + TicketStatus + "."
    }

    async UpdateUpvotes(TicketId: number, Upvotes: number){

        await this.prisma.ticket.update({
            where:{
                ticket_id: TicketId,
            },
            data:
            {
                ticket_upvotes : Upvotes,    
            },
        });
       // return "The ticket with id: " + TicketId + "'s status changed from " + prev_ticket_status + " to " + TicketStatus + "."
    }

    async IncUpvotes(TicketId: number){

        await this.prisma.ticket.update({
            where:{
                ticket_id: TicketId,
            },
            data:
            {
                ticket_upvotes :{
                    increment: 1,
                } 
            },
        });

    }

    async closeTicket(TicketId: number){

        await this.prisma.ticket.update({
            where:{
                ticket_id: TicketId,
            },
            data:
            {
                ticket_status : "Closed",    
            },
        });
       // return "The ticket with id: " + TicketId + "'s status changed from " + prev_ticket_status + " to " + TicketStatus + "."
    }

    async deleteTicket(TicketId: number){

        await this.prisma.ticket.delete({
            where:
            {
                ticket_id: TicketId,
            },
        })
       // return "The ticket with id: " + TicketId + " has been deleted."
    }

    async getAllTickets(){
        return await this.prisma.ticket.findMany()
    }

    async getAllTicketsDispatched(){
        return await this.prisma.ticket.findMany({
            
            where:{
                ticket_status: "Dispatched",
            },
            
        })
    }

    async getTicket(TicketId: number){

        const ticket = await this.prisma.ticket.findMany({

            where:{
                ticket_id: TicketId,
            },

        })

        if (ticket) {
            return ticket;
        }
        else{
            return "Ticket " + TicketId + "not found!";
        }
        
    }

    async getCityTicket(City: string){

        const ticket = await this.prisma.ticket.findMany({

            where:{
                ticket_city: City,
            },
            orderBy:{
                ticket_upvotes: "desc",
            },
        })

        if (ticket) {
            return ticket;
        }
        else{
            return "No tickets for the city " + City + "found!";
        }
        
    }

    async getStatus(Status: string){

        const tickets = await this.prisma.ticket.findMany({

            where:{
                ticket_status: Status,
            },
            orderBy: {
                ticket_upvotes: "desc",
            },

        })

        return tickets

    }

    async getIssue(issue: string){

        const tickets = await this.prisma.ticket.findMany({

            where:{
                ticket_type: issue,
            },
            orderBy: {
                ticket_upvotes: "desc",
            },

        })

        return tickets

    }
}
