import { Injectable, Logger } from '@nestjs/common';
import {PrismaClient} from '@prisma/client';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';

@Injectable()
export class ApiTicketRepositoryDataAccess {

    prisma = new PrismaClient();

    async createTicket(ticketDto : TicketDto){
            await this.prisma.ticket.create({
                data:
                {
                    ticketStatus :          ticketDto.ticketStatus,    
                    ticketCreateDate :      ticketDto.ticketCreateDate, 
                    ticketCloseDate :       ticketDto.ticketCloseDate,
                    ticketType :            ticketDto.ticketType,    
                    ticketCity :            ticketDto.ticketCity,   
                    ticketLocation :        ticketDto.ticketLocation,   
                    ticketCost :            ticketDto.ticketCost,
                    ticketDescription :     ticketDto.ticketDescription,
                    ticketRepairTime :      ticketDto.ticketRepairTime, 
                    ticketUpvotes :         ticketDto.ticketUpvotes,
                }
            });
            return  await this.prisma.ticket.findMany({
            
                where:
                {
                    ticketCreateDate: ticketDto.ticketCreateDate,
                },
                
            })
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
        return tickets;
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

    async closeTicket(ticketId: number){

        await this.prisma.ticket.update({
            where:
            {
                ticketId: ticketId,
            },
            data:
            {
                ticketStatus : "Closed",    
            },
        });
       // return "The ticket with id: " + ticketID + "'s status changed from " + prev_ticket_status + " to " + TicketStatus + "."
    }

    async updateTicket(ticketID: number, ticketDto : TicketDto){

        await this.prisma.ticket.update({
            where:
            {
                ticketId : ticketID,
            },
            data:
            {
                ticketStatus :          ticketDto.ticketStatus,    
                ticketCreateDate :      ticketDto.ticketCreateDate, 
                ticketCloseDate :       ticketDto.ticketCloseDate,
                ticketType :            ticketDto.ticketType,    
                ticketCity :            ticketDto.ticketCity,   
                ticketLocation :        ticketDto.ticketLocation,   
                ticketCost :            ticketDto.ticketCost,
                ticketDescription :     ticketDto.ticketDescription,
                ticketRepairTime :      ticketDto.ticketRepairTime, 
                ticketUpvotes :         ticketDto.ticketUpvotes,
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
                     connect :{ ticketId : ticketID,}
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

    //////////////////////////////////
    ///////// Subtasks CRUDS /////////
    //////////////////////////////////

    async createSubtask(ticketId : number, taskDesc:string, taskStep:number, taskStat: string ){
        await this.prisma.subtasks.create({
            data:
            {
                ticketID :          ticketId,
                taskDescription:    taskDesc,
                taskStep :          taskStep,
                taskStatus :        taskStat
            },
        });
    }

    async getTicketSubtasks(ticketId : number){

        return await this.prisma.subtasks.findMany({
            where:
            {
                ticketID: ticketId,
            },
            orderBy: 
            {
                taskStep: "asc",
            },
        })
     }

    async updateSubtask(subtaskID : number, ticketId : number, taskDesc:string, taskStep:number, taskStat: string){

        await this.prisma.subtasks.update({
            where: 
            {
                subtaskId : subtaskID,
            },
            data:
            {
                ticketID :          ticketId, 
                taskDescription:    taskDesc, 
                taskStep:           taskStep, 
                taskStatus:         taskStat
            },
        })
    }

     async updateSubtaskTicket(subtaskID : number, ticketId : number){
        
        await this.prisma.subtasks.update({
            where: 
            {
                subtaskId : subtaskID,
            },
            data:
            {
                ticketID : ticketId,
            },
        })
     }

     async updateSubtaskDesc(subtaskID : number, desc : string){
        
        await this.prisma.subtasks.update({
            where: 
            {
                subtaskId : subtaskID,
            },
            data:
            {
                taskDescription : desc,
            }
        })
     }

     async updateSubtaskStep(subtaskID : number, step : number){
        
        await this.prisma.subtasks.update({
            where: 
            {
                subtaskId : subtaskID,
            },
            data:
            {
                taskStep : step,
            }
        })
     }

     async updateSubtaskStatus(subtaskID : number, stat : string){
        
        await this.prisma.subtasks.update({
            where: 
            {
                subtaskId : subtaskID,
            },
            data:
            {
                taskStatus : stat,
            }
        })
     }
    
    async deleteSubtask(subtaskID: number){

        await this.prisma.subtasks.delete({

            where:{
                subtaskId : subtaskID,
            },
         })
    }
}
