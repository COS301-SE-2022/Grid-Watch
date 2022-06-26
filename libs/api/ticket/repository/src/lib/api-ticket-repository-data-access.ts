import { Injectable, Logger } from '@nestjs/common';
import {PrismaClient} from '@prisma/client';

@Injectable()
export class ApiTicketRepositoryDataAccess {

    prisma = new PrismaClient();

    async createTicket(status: string, createDate: Date, closeDate: Date, type: string, city: string, location: string, cost: number, description: string, repairTime: number, upvotes: number){

            await this.prisma.ticket.create({
                data:
                {
                    ticketStatus :          status,    
                    ticketCreateDate :      createDate, 
                    ticketCloseDate :       closeDate,
                    ticketType :            type,    
                    ticketCity :            city,   
                    ticketLocation :        location,   
                    ticketCost :            cost,
                    ticketDescription :     description,
                    ticketRepairTime :      repairTime, 
                    ticketUpvotes :         upvotes,
                }
            });
            return  await this.prisma.ticket.findMany({
            
                where:
                {
                    ticketCreateDate: createDate,
                },
                
            })
    }

    
    async closeTicket(ticketID: number){

        await this.prisma.ticket.update({
            where:
            {
                ticketId: ticketID,
            },
            data:
            {
                ticketStatus : "Closed",    
            },
        });
       // return "The ticket with id: " + ticketID + "'s status changed from " + prev_ticket_status + " to " + TicketStatus + "."
    }

    async getAllTickets(){
        return await this.prisma.ticket.findMany()
    }

    async getAllTicketsDispatched(){
        return await this.prisma.ticket.findMany({
            
            where:
            {
                ticketStatus: "Dispatched",
            },
            
        })
    }

    async getTicket(ticketID: number){

        const ticket = await this.prisma.ticket.findMany({

            where:
            {
                ticketId: ticketID,
            },

        })

        if (ticket) 
        {
            return ticket;
        }
        else
        {
            return "Ticket " + ticketID + "not found!";
        }
        
    }

    async getCityTicket(city: string){

        const ticket = await this.prisma.ticket.findMany({

            where:
            {
                ticketCity: city,
            },
            orderBy:
            {
                ticketUpvotes: "desc",
            },
        })

        if (ticket) {
            return ticket;
        }
        else{
            return "No tickets for the city " + city + "found!";
        }
        
    }

    async getStatus(status: string){

        const tickets = await this.prisma.ticket.findMany({

            where:
            {
                ticketStatus: status,
            },
            orderBy: 
            {
                ticketUpvotes: "desc",
            },

        })

        return tickets

    }

    async getIssue(issue: string){

        const tickets = await this.prisma.ticket.findMany({

            where:
            {
                ticketType: issue,
            },
            orderBy: 
            {
                ticketUpvotes: "desc",
            },

        })

        return tickets

    }

    async getTicketsSortDate(){

        const tickets = await this.prisma.ticket.findMany({
            orderBy: 
            {
                ticketCreateDate: "asc",
            },

        })

        return tickets

    }

    async getTicketsSortIssue(){

        const tickets = await this.prisma.ticket.findMany({
            orderBy: 
            {
                ticketType: "asc",
            },

        })

        return tickets

    }

    // async getTicketsSortLocation(){

    //     const tickets = await this.prisma.ticket.findMany({
    //         orderBy: 
    //         {
    //             ticket_location: "asc",
    //         },

    //     })

    //     return tickets

    // }

    async getTicketsSortCity(){

        const tickets = await this.prisma.ticket.findMany({
            orderBy: 
            {
                ticketCity: "asc",
            },

        })

        return tickets

    }

    async getTicketsSortStatus(){

        const tickets = await this.prisma.ticket.findMany({
            orderBy: 
            {
                ticketStatus: "asc",
            },

        })

        return tickets

    }

    async getTicketsSortUpvotes(){

        const tickets = await this.prisma.ticket.findMany({
            orderBy: 
            {
                ticketUpvotes: "desc",
            },

        })

        return tickets
    }

    async updateTicket(ticketID: number, status: string, createDate: Date, closeDate: Date, type: string, city: string, location: string, cost: number, description: string, repairTime: number, upvotes: number){

        await this.prisma.ticket.update({
            where:
            {
                ticketId : ticketID,
            },
            data:
            {
                ticketStatus :          status,    
                ticketCreateDate :      createDate, 
                ticketCloseDate :       closeDate,
                ticketType :            type,    
                ticketCity :            city,   
                ticketLocation :        location,   
                ticketCost :            cost,
                ticketDescription :     description,
                ticketRepairTime :      repairTime, 
                ticketUpvotes :         upvotes,
            },
        })
       // return "The ticket with id: " + ticketId + " has been created."
}
    
    async updateStatus(ticketID: number, ticketStatus: string){

        await this.prisma.ticket.update({
            where:
            {
                ticketId: ticketID,
            },
            data:
            {
                ticketStatus : ticketStatus,    
            },
        });
       // return "The ticket with id: " + ticketID + "'s status changed from " + prev_ticket_status + " to " + TicketStatus + "."
    }

    async updateCreateDate(ticketID: number, createDate: Date){

        await this.prisma.ticket.update({
            where:
            {
                ticketId: ticketID,
            },
            data:
            {
                ticketCreateDate : createDate,    
            },
        });
       // return "The ticket with id: " + ticketID + "'s status changed from " + prev_ticket_status + " to " + TicketStatus + "."
    }

    async updateCloseDate(ticketID: number, closeDate: Date){

        await this.prisma.ticket.update({
            where:
            {
                ticketId: ticketID,
            },
            data:
            {
                ticketCloseDate : closeDate,     
            },
        });
       // return "The ticket with id: " + ticketID + "'s status changed from " + prev_ticket_status + " to " + TicketStatus + "."
    }

    async updateType(ticketID: number, type: string){

        await this.prisma.ticket.update({
            where:
            {
                ticketId: ticketID,
            },
            data:
            {
                ticketType : type,    
            },
        });
       // return "The ticket with id: " + ticketID + "'s status changed from " + prev_ticket_status + " to " + TicketStatus + "."
    }

    async updateLocation(ticketID: number, location: string){

        await this.prisma.ticket.update({
            where:
            {
                ticketId: ticketID,
            },
            data:
            {
                ticketLocation : location,  
            },
        });
       // return "The ticket with id: " + ticketID + "'s status changed from " + prev_ticket_status + " to " + TicketStatus + "."
    }

    async updateCost(ticketID: number, cost: number){

        await this.prisma.ticket.update({
            where:
            {
                ticketId: ticketID,
            },
            data:
            {
                ticketCost : cost,
            },
        });
       // return "The ticket with id: " + ticketID + "'s status changed from " + prev_ticket_status + " to " + TicketStatus + "."
    }

    async updateDescription(ticketID: number, description: string){

        await this.prisma.ticket.update({
            where:
            {
                ticketId: ticketID,
            },
            data:
            {
                ticketDescription : description, 
            },
        });
       // return "The ticket with id: " + ticketID + "'s status changed from " + prev_ticket_status + " to " + TicketStatus + "."
    }

    async updateRepairTime(ticketID: number, repairTime: number){

        await this.prisma.ticket.update({
            where:
            {
                ticketId: ticketID,
            },
            data:
            {
                ticketRepairTime : repairTime,   
            },
        });
       // return "The ticket with id: " + ticketID + "'s status changed from " + prev_ticket_status + " to " + TicketStatus + "."
    }

    async updateUpvotes(ticketID: number, upvotes: number){

        await this.prisma.ticket.update({
            where:
            {
                ticketId: ticketID,
            },
            data:
            {
                ticketUpvotes : upvotes,    
            },
        });
       // return "The ticket with id: " + ticketID + "'s status changed from " + prev_ticket_status + " to " + TicketStatus + "."
    }

    async incUpvotes(ticketID: number){

        await this.prisma.ticket.update({
            where:
            {
                ticketId: ticketID,
            },
            data:
            {
                ticketUpvotes :
                {
                    increment: 1,
                } 
            },
        });

    }

    async deleteTicket(ticketID: number){

        await this.prisma.ticket.delete({
            where: {
                ticketId: ticketID,
            },
        })
       // return "The ticket with id: " + ticketID + " has been deleted."
    }


    //////////////////////////////////
    ///////// Picture CRUDS //////////
    //////////////////////////////////

    //create and link a picture to a ticket
    async createPicture(ticketID : number, imgLink : string){

        await this.prisma.picture.create({
             data: 
             {
                 pictureLink : imgLink,

                 ticket:{
                     connect : 
                     {
                         ticketId : ticketID,
                     }
                 }

             }
 
         })
 
     }

     async getPicture(ticketId : number){

         return await this.prisma.picture.findMany({
            where:
            {
                ticketID: ticketId,
            },

        })
     }

     // get all pictures of a ticket sorting according to newest picture ( highest picture id number)
     async getAllPictures(ticketId : number){

        return await this.prisma.picture.findMany({
            where:
            {
                ticketID: ticketId,
            },
            orderBy: 
            {
                pictureId: "desc",
            },
        })
     }

     async updatePicture(pictureID : number, imgLink : string){

        await this.prisma.picture.update({
            where: 
            {
                pictureId : pictureID,
            },
            data:
            {
                pictureLink : imgLink,
            },
 
         })
     }

     async deletePicture(pictureID : number){

        await this.prisma.picture.delete({
            where: 
            {
                pictureId : pictureID,
            }
 
         })
     }

}
