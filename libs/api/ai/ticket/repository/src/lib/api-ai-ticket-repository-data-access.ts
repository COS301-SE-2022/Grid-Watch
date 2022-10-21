import { AiDto } from '@grid-watch/api/ai/ticket/api/shared/api-ai-ticket-api-dto';
import { Injectable } from '@nestjs/common';
import {PrismaClient} from '@prisma/client';

@Injectable()
export class ApiAiTicketRepositoryDataAccess {

    prisma = new PrismaClient();

    async saveAI(AIdto : AiDto){
        const AIdata = await this.prisma.aI.create
        ({ 
            data: 
            {
                aiData          :   AIdto.aiData,
                aiParameters    :   AIdto.aiParameters,
                aiArrays        :   AIdto.aiArrays,
                fitness         :   AIdto.aiFitness,
                ticketTypes     :   AIdto.aiTicketTypes,
                ticketCities    :   AIdto.aiTicketCities,
                aiType          :   AIdto.aiType,
            }
        })

        return AIdata
    }

    async getAllAI(){
        return await this.prisma.aI.findMany()
    }

    async readAI(ID : number){
        return await this.prisma.aI.findMany

        ({
            where:
            {
                id: ID,
            },

        })

    }

    async updateAI(ID: number, AIdto : AiDto){

        await this.prisma.aI.update({
            where:
            {
                id : ID,
            },
            data:
            {
                dateCreated     :   AIdto.dateCreated,
                aiData          :   AIdto.aiData,
                aiParameters    :   AIdto.aiParameters,
                aiArrays        :   AIdto.aiArrays,
                fitness         :   AIdto.aiFitness,
                ticketTypes     :   AIdto.aiTicketTypes,
                ticketCities    :   AIdto.aiTicketCities
            }
        })
    }

    async updateAIData(ID: number, AIdto : AiDto){

        await this.prisma.aI.update({
            where:
            {
                id : ID,
            },
            data:
            {
                aiData        :   AIdto.aiData,
            }
        })
    }

    async updateAIFitness(ID: number, AIdto : AiDto){

        await this.prisma.aI.update({
            where:
            {
                id : ID,
            },
            data:
            {
                fitness     :   AIdto.aiFitness,
            }
        })
    }

    async updateAIDateCreated(ID: number, AIdto : AiDto){

        await this.prisma.aI.update({
            where:
            {
                id : ID,
            },
            data:
            {
                dateCreated     :   AIdto.dateCreated,
            }
        })
    }

    async updateAITicketTypes(ID: number, AIdto : AiDto){

        await this.prisma.aI.update({
            where:
            {
                id : ID,
            },
            data:
            {
                ticketTypes     :   AIdto.aiTicketTypes,
            }
        })
    }

    async updateAITicketCities(ID: number, AIdto : AiDto){

        await this.prisma.aI.update({
            where:
            {
                id : ID,
            },
            data:
            {
                ticketCities     :   AIdto.aiTicketCities,
            }
        })
    }

    async updateAIType(ID: number, AIdto : AiDto){

        await this.prisma.aI.update({
            where:
            {
                id : ID,
            },
            data:
            {
                aiType     :   AIdto.aiType,
            }
        })
    }    

    async deleteAI(ID: number, ){

        await this.prisma.aI.delete({
            where:
            {
                id : ID,
            },

        })
    }
}
